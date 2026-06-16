import { createClient } from '@sanity/client'

const HOURS_QUERY = `*[_type == "siteSettings"][0].hours`

// useCdn: false so edits in Sanity appear immediately rather than waiting for CDN propagation
const hoursClient = createClient({
  projectId: 'igpp6z91',
  dataset: 'events',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

export const FALLBACK_HOURS = [
  { _key: 'mon',     days: 'Mon',     time: '3–8pm'  },
  { _key: 'wedfri',  days: 'Wed–Fri', time: '3–8pm'  },
  { _key: 'satsun',  days: 'Sat–Sun', time: '12–8pm' },
]

export async function getHours() {
  try {
    const hours = await hoursClient.fetch(HOURS_QUERY)
    return (hours && hours.length > 0) ? hours : FALLBACK_HOURS
  } catch (err) {
    console.error('[getHours] fetch failed:', err.message)
    return FALLBACK_HOURS
  }
}
