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
      name: "descripton",
      title: "Description",
      type: "text",
      validation: rule => rule.max(2000),
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
      description: "This date is used to determine where the event is past event or not. This date will not be shown in the events post.",
      type: "date",
      validation: rule => rule.required()
    }),
  ],
})