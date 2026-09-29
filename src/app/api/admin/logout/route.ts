import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/auth/admin";

import {
  isAllowedOrigin,
} from "@/lib/security/origin";

const NO_STORE_HEADERS = {
  "Cache-Control":
    "no-store, private",
};

export async function POST(
  request: NextRequest,
) {
  try {
    /*
     * Prevent cross-origin logout
     * requests.
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
     * Read the current admin
     * session cookie.
     */
    const token =
      request.cookies.get(
        ADMIN_COOKIE_NAME,
      )?.value;

    /*
     * No session exists.
     */
    if (!token) {
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
     * Verify the signed session
     * before processing logout.
     */
    const session =
      await verifyAdminSessionToken(
        token,
      );

    /*
     * Invalid or expired session.
     *
     * Remove the unusable cookie.
     */
    if (!session) {
      const response =
        NextResponse.json(
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

      response.cookies.delete(
        ADMIN_COOKIE_NAME,
      );

      return response;
    }

    /*
     * Successful logout.
     */
    const response =
      NextResponse.json(
        {
          message:
            "Logged out successfully.",
        },
        {
          status: 200,
          headers:
            NO_STORE_HEADERS,
        },
      );

    /*
     * Expire the admin cookie
     * immediately.
     */
    response.cookies.set(
      ADMIN_COOKIE_NAME,
      "",
      {
        ...getDeleteCookieOptions(),
        maxAge: 0,
      },
    );

    return response;
  } catch (error) {
    console.error(
      "Admin logout error",
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
          "Logout failed. Please try again.",
      },
      {
        status: 500,
        headers:
          NO_STORE_HEADERS,
      },
    );
  }
}

function getDeleteCookieOptions() {
  return {
    httpOnly: true,

    secure:
      process.env.NODE_ENV ===
      "production",

    sameSite:
      "strict" as const,

    path: "/",
  };
}