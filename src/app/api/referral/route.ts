import {
  NextRequest,
  NextResponse,
} from "next/server";

import { z } from "zod";

import { db } from "@/db";

import {
  referralSubmissionsTable,
} from "@/db/schema";

import {
  sendReferralNotification,
} from "@/lib/email/notifications";

import {
  isAllowedOrigin,
} from "@/lib/security/origin";

import {
  checkRateLimit,
  createRateLimitKey,
  getClientIp,
} from "@/lib/security/rate-limit";

/*
 * Referral form validation.
 */
const referralSchema =
  z.object({
    clientName: z
      .string()
      .trim()
      .min(2)
      .max(200),

    guardianName: z
      .string()
      .trim()
      .min(2)
      .max(200),

    phone: z
      .string()
      .trim()
      .min(10)
      .max(30)
      .regex(
        /^[\d\s\-().+]+$/,
      ),

    email: z
      .string()
      .trim()
      .email()
      .max(300),

    serviceArea: z
      .string()
      .trim()
      .min(3)
      .max(300),

    serviceNeeded: z
      .string()
      .trim()
      .min(1)
      .max(200),

    contactMethod:
      z.enum([
        "phone",
        "email",
        "text",
      ]),

    message: z
      .string()
      .trim()
      .max(5000)
      .optional(),

    consent:
      z.literal(true),

    /*
     * Honeypot field.
     */
    website: z
      .string()
      .optional()
      .default(""),
  });

/*
 * Public referral rate limit.
 *
 * Five attempts per 15-minute
 * window per client identifier.
 */
const RATE_LIMIT_WINDOW_MS =
  15 * 60 * 1000;

const RATE_LIMIT_MAX = 5;

/*
 * Maximum accepted request size:
 * 16 KB.
 */
const MAX_REQUEST_BYTES =
  16 * 1024;

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
   * size already exceeds our limit.
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
   * Content-Length cannot be trusted
   * by itself.
   *
   * Also verify the actual UTF-8
   * request-body size.
   */
  const actualSize =
    new TextEncoder()
      .encode(
        rawBody,
      )
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

export async function POST(
  request: NextRequest,
) {
  try {
    /*
     * Reject unauthorized
     * cross-origin submissions.
     */
    if (
      !isAllowedOrigin(
        request,
      )
    ) {
      console.warn(
        "Referral submission rejected due to invalid origin.",
      );

      return NextResponse.json(
        {
          error:
            "Invalid request origin.",
        },
        {
          status: 403,
        },
      );
    }

    /*
     * Only accept JSON requests.
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
        },
      );
    }

    /*
     * Determine the client identifier
     * used by the shared rate limiter.
     */
    const ip =
      getClientIp(
        request,
      );

    /*
     * Use the shared rate limiter.
     *
     * The "referral" namespace keeps
     * this counter independent from
     * Contact and Admin Login.
     */
    const rate =
      checkRateLimit({
        key:
          createRateLimitKey(
            "referral",
            ip,
          ),

        windowMs:
          RATE_LIMIT_WINDOW_MS,

        maxRequests:
          RATE_LIMIT_MAX,
      });

    if (!rate.allowed) {
      const minutes =
        Math.max(
          1,

          Math.ceil(
            rate.retryAfterSeconds /
              60,
          ),
        );

      return NextResponse.json(
        {
          error:
            `Too many requests. Please wait ${minutes} minutes before trying again, or call us at 251-288-0194.`,
        },
        {
          status: 429,

          headers: {
            "Retry-After":
              String(
                rate.retryAfterSeconds,
              ),
          },
        },
      );
    }

    /*
     * Enforce request-size
     * limits and parse JSON.
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
        },
      );
    }

    const body =
      bodyResult.body;

    /*
     * Reject arrays, null, strings,
     * numbers, and other unexpected
     * request-body types.
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
        },
      );
    }

    /*
     * Honeypot bot protection.
     *
     * Legitimate users leave
     * "website" empty.
     */
    if (
      "website" in body &&
      typeof body.website ===
        "string" &&
      body.website
        .trim() !== ""
    ) {
      return NextResponse.json(
        {
          id: 0,

          message:
            "Thank you — your referral has been received.",
        },
        {
          status: 201,
        },
      );
    }

    /*
     * Server-side referral
     * validation.
     */
    const parsed =
      referralSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      console.warn(
        "Referral validation failed.",
        {
          issueCount:
            parsed.error
              .issues.length,
        },
      );

      return NextResponse.json(
        {
          error:
            "Please check your form entries and try again.",
        },
        {
          status: 400,
        },
      );
    }

    const {
      clientName,
      guardianName,
      phone,
      email,
      serviceArea,
      serviceNeeded,
      contactMethod,
      message,
      consent,
    } = parsed.data;

    const normalizedEmail =
      email.toLowerCase();

    /*
     * PostgreSQL remains the source
     * of truth for the complete
     * referral submission.
     */
    const [submission] =
      await db
        .insert(
          referralSubmissionsTable,
        )
        .values({
          clientName,

          guardianName,

          phone,

          email:
            normalizedEmail,

          serviceArea,

          serviceNeeded,

          contactMethod,

          message:
            message || null,

          consentGiven:
            consent,

          ipAddress:
            ip,
        })
        .returning({
          id:
            referralSubmissionsTable.id,
        });

    /*
     * Never log referral PII.
     */
    console.info(
      "Referral submission stored.",
      {
        submissionId:
          submission.id,

        type:
          "referral",
      },
    );

    /*
     * Privacy-minimized email
     * notification.
     *
     * Only the database submission ID
     * is passed to the notification
     * service.
     */
    await sendReferralNotification(
      {
        submissionId:
          submission.id,
      },
    );

    return NextResponse.json(
      {
        id:
          submission.id,

        message:
          "Thank you — your referral has been received.",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    /*
     * Do not log submitted referral
     * information.
     */
    console.error(
      "Referral submission failed.",
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
          "We couldn't send your referral right now. Please try again or call us directly at 251-288-0194.",
      },
      {
        status: 500,
      },
    );
  }
}