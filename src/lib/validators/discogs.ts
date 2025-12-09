import { z } from 'zod';

const ArtistSchema = z.object({
  name: z.string(),
  anv: z.string().optional(),
  id: z.union([z.string(), z.number()]).optional(),
  resource_url: z.string().optional(),
  role: z.string().optional(),
  tracks: z.string().optional(),
});

const BasicInformationSchema = z.object({
  cover_image: z.string(),
  title: z.string(),
  artists: z.array(ArtistSchema),
  // these exist, we don't use 'em
  id: z.number().optional(),
  master_id: z.number().optional(),
  master_url: z.string().nullable().optional(),
  thumb: z.string().optional(),
  year: z.number().optional(),
  genres: z.array(z.string()).optional(),
  styles: z.array(z.string()).optional(),
  labels: z.array(z.object({
    name: z.string(),
    catno: z.string(),
  }).loose()).optional(),
  formats: z.array(z.object({
    name: z.string(),
    qty: z.string(),
    descriptions: z.array(z.string()).optional(),
  }).loose()).optional(),
  resource_url: z.string().optional(),
});

const ReleaseSchema = z.object({
  id: z.number(),
  basic_information: BasicInformationSchema,
  // these exist, we don't use 'em
  instance_id: z.number().optional(),
  date_added: z.string().optional(),
  rating: z.number().optional(),
  folder_id: z.number().optional(),
  notes: z.array(z.object({
    field_id: z.number(),
    value: z.string(),
  }).loose()).optional(),
}).transform(record => ({
  id: record.id,
  basic_information: {
    cover_image: record.basic_information.cover_image,
    title: record.basic_information.title,
    artists: record.basic_information.artists,
  },
}));

const PaginationSchema = z.object({
  page: z.number(),
  pages: z.number(),
  per_page: z.number(),
  items: z.number(),
  urls: z.unknown().optional()
});

const DiscogsResponseSchema = z.object({
  pagination: PaginationSchema,
  releases: z.array(ReleaseSchema),
}).transform(response => ({
  pagination: {
    page: response.pagination.page,
    pages: response.pagination.pages,
    per_page: response.pagination.per_page,
    items: response.pagination.items,
  },
  releases: response.releases,
}));

export type DiscogResponse = z.infer<typeof DiscogsResponseSchema>;
export type Release = z.infer<typeof ReleaseSchema>;

export function validateDiscogsResponse(data: unknown): DiscogResponse {
  return DiscogsResponseSchema.parse(data);
}
