/**
 * Run once to seed the hours document into Sanity.
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/seedHours.js
 *
 * Get a token at: https://sanity.io/manage → project → API → Tokens → Add API token (Editor)
 */

const { createClient } = require('@sanity/client')

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Missing SANITY_TOKEN. Run as: SANITY_TOKEN=<token> node scripts/seedHours.js')
  process.exit(1)
}

const client = createClient({
  projectId: 'igpp6z91',
  dataset: 'events',
  apiVersion: '2024-06-01',
  token,
  useCdn: false,
})

const doc = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  hours: [
    { _key: 'mon',    days: 'Mon',     time: '3–8pm'  },
    { _key: 'wedfri', days: 'Wed–Fri', time: '3–8pm'  },
    { _key: 'satsun', days: 'Sat–Sun', time: '12–8pm' },
  ],
}

client.createOrReplace(doc)
  .then(() => console.log('✓ Hours seeded successfully'))
  .catch(err => { console.error('Error:', err.message); process.exit(1) })
