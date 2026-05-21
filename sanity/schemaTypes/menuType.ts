import { defineField, defineType } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Surf Shack Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'menuPdf',
      title: 'Menu PDF',
      type: 'file',
      options: { accept: '.pdf' },
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Surf Shack Menu',
        subtitle: 'Menu PDF',
      }
    },
  },
})
