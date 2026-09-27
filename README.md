# matthew-hre.com

The source code for [matthew-hre.com](https://www.matthew-hre.com), a small personal site centered around a Discogs-powered record shelf.

The source lives on [GitHub](https://github.com/matthew-hre/matthew-hre). The live site is deployed separately as a Cloudflare Worker via OpenNext; this Next.js app is not a static GitHub Pages site. Deployment requires access to the Cloudflare account and the `api-matthew-hre` service binding configured in `wrangler.jsonc`.

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

## Automatic deployment

Every push to `main` runs the tests, builds the Next.js app with OpenNext, and deploys the `matthew-hre` Worker using the existing `bun run deploy` command. The workflow is in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml); it does not use GitHub Pages. Deployments are serialized, and a failed build or test does not deploy.

Before enabling it, add these **Actions repository secrets** under GitHub **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_ACCOUNT_ID`: the account ID for the Cloudflare account hosting the existing Worker.
- `CLOUDFLARE_API_TOKEN`: an API token scoped to that account and the `matthew-hre.com` zone, using Cloudflare's **Edit Cloudflare Workers** template. Keep it out of the repository.

The `api-matthew-hre` Worker referenced by the `API` service binding must already exist in that account. The first push containing this workflow will attempt a deployment; without both secrets, it fails before uploading anything. If Cloudflare Workers Builds is also connected to this repository, disable its automatic builds to avoid two independent deployers racing. Check the **Deploy website** run in the GitHub Actions tab and the live site after the first successful deployment.

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
