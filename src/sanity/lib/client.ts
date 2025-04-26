import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 1) First create the Sanity client
export const client = createClient({
  projectId: 'igpp6z91',   // your actual Project ID
  dataset:   'events',      // your dataset
  apiVersion:'2023-03-01',  // a date-based version
  useCdn:    true,          // `false` for fresh data
  // token: process.env.SANITY_API_TOKEN, // if you need auth
})

// 2) Then wire up the image builder
const builder = imageUrlBuilder(client)

/** helper to generate image URLs */
export function urlFor(source: any) {
  return builder.image(source)
}
