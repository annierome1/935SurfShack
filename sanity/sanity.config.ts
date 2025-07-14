import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import deskStructure from './deskStructure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: '935SurfShack',

  projectId: 'igpp6z91',
  dataset: 'events',

  plugins: [
    deskTool({ structure: deskStructure }), // ✅ Now works
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
