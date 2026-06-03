/**
 * Send transactional email via SMTP using nodemailer.
 * Configure with environment variables:
 *   SMTP_HOST     - SMTP server hostname (e.g. smtp.gmail.com)
 *   SMTP_PORT     - SMTP port (default: 587)
 *   SMTP_USER     - SMTP username / email address
 *   SMTP_PASS     - SMTP password or app password
 *   SMTP_FROM     - From address (defaults to SMTP_USER)
 */
import nodemailer from 'nodemailer';

export type SendEmailInput = {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  from?: string;
};

export type SendEmailResult = {
  messageId: string;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      'Email not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.'
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const transporter = getTransporter();
  const from = input.from ?? process.env.SMTP_FROM ?? process.env.SMTP_USER;

  const info = await transporter.sendMail({
    from,
    to: input.to,
    cc: input.cc,
    bcc: input.bcc,
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
  });

  return { messageId: info.messageId };
}
