import nodemailer from 'nodemailer';

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('⚠️ [MAILER] SMTP credentials not set in .env. Skipping external email send.');
    console.log(`[SIMULATED EMAIL TO: ${to}] SUBJECT: "${subject}"`);
    return { success: true, simulated: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const from = process.env.SMTP_FROM || `MENEN Engineering PLC <${user}>`;

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  return { success: true, messageId: info.messageId };
}