export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const secret = req.query.secret;
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const body = req.body;
    const type = body?._type;

    // Map Sanity document types to the pages they affect
    const pathsByType = {
      event:    ['/events', '/'],
      menu:     ['/menu'],
      specials: ['/menu'],
    };

    // Default: revalidate all main pages
    const paths = pathsByType[type] || ['/', '/events', '/menu'];

    await Promise.all(paths.map((path) => res.revalidate(path)));

    return res.json({
      revalidated: true,
      paths,
      type: type || 'unknown',
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
