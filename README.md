# Show Your Work UI

A component to read and display C2PA content credentials and media provenance in your news article or webpage, created by [Show Your Work Lab](https://showyourworklab.org).

This monorepo exposes the same C2PA provenance UI in two framework packages:
- `syw-react` for React applications
- `syw-svelte` for Svelte applications

## How to Use

### Install:

```bash
# React
npm install syw-react
```

```bash
# Svelte
npm install syw-svelte
```

### Usage:

```jsx
// React
import SywReact from 'syw-react'

export default function Example() {
	return (
		<SywReact
			src="https://example.com/image.jpg"
			alt="Maecenas venenatis lacus ut malesuada vehicula."
			caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			byline="Maecenas Ultrices"
			locale="en_US"
			onEvent={handleEvent}
		/>
	)
}
```

```svelte
<!-- Svelte -->
<script>
	import SywSvelte from 'syw-svelte'
</script>

<SywSvelte
	src="https://example.com/image.jpg"
	alt="Maecenas venenatis lacus ut malesuada vehicula."
	caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	byline="Maecenas Ultrices"
	locale="en_US"
	onEvent={handleEvent}
/>
```

### Component props

| Prop | Type | Required | Notes |
|---|---|---|---|
| `src` | `string` | Yes | Media URL to read and render provenance from. |
| `alt` | `string` | No | Alt text for image content. |
| `caption` | `string` | No | Caption text rendered in UI. |
| `byline` | `string` | No | Attribution/byline text. |
| `variant` | `'expand' \| 'modal' \| string` | No | UI mode. `expand` (default) or `modal`. |
| `locale` | `string` | No | Locale key. `en_US` (default), `no_NO`, or `sv_SE`. |
| `c2paOptions` | `{ wasmSrc?: string; settings?: { trust?: { trustAnchors?: string }}}` | No | Passed to C2PA reader setup. |
| `mapOptions` | `Record<string, unknown>` | No | Passed to map UI setup in the internal app component. |
| `onEvent` | `(type, event, ...args) => void` | No | Event callback for interaction events. |

#### Event names (`onEvent`)

- `image.hover`
- `image.unhover`
- `provenance.open`
- `provenance.close`
- `explainer.open`
- `explainer.close`
- `manifest.open`
- `manifest.close`

### `parseSywData(src, options)`

Available as a named export from `syw-react` and `syw-svelte` to read and parse a C2PA image into the object format used internally in the Show Your Work UI.

- Input:
	- `src: string`
	- `options?: { locale?: string; c2paOptions?: { wasmSrc?: string; settings?: { trust?: { trustAnchors?: string | string[] }}}}`
- Returns:
	- `Promise<{ src; phase; trust; manifests; types; provenance; reader; error }>`


## Shared internal utilities `syw-common`

`syw-common` is a shared package used internally across the `react` and `svelte` packages. It's not meant to be imported directly — treat it as an implementation detail of `syw-react`/`syw-svelte`, not a supported API.

- `constants`: defaults and i18n dictionaries
- `helpers`: C2PA parsing, i18n getters and formatters
- `trustlists`: trust anchor bundles consumed by C2PA verification
- `css`: shared styles used by both frameworks
- `images`: shared static assets

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for local dev setup and the release process.