import {
  NextRequest,
  NextResponse,
} from "next/server";

import bcrypt from "bcryptjs";

import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminCookieOptions,
} from "@/lib/auth/admin";

import {
  isAllowedOrigin,
} from "@/lib/security/origin";

import {
  checkRateLimit,
  createRateLimitKey,
  getClientIp,
} from "@/lib/security/rate-limit";

/*
 * Admin login rate limit.
 *
 * Ten login attempts are allowed
 * during each 15-minute window
 * per client identifier.
 */
const LOGIN_LIMIT = 10;

const LOGIN_WINDOW_MS =
  15 * 60 * 1000;

/*
 * Login requests should be very small.
 *
 * 4 KB is more than enough for the
 * username/password JSON payload while
 * preventing unnecessarily large bodies.
 */
const MAX_LOGIN_REQUEST_BYTES =
  4 * 1024;

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
    MAX_LOGIN_REQUEST_BYTES
  );
}

async function readJsonBody(
  request: NextRequest,
) {
  /*
   * Reject a request immediately when
   * its declared size exceeds the
   * login-body limit.
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
   * Do not rely exclusively on
   * Content-Length.
   *
   * Verify the actual UTF-8 size of
   * the body after reading it.
   */
  const actualSize =
    new TextEncoder()
      .encode(
        rawBody,
      )
      .byteLength;

  if (
    actualSize >
    MAX_LOGIN_REQUEST_BYTES
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
     * Reject cross-origin login
     * attempts before credentials
     * are processed.
     */
    if (
      !isAllowedOrigin(
        request,
      )
    ) {
      console.warn(
        "Admin login rejected due to invalid origin.",
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
     * Admin Login accepts JSON only.
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
     * used by the shared limiter.
     */
    const ip =
      getClientIp(
        request,
      );

    /*
     * Keep Admin Login in its own
     * rate-limit namespace.
     *
     * Contact and Referral activity
     * therefore cannot consume the
     * Admin Login allowance.
     */
    const rateLimit =
      checkRateLimit({
        key:
          createRateLimitKey(
            "admin-login",
            ip,
          ),

        windowMs:
          LOGIN_WINDOW_MS,

        maxRequests:
          LOGIN_LIMIT,
      });

    if (
      !rateLimit.allowed
    ) {
      const minutes =
        Math.max(
          1,

          Math.ceil(
            rateLimit.retryAfterSeconds /
              60,
          ),
        );

      return NextResponse.json(
        {
          error:
            `Too many login attempts. ` +
            `Please wait ${minutes} minutes.`,
        },
        {
          status: 429,

          headers: {
            "Retry-After":
              String(
                rateLimit.retryAfterSeconds,
              ),
          },
        },
      );
    }

    /*
     * Load admin authentication
     * configuration.
     */
    const adminUsername =
      process.env.ADMIN_USERNAME;

    const adminPasswordHashBase64 =
      process.env
        .ADMIN_PASSWORD_HASH_B64;

    /*
     * The bcrypt hash is stored as
     * Base64 inside the environment.
     *
     * This prevents environment-variable
     * expansion from interpreting the
     * $ characters contained in a normal
     * bcrypt hash.
     */
    const adminPasswordHash =
      adminPasswordHashBase64
        ? Buffer.from(
            adminPasswordHashBase64,
            "base64",
          ).toString(
            "utf8",
          )
        : undefined;

    if (
      !adminUsername ||
      !adminPasswordHash
    ) {
      console.error(
        "Admin authentication environment variables are not configured.",
      );

      return NextResponse.json(
        {
          error:
            "Admin authentication is not configured.",
        },
        {
          status: 503,
        },
      );
    }

    /*
     * Enforce request-size limits
     * and parse JSON.
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
        },
      );
    }

    /*
     * Extract credentials without
     * assuming properties exist.
     */
    const username =
      "username" in body
        ? body.username
        : undefined;

    const password =
      "password" in body
        ? body.password
        : undefined;

    if (
      typeof username !==
        "string" ||
      typeof password !==
        "string" ||
      !username ||
      !password
    ) {
      return NextResponse.json(
        {
          error:
            "Username and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Keep credential sizes bounded.
     *
     * This also avoids feeding
     * unreasonable input sizes into
     * authentication processing.
     */
    if (
      username.length > 200 ||
      password.length > 1000
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid username or password.",
        },
        {
          status: 401,
        },
      );
    }

    /*
     * Verify username.
     */
    const usernameMatch =
      username ===
      adminUsername;

    /*
     * Always perform the bcrypt
     * comparison for a structurally
     * valid login request.
     */
    const passwordMatch =
      await bcrypt.compare(
        password,
        adminPasswordHash,
      );

    /*
     * Do not reveal which credential
     * was incorrect.
     */
    if (
      !usernameMatch ||
      !passwordMatch
    ) {
      console.warn(
        "Failed admin login attempt",
        {
          ip,

          type:
            "admin-login-failure",
        },
      );

      return NextResponse.json(
        {
          error:
            "Invalid username or password.",
        },
        {
          status: 401,
        },
      );
    }

    /*
     * Create the signed admin
     * session token.
     */
    const token =
      await createAdminSessionToken(
        adminUsername,
      );

    const response =
      NextResponse.json(
        {
          username:
            adminUsername,
        },
        {
          status: 200,

          headers: {
            "Cache-Control":
              "no-store, private",
          },
        },
      );

    /*
     * Set the secure session cookie
     * using the centralized cookie
     * configuration.
     */
    response.cookies.set(
      ADMIN_COOKIE_NAME,
      token,
      getAdminCookieOptions(),
    );

    console.info(
      "Admin login successful",
      {
        type:
          "admin-login-success",
      },
    );

    return response;
  } catch (error) {
    /*
     * Do not dump authentication
     * request bodies or credentials
     * into application logs.
     */
    console.error(
      "Admin login error",
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
          "Login failed. Please try again.",
      },
      {
        status: 500,

        headers: {
          "Cache-Control":
            "no-store, private",
        },
      },
    );
  }
}