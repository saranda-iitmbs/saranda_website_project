import { defineType, defineField } from "sanity";

export default defineType({
  name: "community_card",
  type: "document",
  title: "Community Cards",
  description: "Community cards data for the Communities section in the landing page",
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
      type: "string",
      title: "A short description for the community(optional)",
      validation: rule => rule.max(180),
    }),
    defineField({
      name: "href",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Poster",
      validation: rule => rule.required(),
      options: {
        hotspot: true,
      }
    }),
  ],
})