import {
  NextRequest,
  NextResponse,
} from "next/server";

import { desc } from "drizzle-orm";

import { db } from "@/db";
import {
  referralSubmissionsTable,
} from "@/db/schema";

import {
  getAdminSessionFromRequest,
} from "@/lib/auth/admin";

const PRIVATE_HEADERS = {
  "Cache-Control":
    "no-store, private",
};

export async function GET(
  request: NextRequest,
) {
  try {
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
            PRIVATE_HEADERS,
        },
      );
    }

    const rows =
      await db
        .select()
        .from(
          referralSubmissionsTable,
        )
        .orderBy(
          desc(
            referralSubmissionsTable.createdAt,
          ),
        )
        .limit(500);

    console.info(
      "Admin fetched referral submissions",
      {
        count:
          rows.length,
        type:
          "referral",
      },
    );

    return NextResponse.json(
      rows,
      {
        headers:
          PRIVATE_HEADERS,
      },
    );
  } catch (error) {
    console.error(
      "Failed to fetch referral submissions",
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
          "Failed to load referral submissions.",
      },
      {
        status: 500,
        headers:
          PRIVATE_HEADERS,
      },
    );
  }
}