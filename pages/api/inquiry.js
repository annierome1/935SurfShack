// pages/api/inquiry.js
import nodemailer from 'nodemailer';

// configure a transporter—here using SMTP; you can also use SendGrid, Mailgun, etc.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // e.g. "smtp.gmail.com"
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,                      // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,     // your SMTP username
    pass: process.env.SMTP_PASS      // your SMTP password or app‑password
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, eventDate, eventType, numberOfGuests, additionalInfo } = req.body;

  try {
    await transporter.sendMail({
      from: `"935 Surf Shack Inquiry" <${process.env.SMTP_USER}>`,
      to:  'you@yourdomain.com',         // ← where inquiries go
      subject: `New Event Inquiry from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Type:</strong> ${eventType}</p>
        <p><strong>Guests:</strong> ${numberOfGuests || '–'}</p>
        <p><strong>Info:</strong> ${additionalInfo || '–'}</p>
      `,
    });

    return res.status(200).json({ message: 'Inquiry sent!' });
  } catch (error) {
    console.error('Mail error:', error);
    return res.status(500).json({ error: 'Failed to send inquiry.' });
  }
}
