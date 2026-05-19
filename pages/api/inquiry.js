import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// map “formType” → recipient
const RECIPIENTS = {
  general:  'hello@surfshack.com',
  events:   'events@surfshack.com',
  booking:  'booking@surfshack.com',
  support:  'support@surfshack.com',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { formType = 'general', name, email, message, ...rest } = req.body;
  const to = RECIPIENTS[formType] || RECIPIENTS.general;

  const html = `
    <p><strong>Form:</strong> ${formType}</p>
    ${name      ? `<p><strong>Name:</strong> ${name}</p>`      : ''}
    ${email     ? `<p><strong>Email:</strong> ${email}</p>`    : ''}
    ${message   ? `<p><strong>Message:</strong> ${message}</p>`: ''}
    ${Object.entries(rest).map(([k,v]) =>
       `<p><strong>${k}:</strong> ${v}</p>`).join('')}
  `;

  try {
    const { error } = await resend.emails.send({
      from: `935 Website Inquiry <${process.env.RESEND_FROM_EMAIL}>`,
      to,
      subject: `New “${formType}” submission`,
      html,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send.' });
    }

    res.status(200).json({ message: 'Sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send.' });
  }
}
