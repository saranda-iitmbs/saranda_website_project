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
      description: "The date since when it'd stop showing up in the page. This date is used to determine where the event is past event or not. This date will not be shown in the events post. e.g. if the date the 1947-08-14 then it will not show up on the date 1947-08-14 or later",
      type: "date",
      validation: rule => rule.required()
    }),
  ],
})