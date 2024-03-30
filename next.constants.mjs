"use strict";

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV || undefined;

export const VERCEL_REVALIDATE = Number(
  process.env.NEXT_PUBLIC_VERCEL_REVALIDATE_TIME || 300
);

export const ENABLE_STATIC_EXPORT =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === true;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "https://www.matthew-hre.com";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const NEXT_DATA_URL = process.env.NEXT_PUBLIC_DATA_URL
  ? process.env.NEXT_PUBLIC_DATA_URL
  : VERCEL_ENV
  ? `${BASE_URL}${BASE_PATH}/next-data/`
  : `http://localhost:3000/next-data/`;

export const MD_EXTENSION_REGEX = /((\/)?(index))?\.mdx?$/i;

export const BLOG_POSTS_PER_PAGE = 4;

export const THEME_STORAGE_KEY = "theme";
