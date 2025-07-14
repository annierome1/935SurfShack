// pages/api/revalidate.js
export default async function handler(req, res) {
  // Ensure only Sanity can trigger this
  const secret = req.query.secret;
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Revalidate the /events route
    await res.revalidate('/events');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
