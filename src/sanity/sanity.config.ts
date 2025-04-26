import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { deskTool } from 'sanity/desk'
import {schemaTypes} from './schemaTypes'


export default defineConfig({
  name: 'default',
  title: '935SurfShack',

  projectId: 'igpp6z91',
  dataset: 'events',

  plugins: [structureTool(), visionTool(), deskTool()],

  schema: {
    types: schemaTypes,
  },
})
