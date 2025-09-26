import { defineType, defineField } from "sanity";

export default defineType({
  name: "extra_footer_links",
  type: "document",
  title: "Extra Footer Links",
  description: "A group of extra links to show up in the footer of the page in addition to the links already there",
  fields: [
    defineField({
      name: "link_group_name",
      type: "string",
      initialValue: "other_useful_links",
      validation: rule => rule.required(),
      options: {
        list: ["contacts", "quick_links", "other_useful_links"],
        layout: "radio",
      }
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
            validation: rule => rule.required()
          }),
          defineField({
            name: "url",
            type: "url",
            validation: rule => rule.required()
          })
        ]
      }]
    })
  ]
})