const API_URL = process.env.INSTAGRAM_FEED_API_URL
const API_KEY = process.env.INSTAGRAM_FEED_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!API_URL || !API_KEY) {
    return res.status(503).json({ ok: false, error: 'Instagram feed not configured' })
  }

  const limit = Math.min(
    Math.max(1, parseInt(req.query.limit ?? '12', 10)),
    24
  )
  const url = `${API_URL}${API_URL.includes('?') ? '&' : '?'}limit=${limit}`

  try {
    const upstream = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    const data = await upstream.json()

    res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=300')
    return res.status(upstream.status).json(data)
  } catch (err) {
    console.error('[instagram-feed] upstream error:', err)
    return res.status(502).json({ ok: false, error: 'UPSTREAM_ERROR' })
  }
}
