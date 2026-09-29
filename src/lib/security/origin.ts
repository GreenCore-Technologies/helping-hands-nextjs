import { NextRequest } from "next/server";

/*
 * Determine which origins are permitted to send
 * state-changing requests to this application.
 *
 * Production:
 *   https://helping-handsllc.com
 *
 * Development:
 *   localhost and local network access.
 */

function normalizeOrigin(
  value: string,
) {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getProductionOrigin() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return null;
  }

  return normalizeOrigin(siteUrl);
}

function isDevelopmentOrigin(
  origin: string,
) {
  if (
    process.env.NODE_ENV ===
    "production"
  ) {
    return false;
  }

  try {
    const url = new URL(origin);

    return (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "::1" ||
      url.hostname.endsWith(".local") ||
      /^10\./.test(url.hostname) ||
      /^192\.168\./.test(
        url.hostname,
      ) ||
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
) {
  const origin =
    request.headers.get("origin");

  /*
   * Browser form/fetch requests that mutate
   * application state should contain Origin.
   *
   * Reject requests where it is absent rather
   * than silently trusting them.
   */
  if (!origin) {
    return false;
  }

  const normalizedOrigin =
    normalizeOrigin(origin);

  if (!normalizedOrigin) {
    return false;
  }

  const productionOrigin =
    getProductionOrigin();

  if (
    productionOrigin &&
    normalizedOrigin ===
      productionOrigin
  ) {
    return true;
  }

  if (
    isDevelopmentOrigin(
      normalizedOrigin,
    )
  ) {
    return true;
  }

  return false;
}