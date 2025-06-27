// pages/api/revalidate.js
export default async function handler(req, res) {
  // Only allow POST from your Sanity webhook
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // TODO: verify your webhook signature here!

  // Grab either slug or _id
  const { slug, _id } = req.body;
  if (!slug && !_id) {
    return res
      .status(400)
      .json({ message: 'No slug or _id found in webhook payload' });
  }

  // Construct your dynamic route path
  const path = slug
    ? `/events/${slug}`
    : `/events/${_id}`;

  try {
    // This is the Next.js helper that triggers an ISR revalidation
    await res.revalidate(path);
    return res.json({ revalidated: true, path });
  } catch (err) {
    console.error('Error revalidating:', err);
    return res
      .status(500)
      .json({ message: `Failed to revalidate ${path}`, error: err.message });
  }
}
