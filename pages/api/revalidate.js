export default async function handler(req, res) {
  // Allow both GET and POST — Sanity webhooks send POST, but allow GET for manual testing
  const secret = req.query.secret;
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    console.log('[revalidate] Invalid secret received');
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const body = req.body || {};
    // Sanity sends _type at root level if projection is {_type}
    // Without projection it may be nested or absent
    const type = body._type || body?.document?._type;

    console.log('[revalidate] Webhook received:', JSON.stringify(body).slice(0, 500));
    console.log('[revalidate] Detected type:', type);

    // Map Sanity document types to the pages they affect
    const pathsByType = {
      event:    ['/events', '/'],
      menu:     ['/menu'],
      specials: ['/menu'],
    };

    // Default: revalidate all main pages
    const paths = pathsByType[type] || ['/', '/events', '/menu'];

    for (const path of paths) {
      await res.revalidate(path);
      console.log('[revalidate] Revalidated:', path);
    }

    return res.json({
      revalidated: true,
      paths,
      type: type || 'unknown',
    });
  } catch (err) {
    console.error('[revalidate] Error:', err);
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
