# Contributing

## Project structure

This is an NPM workspaces monorepo, managed with [Lerna](https://lerna.js.org/).

## Get started

Install dependencies at the project root:

```bash
npm install
```

In this repo, `syw-common` is always used from its TypeScript source, by the dev servers, the docs and type-checking. Changes to `common` show up right away, with no build step. This works through a `syw-common-source` export condition that this repo opts into (`customConditions` in each `tsconfig.json`, `resolve.conditions` in each Vite config). Apps that install the packages from npm don't use it, so they get the compiled `dist`.

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

### 2. Install and rebuild

```bash
npm install
npm run build
```

`build` also refreshes the bundled trust lists from their sources, so check `git status` for updated files under `packages/common/trustlists/`.

### 3. Commit and tag the release

Describe the work in the commit message, and let the tag mark the version:

```bash
git add -A && git commit
git tag v<newversion>
git push && git push --tags
```

### 4. Publish

> [!IMPORTANT]
> `common` must go first; `react` and `svelte` will fail if the updated `common` isn't in the registry yet

```bash
npm login
npm run common:release
npm run react:release
npm run svelte:release
```