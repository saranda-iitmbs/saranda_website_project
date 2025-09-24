import { defineType, defineField } from "sanity";

export default defineType({
  name: "team",
  type: "document",
  title: "Teams",
  description: "Details about the different teams and their members in the house",
  fields: [
    defineField({
      name: "longname",
      title: "Name of the team(No Acronym)",
      type: "string",
      validation: rule => rule.required().min(2).max(80),
    }),
    defineField({
      name: "teamname",
      title: "Short name of the team",
      type: "string",
      description: "for uniquely identifying it",
      validation: rule => rule.required().min(1).max(80),
      options: {
        list: ['uhc', 'lhc', 'webops', 'content', 'design'],
        layout: 'radio',
      },
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      of: [{
        name: "person",
        type: "document",
        title: "People",
        description: "Details about people in the house",
        fields: [
          defineField({
            name: "fullname",
            type: "string",
            validation: rule => rule.required().min(2).max(50),
          }),
          defineField({
            name: "position",
            type: "string",
            validation: rule => rule.required().min(2).max(80),
          }),
          defineField({
            name: "email",
            type: "string",
            validation: rule => rule.email(),
          }),
          defineField({
            name: "image",
            type: "image",
            title: "Photo",
            options: {
              hotspot: true,
            }
          }),
        ],
      }],
      validation: rule => rule.required().unique(),
      options: {
        sortable: true,
      }
    }),
  ],
})