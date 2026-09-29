import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/auth/admin";

const NO_STORE_HEADERS = {
  "Cache-Control":
    "no-store, private",
};

export async function GET(
  request: NextRequest,
) {
  try {
    const token =
      request.cookies.get(
        ADMIN_COOKIE_NAME,
      )?.value;

    /*
     * No session cookie.
     */
    if (!token) {
      return NextResponse.json(
        {
          error:
            "Not authenticated.",
        },
        {
          status: 401,
          headers:
            NO_STORE_HEADERS,
        },
      );
    }

    /*
     * Verify the signed admin
     * session token.
     */
    const session =
      await verifyAdminSessionToken(
        token,
      );

    /*
     * Invalid or expired session.
     *
     * Delete the unusable cookie so
     * the browser does not continue
     * sending it.
     */
    if (!session) {
      const response =
        NextResponse.json(
          {
            error:
              "Not authenticated.",
          },
          {
            status: 401,
            headers:
              NO_STORE_HEADERS,
          },
        );

      response.cookies.delete(
        ADMIN_COOKIE_NAME,
      );

      return response;
    }

    /*
     * Authenticated response.
     *
     * Never allow browsers, proxies,
     * or intermediary caches to store
     * admin-session information.
     */
    return NextResponse.json(
      {
        username:
          session.username,
      },
      {
        status: 200,
        headers:
          NO_STORE_HEADERS,
      },
    );
  } catch (error) {
    console.error(
      "Admin session verification error",
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
          "Unable to verify authentication.",
      },
      {
        status: 500,
        headers:
          NO_STORE_HEADERS,
      },
    );
  }
}