import { defineField, defineType } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Surf Shack Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'menuPdf',
      title: 'Food Menu PDF',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'drinkPdf',
      title: 'Drink Menu PDF',
      type: 'file',
      options: { accept: '.pdf' },
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Surf Shack Menu',
        subtitle: 'Menu PDFs',
      }
    },
  },
})
