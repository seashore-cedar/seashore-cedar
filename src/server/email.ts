/**
 * Send transactional email via Brevo (formerly Sendinblue) HTTP API.
 * Configure with environment variables:
 *   BREVO_API_KEY   - Your Brevo API key (Settings → API Keys)
 *   SMTP_FROM       - From address e.g. "Seashore Cedar <seashorecedar@usa.com>"
 */

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  from?: string;
};

export type SendEmailResult = {
  messageId: string;
};

function parseAddress(addr: string): { email: string; name?: string } {
  const match = addr.match(/^(.+?)\s*<([^>]+)>$/);
  if (match) return { name: match[1].trim(), email: match[2].trim() };
  return { email: addr.trim() };
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('BREVO_API_KEY environment variable not set.');

  const fromStr = input.from ?? process.env.SMTP_FROM ?? '';
  const sender = parseAddress(fromStr);

  const toList = Array.isArray(input.to) ? input.to : [input.to];
  const toAddresses = toList.map(parseAddress);

  const body: Record<string, unknown> = {
    sender,
    to: toAddresses,
    subject: input.subject,
  };

  if (input.html) body.htmlContent = input.html;
  if (input.text) body.textContent = input.text;
  if (input.replyTo) body.replyTo = parseAddress(input.replyTo);

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo API error ${res.status}: ${err}`);
  }

  const data = await res.json() as { messageId?: string };
  return { messageId: data.messageId ?? 'sent' };
}
