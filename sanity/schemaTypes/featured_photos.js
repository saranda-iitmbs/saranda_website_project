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
      name: "index",
      type: "number",
      title: "Index",
      description: "Index starts from 1",
      validation: rule => rule.positive().integer().max(10),
      initialValue: 10,
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      validation: rule => rule.required(),
      options: {
        hotspot: true,
      }
    }),
  ],
})