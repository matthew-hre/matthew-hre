import {
  config,
  fields,
  collection,
  LocalConfig,
  GitHubConfig,
} from "@keystatic/core";

const localMode: LocalConfig["storage"] = {
  kind: "local",
};

const githubMode: GitHubConfig["storage"] = {
  kind: "github",
  repo: {
    owner: "matthew-hre",
    name: "matthew-hre",
  },
};

export default config({
  storage: githubMode,
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "content/blog/*",
      entryLayout: "content",
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

        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      entryLayout: "content",
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

        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
    learning: collection({
      label: "Learning",
      slugField: "title",
      path: "content/learning/*",
      entryLayout: "content",
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

        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
    games: collection({
      label: "Games",
      slugField: "title",
      path: "content/games/*",
      entryLayout: "content",
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
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
});
