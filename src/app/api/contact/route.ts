import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { contactSubmissionsTable } from "@/db/schema";
import { sendContactNotification } from "@/lib/email/notifications";
import { isAllowedOrigin } from "@/lib/security/origin";
import {
  checkRateLimit,
  createRateLimitKey,
  getClientIp,
} from "@/lib/security/rate-limit";

/*
 * Contact form validation.
 */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(200),

  email: z
    .string()
    .trim()
    .email()
    .max(300),

  phone: z
    .string()
    .trim()
    .min(10)
    .max(30)
    .regex(
      /^[\d\s\-().+]+$/,
    ),

  message: z
    .string()
    .trim()
    .min(5)
    .max(5000),

  consent: z.literal(true),

  /*
   * Honeypot field.
   * Legitimate visitors should leave
   * this empty.
   */
  website: z
    .string()
    .optional()
    .default(""),
});

/*
 * Public contact form rate limit.
 *
 * Five attempts are permitted during
 * each 15-minute window per client
 * identifier.
 */
const RATE_LIMIT_WINDOW_MS =
  15 * 60 * 1000;

const RATE_LIMIT_MAX = 5;

/*
 * Maximum request body size:
 * 16 KB.
 */
const MAX_REQUEST_BYTES =
  16 * 1024;

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

  const parsedLength =
    Number(contentLength);

  if (
    !Number.isFinite(
      parsedLength,
    ) ||
    parsedLength < 0
  ) {
    return true;
  }

  return (
    parsedLength >
    MAX_REQUEST_BYTES
  );
}

export async function POST(
  request: NextRequest,
) {
  try {
    /*
     * Protect this state-changing
     * endpoint from requests originating
     * from unauthorized websites.
     */
    if (
      !isAllowedOrigin(
        request,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Request origin is not allowed.",
        },
        {
          status: 403,
        },
      );
    }

    /*
     * This endpoint accepts JSON only.
     */
    const contentType =
      request.headers.get(
        "content-type",
      );

    if (
      !contentType
        ?.toLowerCase()
        .startsWith(
          "application/json",
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
     * Reject requests that advertise
     * an oversized body before reading
     * the request into memory.
     */
    if (
      exceedsRequestSize(
        request,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Request is too large.",
        },
        {
          status: 413,
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
     * Namespace this limit specifically
     * for the Contact endpoint.
     */
    const rate =
      checkRateLimit({
        key:
          createRateLimitKey(
            "contact",
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
     * Read the raw request body so we
     * can enforce the real UTF-8 size
     * even if Content-Length is absent
     * or inaccurate.
     */
    const rawBody =
      await request.text();

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
      return NextResponse.json(
        {
          error:
            "Request is too large.",
        },
        {
          status: 413,
        },
      );
    }

    if (!rawBody.trim()) {
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
     * Parse JSON safely.
     */
    let body: unknown;

    try {
      body =
        JSON.parse(
          rawBody,
        );
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid JSON.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Reject arrays, null, strings,
     * numbers, etc.
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
     * Honeypot protection.
     *
     * Bots commonly populate hidden
     * form fields.
     *
     * Return a normal-looking success
     * response without storing anything.
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
            "Thank you — your message has been received.",
        },
        {
          status: 201,
        },
      );
    }

    /*
     * Server-side validation.
     *
     * Browser validation is only a UX
     * feature. The API must independently
     * validate every request.
     */
    const parsed =
      contactSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      console.warn(
        "Contact form validation failed.",
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
      name,
      email,
      phone,
      message,
      consent,
    } = parsed.data;

    /*
     * Store only validated and
     * normalized values.
     */
    const [submission] =
      await db
        .insert(
          contactSubmissionsTable,
        )
        .values({
          name,

          email:
            email.toLowerCase(),

          phone,

          message,

          consentGiven:
            consent,

          ipAddress:
            ip,
        })
        .returning({
          id:
            contactSubmissionsTable.id,
        });

    /*
     * Never log the submitted name,
     * email, phone number, message,
     * or other form PII.
     */
    console.info(
      "Contact submission stored.",
      {
        submissionId:
          submission.id,

        type:
          "contact",
      },
    );

    /*
     * Send a privacy-minimized email
     * notification.
     *
     * The notification contains the
     * submission ID and admin portal
     * link only.
     *
     * The database remains the source
     * of truth.
     */
    await sendContactNotification({
      submissionId:
        submission.id,
    });

    return NextResponse.json(
      {
        id:
          submission.id,

        message:
          "Thank you — your message has been received.",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    /*
     * Do not dump submitted form data
     * into application logs.
     */
    console.error(
      "Contact submission failed.",
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
          "We couldn't send your message right now. Please try again or call us directly at 251-288-0194.",
      },
      {
        status: 500,
      },
    );
  }
}