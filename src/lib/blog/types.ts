import { z } from "zod";

export const ExternalLinkSchema = z.object({
  label: z.string().min(1, "Link label is required"),
  url: z.url("Must be a valid URL"),
});

export const PostMetadataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dateCreated: z
    .iso.datetime({ message: "Date created must be a valid ISO 8601 datetime" }),
  dateModified: z
    .iso.datetime({ message: "Date modified must be a valid ISO 8601 datetime" })
    .optional(),
  tags: z.array(z.string()).optional(),
  links: z.array(ExternalLinkSchema).optional(),
  slug: z.string(),
});

export type ExternalLink = z.infer<typeof ExternalLinkSchema>;
export type PostMetadata = z.infer<typeof PostMetadataSchema>;

export interface Post {
  metadata: PostMetadata;
  content: React.ReactNode;
}
