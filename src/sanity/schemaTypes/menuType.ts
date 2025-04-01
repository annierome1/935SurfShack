import { defineType } from 'sanity';

export default defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    {
      name: 'menuPdf',
      title: 'Food Menu PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'drinkPdf',
      title: 'Drink Menu PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'foodSpecials',
      title: 'Food Specials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'image', title: 'Image', type: 'image' },
          ],
        },
      ],
    },
    {
      name: 'drinkSpecials',
      title: 'Drink Specials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'image', title: 'Image', type: 'image' },
          ],
        },
      ],
    },
  ],
});
