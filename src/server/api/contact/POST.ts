import type { Request, Response } from 'express';
import { sendEmail } from '../../email.js';

export default async function handler(req: Request, res: Response) {
  const { name, email, phone, subject, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'Name, email, and message are required.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    res.status(400).json({ error: 'Please provide a valid email address.' });
    return;
  }

  const recipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL;
  if (!recipient) {
    console.error('contact.form: CONTACT_FORM_RECIPIENT_EMAIL env var not set');
    res.status(500).json({ error: 'Contact form is not configured. Please try again later.' });
    return;
  }

  const subjectLine = subject?.trim()
    ? `Seashore Cedar Inquiry: ${subject.trim()}`
    : `Seashore Cedar Inquiry from ${name.trim()}`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c1a0e;">
      <div style="background: #8B5E3C; padding: 24px 32px; border-radius: 4px 4px 0 0;">
        <h1 style="margin: 0; color: #fff; font-size: 22px; letter-spacing: -0.5px;">New Contact Form Submission</h1>
        <p style="margin: 6px 0 0; color: rgba(255,255,255,0.75); font-size: 14px;">Seashore Cedar Website</p>
      </div>
      <div style="background: #fdf8f3; padding: 32px; border: 1px solid #e8ddd0; border-top: none; border-radius: 0 0 4px 4px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 13px; color: #8B5E3C; font-weight: bold; width: 110px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 14px;">${escapeHtml(name.trim())}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 13px; color: #8B5E3C; font-weight: bold; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 14px;"><a href="mailto:${escapeHtml(email.trim())}" style="color: #3c698b;">${escapeHtml(email.trim())}</a></td>
          </tr>
          ${phone?.trim() ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 13px; color: #8B5E3C; font-weight: bold; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 14px;">${escapeHtml(phone.trim())}</td>
          </tr>` : ''}
          ${subject?.trim() ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 13px; color: #8B5E3C; font-weight: bold; vertical-align: top;">Subject</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 14px;">${escapeHtml(subject.trim())}</td>
          </tr>` : ''}
        </table>
        <div>
          <p style="margin: 0 0 10px; font-size: 13px; color: #8B5E3C; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <div style="background: #fff; border: 1px solid #e8ddd0; border-radius: 4px; padding: 16px 20px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message.trim())}</div>
        </div>
        <p style="margin: 24px 0 0; font-size: 12px; color: #aaa;">
          Reply directly to this email to respond to ${escapeHtml(name.trim())}.
        </p>
      </div>
    </div>
  `;

  const text = [
    'New Submission — Seashore Cedar',
    '─'.repeat(48),
    `Name:    ${name.trim()}`,
    `Email:   ${email.trim()}`,
    phone?.trim() ? `Phone:   ${phone.trim()}` : '',
    subject?.trim() ? `Subject: ${subject.trim()}` : '',
    '',
    'Message:',
    message.trim(),
  ].filter(Boolean).join('\n');

  try {
    await sendEmail({
      to: recipient,
      replyTo: email.trim(),
      subject: subjectLine,
      html,
      text,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact.form: email send failed', err);
    res.status(500).json({ error: 'Failed to send your message. Please try again.' });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
