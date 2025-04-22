// pages/api/inquiry.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// map “formType” → recipient
const RECIPIENTS = {
  general:  'hello@surfshack.com',
  events:   'events@surfshack.com',
  booking:  'booking@surfshack.com',
  support:  'support@surfshack.com',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // pull formType (and anything else your forms send)
  const { formType = 'general', name, email, message, ...rest } = req.body;
  const to = RECIPIENTS[formType] || RECIPIENTS.general;

  // build a little HTML dynamically from whatever fields you like
  const html = `
    <p><strong>Form:</strong> ${formType}</p>
    ${name      ? `<p><strong>Name:</strong> ${name}</p>`      : ''}
    ${email     ? `<p><strong>Email:</strong> ${email}</p>`    : ''}
    ${message   ? `<p><strong>Message:</strong> ${message}</p>`: ''}
    ${Object.entries(rest).map(([k,v]) =>
       `<p><strong>${k}:</strong> ${v}</p>`).join('')}
  `;

  try {
    await transporter.sendMail({
      from: `"935 Surf Shack" <${process.env.SMTP_USER}>`,
      to,
      subject: `🔔 New “${formType}” submission`,
      html,
    });
    res.status(200).json({ message: 'Sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send.' });
  }
}
