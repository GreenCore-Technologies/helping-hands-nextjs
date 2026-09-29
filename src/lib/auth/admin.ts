import { NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME =
  "hh_admin_session";

const SESSION_DURATION_SECONDS =
  60 * 60 * 8;

export interface AdminSession {
  username: string;
}

function getSessionSecret() {
  const secret =
    process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be configured and at least 32 characters long.",
    );
  }

  return new TextEncoder().encode(
    secret,
  );
}

export async function createAdminSessionToken(
  username: string,
) {
  return new SignJWT({
    username,
    role: "admin",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(
      `${SESSION_DURATION_SECONDS}s`,
    )
    .sign(getSessionSecret());
}

export async function verifyAdminSessionToken(
  token: string,
): Promise<AdminSession | null> {
  try {
    const { payload } =
      await jwtVerify(
        token,
        getSessionSecret(),
        {
          algorithms: ["HS256"],
        },
      );

    if (
      payload.role !== "admin" ||
      typeof payload.username !==
        "string" ||
      !payload.username
    ) {
      return null;
    }

    return {
      username:
        payload.username,
    };
  } catch {
    return null;
  }
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge:
      SESSION_DURATION_SECONDS,
  };
}

export async function getAdminSessionFromRequest(
  request: NextRequest,
): Promise<AdminSession | null> {
  const token =
    request.cookies.get(
      ADMIN_COOKIE_NAME,
    )?.value;

  if (!token) {
    return null;
  }

  return verifyAdminSessionToken(
    token,
  );
}