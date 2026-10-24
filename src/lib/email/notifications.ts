import "server-only";

import { Resend } from "resend";

/*
 * Helping Hands Home & Community Based Services
 *
 * Email Notification Service
 *
 * Sends privacy-minimized notifications
 * for contact and referral submissions.
 *
 * Sensitive submission details are NOT
 * included in outgoing emails.
 */

interface ContactNotification {
  submissionId: number;
}

interface ReferralNotification {
  submissionId: number;
}

/*
 * Read and validate email configuration.
 *
 * IMPORTANT:
 * Diagnostic logs only contain true/false
 * values. API keys and email addresses
 * are never printed.
 */
function getEmailConfig() {
  const apiKey =
    process.env.RESEND_API_KEY?.trim();

  const notificationEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL?.trim();

  const fromEmail =
    process.env.NOTIFICATION_FROM_EMAIL?.trim();

  /*
   * Identify missing environment variables.
   */
  const configurationStatus = {
    resendApiKeyPresent: Boolean(apiKey),

    adminNotificationEmailPresent:
      Boolean(notificationEmail),

    notificationFromEmailPresent:
      Boolean(fromEmail),
  };

  if (
    !apiKey ||
    !notificationEmail ||
    !fromEmail
  ) {
    console.warn(
      "Email configuration check:",
      configurationStatus,
    );

    return null;
  }

  return {
    apiKey,
    notificationEmail,
    fromEmail,
  };
}

/*
 * Generate a secure admin portal link.
 *
 * This link points to the login page,
 * not directly to private submission data.
 */
function getAdminPortalUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return null;
  }

  try {
    const url = new URL(siteUrl);

    return `${url.origin}/admin/login`;
  } catch {
    return null;
  }
}

/*
 * Send contact submission notification.
 */
export async function sendContactNotification(
  submission: ContactNotification,
) {
  const config = getEmailConfig();

  /*
   * Database submissions must remain
   * successful even when email delivery
   * is temporarily unavailable.
   */
  if (!config) {
    console.warn(
      "Contact notification email skipped because email configuration is incomplete.",
      {
        submissionId: submission.submissionId,
      },
    );

    return {
      sent: false,
    };
  }

  try {
    const resend = new Resend(
      config.apiKey,
    );

    const adminPortalUrl =
      getAdminPortalUrl();

    const result =
      await resend.emails.send({
        from: config.fromEmail,

        to: [
          config.notificationEmail,
        ],

        subject:
          `New Helping Hands Contact Submission #${submission.submissionId}`,

        html: `
          <h2>New Contact Submission</h2>

          <p>
            A new contact request has been received
            through the Helping Hands website.
          </p>

          <p>
            <strong>Submission ID:</strong>
            ${submission.submissionId}
          </p>

          <p>
            For privacy and security, submission
            details are not included in this email.
          </p>

          ${
            adminPortalUrl
              ? `
                <p>
                  <a href="${adminPortalUrl}">
                    Sign in to the Helping Hands Admin Portal
                  </a>
                  to review the submission.
                </p>
              `
              : `
                <p>
                  Sign in to the Helping Hands Admin Portal
                  to review the submission.
                </p>
              `
          }
        `,
      });

    /*
     * Handle Resend API errors.
     */
    if (result.error) {
      throw new Error(
        result.error.message,
      );
    }

    console.info(
      "Contact notification email sent.",
      {
        submissionId:
          submission.submissionId,
      },
    );

    return {
      sent: true,
    };
  } catch (error) {
    console.error(
      "Contact notification email failed.",
      {
        submissionId:
          submission.submissionId,

        error:
          error instanceof Error
            ? error.message
            : "Unknown email error",
      },
    );

    return {
      sent: false,
    };
  }
}

/*
 * Send referral submission notification.
 *
 * Referral notifications contain only
 * the submission ID and admin login link.
 *
 * No child, family, or referral details
 * are transmitted in the email.
 */
export async function sendReferralNotification(
  submission: ReferralNotification,
) {
  const config = getEmailConfig();

  if (!config) {
    console.warn(
      "Referral notification email skipped because email configuration is incomplete.",
      {
        submissionId:
          submission.submissionId,
      },
    );

    return {
      sent: false,
    };
  }

  try {
    const resend = new Resend(
      config.apiKey,
    );

    const adminPortalUrl =
      getAdminPortalUrl();

    const result =
      await resend.emails.send({
        from:
          config.fromEmail,

        to: [
          config.notificationEmail,
        ],

        subject:
          `New Helping Hands Referral #${submission.submissionId}`,

        html: `
          <h2>New Referral Submission</h2>

          <p>
            A new referral has been received
            through the Helping Hands website.
          </p>

          <p>
            <strong>Submission ID:</strong>
            ${submission.submissionId}
          </p>

          <p>
            For privacy and security, referral
            details are not included in this email.
          </p>

          ${
            adminPortalUrl
              ? `
                <p>
                  <a href="${adminPortalUrl}">
                    Sign in to the Helping Hands Admin Portal
                  </a>
                  to review the referral.
                </p>
              `
              : `
                <p>
                  Sign in to the Helping Hands Admin Portal
                  to review the referral.
                </p>
              `
          }
        `,
      });

    /*
     * Handle Resend API errors.
     */
    if (result.error) {
      throw new Error(
        result.error.message,
      );
    }

    console.info(
      "Referral notification email sent.",
      {
        submissionId:
          submission.submissionId,
      },
    );

    return {
      sent: true,
    };
  } catch (error) {
    console.error(
      "Referral notification email failed.",
      {
        submissionId:
          submission.submissionId,

        error:
          error instanceof Error
            ? error.message
            : "Unknown email error",
      },
    );

    return {
      sent: false,
    };
  }
}