# matthew-hre.com

The source code for [matthew-hre.com](https://www.matthew-hre.com). Home to some writing, a Discogs-powered record shelf, and whatever else I feel like putting out there.

## Stack

- [Next.js](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [MDX](https://mdxjs.com) for posts, with `rehype-pretty-code` for syntax highlighting
- [Nix](https://nixos.org) for a reproducible dev shell

## Getting started

There's a Nix flake if you're into that:

```bash
nix develop
```

Otherwise, just make sure you have Bun ≥ 1.3 and Node ≥ 22, then:

```bash
bun install
bun dev
```

## Scripts

| Command     | What it does             |
| ----------- | ------------------------ |
| `bun dev`   | Start the dev server     |
| `bun build` | Build for production     |
| `bun start` | Run the production build |
| `bun lint`  | Lint with ESLint         |

## Structure

```
src/
├── app/         # routes (writing, discogs, api, ...)
├── components/  # UI bits and pieces
├── content/     # MDX posts
├── hooks/
├── lib/
└── types/
```

## Contact

If something's broken, or you just want to say hi:
**me _at_ matthew-hre _dot_ com**
