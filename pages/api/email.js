// pages/api/send-email.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,               // e.g. 'smtp.gmail.com'
  port: Number(process.env.SMTP_PORT),       // e.g. 465
  secure: true,                              // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,             // your SMTP username
    pass: process.env.SMTP_PASS,             // your SMTP password or app-specific password
  },
});

function humanize(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^./, (s) => s.toUpperCase());
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { to, subject, formType, data } = req.body;
    const { name, email, message, ...others } = data;

    // 1. Pick the right intro line based on formType
    const lines = [`Hi! My name is ${name}.`, ''];

    if (formType === 'eventInquiry') {
      lines.push("I'm interested in booking an event with these details:", '');
    } else if (formType === 'careers') {
      lines.push("I'd like to submit my application for:", '');
    } else {
      // default → general inquiry
      lines.push('I have a question regarding:', '');
    }

    // 2. Dump all the extra fields (date, type, guests, etc.)
    Object.entries(others).forEach(([key, val]) => {
      if (val) lines.push(`${humanize(key)}: ${val}`);
    });

    // 3. If there's a free-form message, tack it on at the end
    if (message) {
      lines.push('', message);
    }

    lines.push('', 'Thanks!', name);

    // 4. Build HTML and plain-text bodies
    const html = lines.map((l) => `<p>${l}</p>`).join('');
    const text = lines.join('\n');

    // 5. Send via SMTP
    await transporter.sendMail({
      from: `"${data.name}" <${data.email}>`,
      to,
      subject,
      text,
      html,
      replyTo: data.email
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mail send error:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
