import { NextRequest } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  key: string;
  windowMs: number;
  maxRequests: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  remaining: number;
};

/*
 * Shared in-memory rate-limit store.
 *
 * This is appropriate for the initial
 * Helping Hands single-instance deployment.
 *
 * IMPORTANT:
 * The store resets whenever the Node.js
 * process restarts.
 *
 * It is also not shared between multiple
 * application instances.
 *
 * If the application later scales to
 * multiple EC2 or ECS instances, this
 * should be replaced with a shared
 * rate-limit store such as Redis.
 */
const rateLimitStore =
  new Map<
    string,
    RateLimitEntry
  >();

/*
 * Remove expired entries periodically
 * so the in-memory Map does not grow
 * indefinitely.
 */
function cleanupExpiredEntries(
  now: number,
) {
  /*
   * Avoid scanning the Map on every
   * request while it is small.
   */
  if (
    rateLimitStore.size <
    1000
  ) {
    return;
  }

  for (
    const [
      key,
      entry,
    ] of rateLimitStore
  ) {
    if (
      entry.resetAt <= now
    ) {
      rateLimitStore.delete(
        key,
      );
    }
  }
}

/*
 * Check and update a rate limit.
 *
 * Example:
 *
 * checkRateLimit({
 *   key: "contact:192.168.1.10",
 *   windowMs: 15 * 60 * 1000,
 *   maxRequests: 5,
 * });
 */
export function checkRateLimit({
  key,
  windowMs,
  maxRequests,
}: RateLimitOptions): RateLimitResult {
  const now =
    Date.now();

  cleanupExpiredEntries(
    now,
  );

  const existing =
    rateLimitStore.get(
      key,
    );

  /*
   * No existing rate-limit entry,
   * or the previous window expired.
   *
   * Start a new window.
   */
  if (
    !existing ||
    existing.resetAt <= now
  ) {
    rateLimitStore.set(
      key,
      {
        count: 1,

        resetAt:
          now +
          windowMs,
      },
    );

    return {
      allowed: true,

      retryAfterSeconds:
        0,

      remaining:
        Math.max(
          0,
          maxRequests - 1,
        ),
    };
  }

  /*
   * The client has reached the
   * maximum number of requests
   * allowed during this window.
   */
  if (
    existing.count >=
    maxRequests
  ) {
    return {
      allowed: false,

      retryAfterSeconds:
        Math.max(
          1,

          Math.ceil(
            (
              existing.resetAt -
              now
            ) / 1000,
          ),
        ),

      remaining:
        0,
    };
  }

  /*
   * Request is allowed.
   *
   * Increment the counter.
   */
  existing.count += 1;

  rateLimitStore.set(
    key,
    existing,
  );

  return {
    allowed: true,

    retryAfterSeconds:
      0,

    remaining:
      Math.max(
        0,

        maxRequests -
          existing.count,
      ),
  };
}

/*
 * Determine the client IP address.
 *
 * When deployed behind an AWS load
 * balancer or another trusted reverse
 * proxy, x-forwarded-for is normally
 * used to preserve the original
 * client's IP address.
 *
 * IMPORTANT:
 * Forwarding headers should only be
 * trusted when the production proxy /
 * load balancer configuration controls
 * or overwrites them.
 *
 * We will verify that configuration
 * during AWS deployment.
 */
export function getClientIp(
  request: NextRequest,
) {
  const forwardedFor =
    request.headers.get(
      "x-forwarded-for",
    );

  if (forwardedFor) {
    const firstIp =
      forwardedFor
        .split(",")[0]
        ?.trim();

    if (firstIp) {
      return firstIp.slice(
        0,
        64,
      );
    }
  }

  const realIp =
    request.headers.get(
      "x-real-ip",
    );

  if (realIp) {
    return realIp
      .trim()
      .slice(
        0,
        64,
      );
  }

  /*
   * Development fallback.
   *
   * Requests that do not contain
   * trusted proxy IP headers share
   * this identifier.
   */
  return "unknown";
}

/*
 * Give each endpoint its own
 * rate-limit namespace.
 *
 * Examples:
 *
 * contact:192.168.1.10
 * referral:192.168.1.10
 * admin-login:192.168.1.10
 *
 * This prevents activity against one
 * endpoint from consuming another
 * endpoint's rate limit.
 */
export function createRateLimitKey(
  scope: string,
  ip: string,
) {
  return `${scope}:${ip}`;
}