import { getHours } from '../../lib/getHours'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const hours = await getHours()
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json(hours)
}
