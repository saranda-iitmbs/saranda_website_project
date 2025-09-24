import { defineType, defineField } from "sanity";

export default defineType({
  name: "meetup",
  type: "document",
  title: "Meet Up Posts",
  fields: [
    defineField({
      name: "meetupname",
      title: "Title",
      type: "string",
      validation: rule => rule.required().min(1).max(80),
    }),
    defineField({
      name: "descripton",
      title: "Description",
      type: "text",
      validation: rule => rule.max(200),
    }),
    defineField({
      name: "date",
      type: "date",
      validation: rule => rule.required()
    }),
    defineField({
      name: "photos",
      type: "array",
      of: [{
        name: "image",
        type: "image",
        options: {
          hotspot: true,
        }
      }],
      options: {
        sortable: true,
      }
    }),
  ],
})