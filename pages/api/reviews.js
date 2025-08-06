// pages/api/reviews.js
export default async function handler(req, res) {
  const key     = process.env.GOOGLE_PLACES_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const url     = `https://maps.googleapis.com/maps/api/place/details/json`
                + `?place_id=${placeId}`
                + `&fields=name,rating,reviews`
                + `&key=${key}`;

  const r    = await fetch(url);
  if (!r.ok) {
    return res.status(r.status).json({ error: 'Places API error' });
  }

  const json    = await r.json();
  const allRevs = (json.result.reviews || []);

  // Keep only 4★ and 5★ reviews
  const filtered = allRevs.filter((rev) => rev.rating >= 4);

  return res.status(200).json(filtered);
}
