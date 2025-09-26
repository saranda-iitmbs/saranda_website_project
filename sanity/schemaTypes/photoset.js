import { defineType, defineField } from "sanity";

export default defineType({
  name: "photoset",
  type: "document",
  title: "Photo Sets",
  fields: [
    defineField({
      name: "setname",
      type: "string",
      validation: rule => rule.required().min(2).max(20),
      options: {
        list: ["featured_photos", "art_gallery"],
        layout: "radio",
      },
    }),
    defineField({
      name: "description",
      type: "string",
      title: "A short description for the set images",
      validation: rule => rule.max(100),
    }),
    defineField({
      name: "images",
      type: "array",
      options: {
        sortable: true,
      },
      of: [{
        name: "image",
        type: "image",
        validation: rule => rule.required(),
        options: { hotspot: true, },
        fields: [
          defineField({
            name: "caption",
            type: "text",
          })
        ]
      }],
    }),
  ],
})