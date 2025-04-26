// src/sanity/lib/client.ts
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 1) Sanity client
export const client = createClient({
  projectId: 'igpp6z91',
  dataset:   'events',
  apiVersion:'2023-03-01',
  useCdn:    true,
})

// 2) Image URL builder
const builder = imageUrlBuilder(client)

// 3) Infer the “source” type from builder.image
type ImageSource = Parameters<typeof builder.image>[0]

/** helper to generate image URLs */
export function urlFor(source: ImageSource) {
  return builder.image(source)
}
