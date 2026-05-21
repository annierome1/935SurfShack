import { defineArrayMember, defineField, defineType } from 'sanity'

export const specialsType = defineType({
  name: 'specials',
  title: 'Food & Drink Specials',
  type: 'document',
  fields: [
    defineField({
      name: 'foodSpecials',
      title: 'Food Specials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
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
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'number' }),
            defineField({ name: 'image', title: 'Image', type: 'image' }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Food & Drink Specials',
      }
    },
  },
})
