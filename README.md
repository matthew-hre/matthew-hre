# matthew-hre.com

The source code for [matthew-hre.com](https://www.matthew-hre.com), a small personal site centered around a Discogs-powered record shelf.

## Stack

- [Next.js](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for record shelf interactions
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
├── app/         # homepage and global styles
├── components/  # profile, record shelf, and shared UI
├── lib/         # shared utilities
└── types/       # Discogs API types and client
```

## Contact

If something's broken, or you just want to say hi:
**me _at_ matthew-hre _dot_ com**
