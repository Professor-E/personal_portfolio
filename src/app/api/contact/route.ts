import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Types ─────────────────────────────────────────────────────────────────────
interface ContactBody {
  name: unknown;
  email: unknown;
  message: unknown;
}

// ── Validation (mirrors client-side rules) ────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(body: ContactBody): string | null {
  const { name, email, message } = body;
  if (typeof name !== "string" || name.trim().length < 2)
    return "Name must be at least 2 characters.";
  if (typeof email !== "string" || !EMAIL_RE.test(email))
    return "A valid email address is required.";
  if (typeof message !== "string" || message.trim().length < 10)
    return "Message must be at least 10 characters.";
  return null;
}

// ── HTML email template ───────────────────────────────────────────────────────
function buildHtml(name: string, email: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio Contact</title>
</head>
<body style="margin:0;padding:0;background:#fafaf7;font-family:Inter,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;box-shadow:0 4px 16px rgba(0,0,0,0.08);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#0a6cff;padding:24px 32px;">
              <p style="margin:0;color:rgba(250,250,247,0.7);font-size:10px;letter-spacing:2px;font-weight:500;">PORTFOLIO CONTACT</p>
              <p style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:600;">New message from ${escapeHtml(name)}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:8px;letter-spacing:1.6px;text-transform:uppercase;color:rgba(95,94,90,0.8);font-weight:500;">FROM</p>
                    <p style="margin:0;font-size:14px;color:#1a1a1a;font-weight:500;">${escapeHtml(name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:8px;letter-spacing:1.6px;text-transform:uppercase;color:rgba(95,94,90,0.8);font-weight:500;">REPLY-TO</p>
                    <a href="mailto:${escapeHtml(email)}" style="margin:0;font-size:14px;color:#0a6cff;font-weight:500;text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:8px;letter-spacing:1.6px;text-transform:uppercase;color:rgba(95,94,90,0.8);font-weight:500;">MESSAGE</p>
                    <div style="background:#f5f5f0;border-radius:8px;padding:16px;">
                      <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#e8e7e2;padding:16px 32px;border-top:1px solid rgba(0,0,0,0.06);">
              <p style="margin:0;font-size:10px;color:rgba(95,94,90,0.8);">
                Sent via dominikgrzeszczak.com contact form
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 2. Server-side validation
  const validationError = validateBody(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const name = (body.name as string).trim();
  const email = (body.email as string).trim();
  const message = (body.message as string).trim();

  // 3. Send via Resend
  const toEmail = process.env.CONTACT_EMAIL_TO;
  const fromEmail = process.env.CONTACT_EMAIL_FROM;

  if (!toEmail || !fromEmail) {
    console.error("[contact] Missing CONTACT_EMAIL_TO or CONTACT_EMAIL_FROM env vars");
    return NextResponse.json(
      { error: "Server misconfiguration — email not configured." },
      { status: 500 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `[Portfolio Contact] from ${name}`,
      html: buildHtml(name, email, message),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
