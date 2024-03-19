import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "matthew-hre",
      name: "matthew-hre",
    },
    branchPrefix: "v2",
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "public/content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        createdDate: fields.datetime({
          label: "Created",
          description: "The date the post was created.",
        }),
        lastModifiedDate: fields.datetime({ label: "Last Modified" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tag",
          itemLabel: (props) => props.value,
        }),

        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images",
            publicPath: "/images",
            schema: {
              title: fields.text({
                label: "Caption",
                description:
                  "The text to display under the image in a caption.",
              }),
            },
          },
        }),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "public/content/projects/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        createdDate: fields.datetime({
          label: "Created",
          description: "The date the post was created.",
        }),
        lastModifiedDate: fields.datetime({ label: "Last Modified" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tag",
          itemLabel: (props) => props.value,
        }),
        externalLink: fields.url({
          label: "External Link",
          description: "The link to the project.",
        }),

        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images",
            publicPath: "/images",
            schema: {
              title: fields.text({
                label: "Caption",
                description:
                  "The text to display under the image in a caption.",
              }),
            },
          },
        }),
      },
    }),
    learning: collection({
      label: "Learning",
      slugField: "title",
      path: "public/content/learning/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        createdDate: fields.datetime({
          label: "Created",
          description: "The date the post was created.",
        }),
        lastModifiedDate: fields.datetime({ label: "Last Modified" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tag",
          itemLabel: (props) => props.value,
        }),
        externalLink: fields.url({
          label: "External Link",
          description: "The link to the... learning.",
        }),

        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images",
            publicPath: "/images",
            schema: {
              title: fields.text({
                label: "Caption",
                description:
                  "The text to display under the image in a caption.",
              }),
            },
          },
        }),
      },
    }),
    games: collection({
      label: "Games",
      slugField: "title",
      path: "public/content/games/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        createdDate: fields.datetime({
          label: "Created",
          description: "The date the game was created.",
        }),
        lastModifiedDate: fields.datetime({ label: "Last Modified" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tag",
          itemLabel: (props) => props.value,
        }),
        externalLink: fields.url({
          label: "External Link",
          description: "The link to the game.",
        }),
        splashImage: fields.image({
          label: "Splash Image",
          description: "The image to display as a splash image.",
        }),

        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images",
            publicPath: "/images",
            schema: {
              title: fields.text({
                label: "Caption",
                description:
                  "The text to display under the image in a caption.",
              }),
            },
          },
        }),
      },
    }),
  },
});
