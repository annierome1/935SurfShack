import { client } from '../sanity/lib/client'

const HOURS_QUERY = `*[_type == "siteSettings"][0].hours`

export const FALLBACK_HOURS = [
  { _key: 'mon',     days: 'Mon',     time: '3–8pm'  },
  { _key: 'wedfri',  days: 'Wed–Fri', time: '3–8pm'  },
  { _key: 'satsun',  days: 'Sat–Sun', time: '12–8pm' },
]

export async function getHours() {
  try {
    const hours = await client.fetch(HOURS_QUERY)
    return (hours && hours.length > 0) ? hours : FALLBACK_HOURS
  } catch {
    return FALLBACK_HOURS
  }
}
