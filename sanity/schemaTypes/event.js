import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  type: "document",
  title: "Event Posts",
  fields: [
    defineField({
      name: "eventname",
      title: "Event Name",
      type: "string",
      validation: rule => rule.required().min(1).max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{
        type: "block",
        options: {spellCheck: true},
        styles: [],
      }],
    }),
    defineField({
      name: "community",
      title: "Related Community (if any)",
      type: "reference",
      to: [{ type: "community" }],
      weak: true,
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{
        name: "link",
        type: "document",
        fields: [
          defineField({
            name: "text",
            type: "string",
            validation: rule => rule.required(),
          }),
          defineField({
            name: "url",
            type: "string",
            validation: rule => rule.required(),
          }),
        ],
      }]
    }),
    defineField({
      name: "poster",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "enddate",
      title: "End Date",
      type: "datetime",
      validation: rule => rule.required()
    }),
  ],
})