import { defineArrayMember, defineField, defineType } from "sanity";
import { getYouTubeId } from "../youtube";

const altField = defineField({
  name: "alt",
  title: "Image description",
  type: "string",
  description: "Describe the image in a few words for screen readers and Google.",
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Page link",
      type: "slug",
      description: "Click Generate. This becomes naukedo.com/work/your-link.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Decides which filter shows this project on the Work page.",
      options: {
        list: ["Social", "Shoots", "Web", "Branding", "Motion"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client name",
      type: "string",
    }),
    defineField({
      name: "hideClient",
      title: "Hide client name on the website",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "clientIndustry",
      title: "Client industry",
      type: "string",
      description: "Example: Food & Beverage",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One short line shown in red on the project page.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "overview",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "Shown on the project card and at the top of the project page.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "body",
      title: "Full description",
      type: "text",
      rows: 6,
      description: "Optional. Explains the approach on the project page.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      description: "Main image for the project card and page.",
      options: { hotspot: true },
      fields: [altField],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Image gallery",
      type: "array",
      description: "Optional. Extra images shown on the project page.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [altField],
        }),
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube link",
      type: "url",
      description:
        "Optional. Paste an unlisted YouTube or Shorts link. It plays at the top of the project page.",
      validation: (rule) =>
        rule.custom((value?: string) =>
          !value || getYouTubeId(value) ? true : "Paste a valid YouTube link."
        ),
    }),
    defineField({
      name: "deliverables",
      title: "Services delivered",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "featured",
      title: "Show on home page",
      type: "boolean",
      description: "The home page shows the 5 newest projects with this on.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
