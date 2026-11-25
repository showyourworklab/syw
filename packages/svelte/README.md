# Show Your Work — Svelte (`syw-svelte`)

A Svelte 5 component that reads C2PA Content Credentials from an image or video and displays its provenance, created by [Show Your Work Lab](https://showyourworklab.org).

## Install

```bash
npm install syw-svelte
```

Requires Svelte 5.

## Usage

```svelte
<script>
	import SywSvelte from 'syw-svelte'
</script>

<SywSvelte
	src="https://example.com/image.jpg"
	alt="Alt text"
	caption="Caption"
	byline="Photographer"
/>
```

Styles and the Work Sans font are included automatically, with no CSS import needed.

To read the provenance data without rendering the UI, use `parseSywData`:

```js
import { parseSywData, disposeSywData } from 'syw-svelte'

const data = await parseSywData('https://example.com/image.jpg')
// { phase, manifests, types, mediaType, reader, error }

disposeSywData(data) // when you're done with it
```

See the [full props, events and `parseSywData` options](https://github.com/showyourworklab/syw#component-props).

## Customizing fonts and colors

The component's styles use CSS variables. Override them on `body`, or on a wrapper element to style only the components inside it:

```css
body {
	/* Font: use your own. Work Sans is then never downloaded */
	--syw-font-primary: 'Your Font', sans-serif;

	/* Main colors (defaults shown) */
	--syw-color-primary: rgb(6, 0, 53);
	--syw-color-secondary: rgb(236, 242, 248);
	--syw-color-tertiary: rgb(139, 142, 145);
	--syw-color-quaternary: rgb(222, 227, 236);
	--syw-color-quinary: rgb(5, 51, 255);
}
```

Set them on `body` or a wrapper, not on `:root`. The defaults are defined on `:root`, so a second `:root` rule only wins if it loads after the component's CSS. A closer ancestor always wins.

Trust statuses have their own colors, each with a `-light` background variant:

- `--syw-color-status-trusted`
- `--syw-color-status-trusted-legacy`
- `--syw-color-status-untrusted`
- `--syw-color-status-invalid`
- `--syw-color-status-unavailable`

`--syw-color-type` is used for manifest type badges and also has a `-light` variant.

## Framework notes

- **SvelteKit and Vite:** no extra config is needed. Works with SSR.
- **Content Security Policy:** the C2PA reader loads its WASM from `cdn.jsdelivr.net` and runs in a `blob:` worker. If your CSP blocks either one, allow them (`connect-src`, `worker-src`) or host the files yourself with `c2paOptions.wasmSrc` and `c2paOptions.workerSrc`. The map, when opened, loads tiles from `tiles.openfreemap.org` unless you set your own `mapOptions.style`. See the [`c2paOptions`](https://github.com/showyourworklab/syw#c2paoptions) and [`mapOptions`](https://github.com/showyourworklab/syw#mapoptions) docs.

## License

MIT
