
import { NextRequest } from "next/server";

/**
 * Helping Hands LLC
 * Request Origin Security
 *
 * Production domains:
 * https://www.helpinghands-llc.com
 * https://helpinghands-llc.com
 *
 * Development:
 * localhost and local network addresses.
 */

const ALLOWED_PRODUCTION_ORIGINS = new Set([
  "https://www.helpinghands-llc.com",
  "https://helpinghands-llc.com",
]);

function normalizeOrigin(
  value: string,
): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function isDevelopmentOrigin(
  origin: string,
): boolean {
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  try {
    const url = new URL(origin);

    return (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "[::1]" ||
      url.hostname.endsWith(".local") ||
      /^10\./.test(url.hostname) ||
      /^192\.168\./.test(url.hostname) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(
        url.hostname,
      )
    );
  } catch {
    return false;
  }
}

export function isAllowedOrigin(
  request: NextRequest,
): boolean {
  const origin = request.headers.get("origin");

  // Reject requests without an Origin header.
  if (!origin) {
    return false;
  }

  const normalizedOrigin = normalizeOrigin(origin);

  if (!normalizedOrigin) {
    return false;
  }

  // Allow the official Helping Hands domains.
  if (
    ALLOWED_PRODUCTION_ORIGINS.has(
      normalizedOrigin,
    )
  ) {
    return true;
  }

  // Allow local development only outside production.
  if (isDevelopmentOrigin(normalizedOrigin)) {
    return true;
  }

  // Reject all other origins.
  return false;
}
