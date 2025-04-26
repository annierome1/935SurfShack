import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
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
    defineField({
      name: 'foodSpecials',
      title: 'Food Specials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'number' }),
            defineField({ name: 'image', title: 'Image', type: 'image' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'drinkSpecials',
      title: 'Drink Specials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'number' }),
            defineField({ name: 'image', title: 'Image', type: 'image' }),
          ],
        }),
      ],
    }),
  ],
})
