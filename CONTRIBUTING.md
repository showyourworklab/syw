# Contributing

## Project structure

This is an NPM workspaces monorepo, managed with [Lerna](https://lerna.js.org/).

## Get started

Install dependencies at the project root:

```bash
npm install
```

This also builds `common` to `packages/common/dist`, which `react`, `svelte` and `docs` use for its types and published imports. The dev servers read `common`'s source directly, but type-checking reads its `dist`. When you change `common`, keep it rebuilt with:

```bash
npm run common:watch
```

Run a package locally:

```bash
npm run react:dev
npm run svelte:dev
```

## Building

```bash
npm run build
```

Builds `common`, `react` and `svelte` (library + demo for each) and `docs`, and populates the root `public/` folder used for the GitHub Pages deploy.

Build output (`dist/`) isn't committed. Each package rebuilds its `dist` automatically before `npm publish` (`prepublishOnly`).

## Releasing

> [!IMPORTANT]
> Every package should be bumped and released in unison.

### 1. Bump the version

```bash
npm run bump <newversion>
```
Bumps `common`, `react`, `svelte`, and `docs` together, and automatically updates `react`/`svelte`'s `syw-common` dependency range (and `docs`'s `syw-svelte` range) to match, no manual editing needed.

### 2. Refresh and rebuild

```bash
npm install
npm run build
```

### 3. Commit and tag the release

```bash
git add -A && git commit -m "Release v<newversion>"
git tag v<newversion>
git push && git push --tags
```

### 4. Publish, in this order

> [!IMPORTANT]
> `common` must go first; `react` and `svelte` will fail if the updated `common` isn't in the registry yet

```bash
npm run common:release
npm run react:release
npm run svelte:release
```