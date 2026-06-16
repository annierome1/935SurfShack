import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'array',
      description: 'Each row is a day group and its open time. Drag to reorder.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'days',
              title: 'Days',
              type: 'string',
              description: 'e.g. "Mon", "Wed–Fri", "Sat–Sun"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'time',
              title: 'Time',
              type: 'string',
              description: 'e.g. "3–8pm", "12–8pm", or "Closed"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'days', subtitle: 'time' },
          },
        },
      ],
    }),
  ],
})
