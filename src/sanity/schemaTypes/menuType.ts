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
      of: [{ type: 'string' }],
    },
    {
      name: 'drinkSpecials',
      title: 'Drink Specials',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
});
