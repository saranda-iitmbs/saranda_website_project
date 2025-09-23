import { defineType, defineField } from "sanity";

export default defineType({
  name: "featured_photos",
  type: "document",
  title: "Featured Section Photos",
  description: "The Photos for the featured events/meetups section in the landing page",
  fields: [
    defineField({
      name: "description",
      type: "string",
      title: "A short description for the image(optional)",
      validation: rule => rule.max(100),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: rule => rule.required(),
      options: {
        source: (doc, options) => doc.description || doc._id,
      }
    })
  ],
})