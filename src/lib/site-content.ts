export const SITE_URL = "https://matthew-hre.com";

export const PROFILE = {
  name: "Matthew Hrehirchuk",
  handle: "@matthew_hre",
  description: "Software developer and design engineer in Calgary, Alberta.",
  image: "https://avatars.githubusercontent.com/u/49077192?v=4",
  location: "Calgary, AB",
  employer: {
    name: "Purelend",
    url: "https://purelend.ai",
  },
  socialLinks: [
    "https://github.com/matthew-hre",
    "https://tangled.sh/@matthew-hre.com",
    "https://linkedin.com/in/matthew-hre/",
    "https://x.com/matthew_hre",
  ],
} as const;

export const BIOGRAPHY = [
  "I’m a software developer and a design engineer. I love crafting purposeful interfaces and making web interactions fun.",
  "I’m also a record collector, a music nerd, and a terrible guitarist.",
] as const;

const SITE_SUMMARY =
  "This site is a small personal portfolio centered around a Discogs-powered record shelf. Browse the collection to see what I’ve been listening to, or follow the source link to see how the site is built.";

export const HOME_MARKDOWN = `# ${PROFILE.name}

${PROFILE.handle}

${BIOGRAPHY.join("\n\n")}

${SITE_SUMMARY}

## Current role

- Software Engineer at [${PROFILE.employer.name}](${PROFILE.employer.url})
- Based in ${PROFILE.location}, Canada

## Record collection

The homepage includes an interactive shelf of Matthew’s record collection. It is backed by Discogs data and can be sorted by recently added, artist, or album title in the browser.

## Links

- [GitHub](${PROFILE.socialLinks[0]})
- [Tangled](${PROFILE.socialLinks[1]})
- [LinkedIn](${PROFILE.socialLinks[2]})
- [X](${PROFILE.socialLinks[3]})
- [Source repository](https://tangled.org/matthew-hre.com/matthew-hre.com)
- [Agent resource index](${SITE_URL}/llms.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

export const LLMS_TEXT = `# Matthew Hrehirchuk

> The personal site of Matthew Hrehirchuk, a software developer and design engineer in Calgary, Alberta. The site is centered around an interactive, Discogs-powered record collection.

This is a personal portfolio, not a developer platform. It does not offer a supported public integration API, authentication system, webhooks, or MCP server.

## Site content

- [Homepage](${SITE_URL}/index.md): Biography, current role, record collection overview, social profiles, and source code links.

## Optional

- [Source repository](https://tangled.org/matthew-hre.com/matthew-hre.com): Source code and commit history for this website.
- [GitHub profile](${PROFILE.socialLinks[0]}): Matthew’s public GitHub profile and projects.
- [Sitemap](${SITE_URL}/sitemap.xml): Index of public pages on this site.
`;

export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  alternateName: PROFILE.handle,
  description: PROFILE.description,
  url: SITE_URL,
  image: PROFILE.image,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: PROFILE.employer.name,
    url: PROFILE.employer.url,
  },
  homeLocation: {
    "@type": "Place",
    name: "Calgary, Alberta, Canada",
  },
  sameAs: PROFILE.socialLinks,
} as const;

export function notFoundMarkdown(pathname: string) {
  return `# 404: Not found

No page exists at \`${pathname}\`.

## Where to look next

- [Homepage](${SITE_URL}/index.md)
- [Agent resource index](${SITE_URL}/llms.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;
}
