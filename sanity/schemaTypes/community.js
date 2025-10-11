import { defineType, defineField } from "sanity";

export default defineType({
  name: "community",
  type: "document",
  title: "Community",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The name of the Community",
      validation: rule => rule.required().min(2).max(32),
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "joining_form",
      type: "url",
    }),
    defineField({
      name: "card_poster",
      type: "image",
      description: "this will be used on home page in the communities section",
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: "banner",
      type: "image",
      description: "will be used as the banner in the community's page",
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: "events",
      type: "array",
      of: [{
        name: "event",
        type: "document",
        fields: [
          defineField({
            name: "title",
            type: "string",
            validation: rule => rule.required().min(2).max(64),
          }),
          defineField({
            name: "description",
            type: "text",
          }),
          defineField({
            name: "poster",
            type: "image",
            options: {
              hotspot: true,
            }
          }),
        ]
      }]
    })
  ],
})