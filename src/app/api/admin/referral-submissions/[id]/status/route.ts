import {
  NextRequest,
  NextResponse,
} from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";

import {
  referralSubmissionsTable,
} from "@/db/schema";

import {
  getAdminSessionFromRequest,
} from "@/lib/auth/admin";

import {
  isAllowedOrigin,
} from "@/lib/security/origin";

const VALID_STATUSES = [
  "new",
  "reviewed",
  "completed",
] as const;

type SubmissionStatus =
  (typeof VALID_STATUSES)[number];

const MAX_REQUEST_BYTES =
  4 * 1024;

const NO_STORE_HEADERS = {
  "Cache-Control":
    "no-store, private",
};

function isValidStatus(
  value: unknown,
): value is SubmissionStatus {
  return (
    typeof value === "string" &&
    (
      VALID_STATUSES as readonly string[]
    ).includes(value)
  );
}

function hasJsonContentType(
  request: NextRequest,
) {
  const contentType =
    request.headers.get(
      "content-type",
    );

  if (!contentType) {
    return false;
  }

  return contentType
    .toLowerCase()
    .startsWith(
      "application/json",
    );
}

function exceedsRequestSize(
  request: NextRequest,
) {
  const contentLength =
    request.headers.get(
      "content-length",
    );

  if (!contentLength) {
    return false;
  }

  const size =
    Number(contentLength);

  if (
    !Number.isFinite(size) ||
    size < 0
  ) {
    return true;
  }

  return (
    size >
    MAX_REQUEST_BYTES
  );
}

async function readJsonBody(
  request: NextRequest,
) {
  /*
   * Reject requests whose declared
   * body size exceeds the limit.
   */
  if (
    exceedsRequestSize(
      request,
    )
  ) {
    return {
      ok: false as const,
      status: 413,
      error:
        "Request is too large.",
    };
  }

  let rawBody: string;

  try {
    rawBody =
      await request.text();
  } catch {
    return {
      ok: false as const,
      status: 400,
      error:
        "Invalid request.",
    };
  }

  /*
   * Verify the actual UTF-8 size
   * instead of relying only on
   * Content-Length.
   */
  const actualSize =
    new TextEncoder()
      .encode(rawBody)
      .byteLength;

  if (
    actualSize >
    MAX_REQUEST_BYTES
  ) {
    return {
      ok: false as const,
      status: 413,
      error:
        "Request is too large.",
    };
  }

  if (!rawBody.trim()) {
    return {
      ok: false as const,
      status: 400,
      error:
        "Invalid request.",
    };
  }

  try {
    return {
      ok: true as const,
      body:
        JSON.parse(
          rawBody,
        ) as unknown,
    };
  } catch {
    return {
      ok: false as const,
      status: 400,
      error:
        "Invalid JSON.",
    };
  }
}

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    /*
     * Reject cross-origin state
     * changes before authentication
     * or database processing.
     */
    if (
      !isAllowedOrigin(
        request,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request origin.",
        },
        {
          status: 403,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    /*
     * Verify administrator session.
     */
    const session =
      await getAdminSessionFromRequest(
        request,
      );

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Authentication required.",
        },
        {
          status: 401,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    /*
     * Require JSON for status
     * modification requests.
     */
    if (
      !hasJsonContentType(
        request,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Content-Type must be application/json.",
        },
        {
          status: 415,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    /*
     * Validate referral ID.
     */
    const { id: rawId } =
      await context.params;

    const id =
      Number.parseInt(
        rawId,
        10,
      );

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid submission ID.",
        },
        {
          status: 400,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    /*
     * Safely read and parse the
     * request body.
     */
    const bodyResult =
      await readJsonBody(
        request,
      );

    if (!bodyResult.ok) {
      return NextResponse.json(
        {
          error:
            bodyResult.error,
        },
        {
          status:
            bodyResult.status,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    const body =
      bodyResult.body;

    /*
     * Require a JSON object.
     */
    if (
      !body ||
      typeof body !==
        "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request.",
        },
        {
          status: 400,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    const status =
      "status" in body
        ? body.status
        : undefined;

    /*
     * Only permit known workflow
     * statuses.
     */
    if (
      !isValidStatus(
        status,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "status must be one of: new, reviewed, completed",
        },
        {
          status: 400,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    /*
     * Update PostgreSQL.
     */
    const [updated] =
      await db
        .update(
          referralSubmissionsTable,
        )
        .set({
          status,
        })
        .where(
          eq(
            referralSubmissionsTable.id,
            id,
          ),
        )
        .returning({
          id:
            referralSubmissionsTable.id,

          status:
            referralSubmissionsTable.status,
        });

    if (!updated) {
      return NextResponse.json(
        {
          error:
            "Submission not found.",
        },
        {
          status: 404,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    /*
     * Log metadata only.
     */
    console.info(
      "Admin updated referral submission status",
      {
        submissionId:
          updated.id,

        status:
          updated.status,

        type:
          "referral",
      },
    );

    return NextResponse.json(
      updated,
      {
        status: 200,
        headers:
          NO_STORE_HEADERS,
      },
    );
  } catch (error) {
    /*
     * Do not log referral contents
     * or request bodies.
     */
    console.error(
      "Failed to update referral submission",
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
    );

    return NextResponse.json(
      {
        error:
          "Failed to update submission.",
      },
      {
        status: 500,
        headers:
          NO_STORE_HEADERS,
      },
    );
  }
}