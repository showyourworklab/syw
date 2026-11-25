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
import 'syw-react/styles.css'

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
| `src` | `string` | Yes | URL of the image or video to read provenance from and display. |
| `alt` | `string` | No | Alt text for the image. |
| `caption` | `string` | No | Caption text shown under the media. |
| `byline` | `string` | No | Attribution or byline text. |
| `mediaType` | `'image' \| 'video'` | No | Whether `src` is an image or a video. Detected from the file extension, the file's type and its C2PA data when not set. |
| `variant` | `string` | No | How the provenance panel opens: `expand` (default), `modal`, `popover`, `drawer-bottom`, `drawer-left` or `drawer-right`. |
| `locale` | `string` | No | Interface language: `en_US` (default) or `no_NO`. |
| `imageAttrs` | `object` | No | Attributes for the `<img>` element, such as `width`, `height` and `loading`. See [`imageAttrs`](#imageattrs). |
| `c2paOptions` | `object` | No | Options for reading Content Credentials. See [`c2paOptions`](#c2paoptions). |
| `mapOptions` | `object` | No | Options for the location map. See [`mapOptions`](#mapoptions). |
| `onEvent` | `(type, event, ...args) => void` | No | Called on interaction and data events. See [event names](#event-names-onevent). |

#### `imageAttrs`

Any attributes for the main `<img>` element. In React use the React names (`srcSet`, `fetchPriority`, `className`).

| Attribute | Default | Notes |
|---|---|---|
| `width` / `height` | none | Intrinsic image size. Set both to reserve space before the image loads. |
| `loading` | `'lazy'` | Use `'eager'` for an image at the top of the page. |
| `decoding` | `'async'` | |
| `srcset` / `sizes` | none | Responsive image sources. |
| `fetchpriority` | none | `'high'` for the page's main image. |
| `class` | none | Added alongside the component's own class rather than replacing it. |

`src` and `alt` always come from their own props, so they're ignored inside `imageAttrs`.

```jsx
<SywReact
	src="https://example.com/image-1200.jpg"
	alt="Alt text"
	imageAttrs={{
		width: 1200,
		height: 800,
		loading: 'eager',
		srcSet: 'https://example.com/image-800.jpg 800w, https://example.com/image-1200.jpg 1200w',
		sizes: '(max-width: 800px) 100vw, 800px',
		fetchPriority: 'high',
	}}
/>
```

#### `c2paOptions`

Passed to [`@contentauth/c2pa-web`](https://github.com/contentauth/c2pa-js), which reads and validates the Content Credentials.

| Option | Type | Default | Notes |
|---|---|---|---|
| `c2paOptions.wasmSrc` | `string` | jsDelivr URL for the installed c2pa-web version | URL of c2pa-web's WASM file. Set it to host the file yourself, for example when your Content Security Policy blocks `cdn.jsdelivr.net`. Must be the same c2pa-web version (`@contentauth/c2pa-web/resources/c2pa.wasm`). |
| `c2paOptions.workerSrc` | `URL` | Inline `blob:` worker | URL of c2pa-web's worker script. Set it when your Content Security Policy blocks `blob:` workers. Host the file exported as `@contentauth/c2pa-web/c2pa_worker`. |
| `c2paOptions.settings.trust` | `object` | Bundled C2PA trust lists | Trust lists used to decide whether a signer is trusted. See the trust list fields below. |
| `c2paOptions.settings.cawgTrust` | `object` | Bundled CAWG trust lists | The same fields, used for CAWG identity assertions. |
| `c2paOptions.settings.verify` | `object` | c2pa-web defaults | Validation settings such as `verifyTrust` and `ocspFetch`. See c2pa-web's `VerifySettings`. |

Trust list fields for `settings.trust` and `settings.cawgTrust`. Each accepts the text of a file, a URL to fetch it from, or an array of URLs that are fetched and joined. A field you set replaces the bundled list of that type, and the other types keep their bundled lists.

| Field | Contents |
|---|---|
| `trustAnchors` | CA certificates (PEM). Signers that chain to these are reported as trusted by a "System" anchor. |
| `userAnchors` | CA certificates (PEM). Signers that chain to these are reported as trusted by a "User" anchor. |
| `allowedList` | End-entity (signer) certificates that are trusted directly. |
| `trustConfig` | Trust store configuration (`.cfg`), such as allowed certificate uses. |

```jsx
<SywReact
	src="https://example.com/image.jpg"
	c2paOptions={{
		wasmSrc: '/static/c2pa_bg.wasm',
		settings: {
			trust: { userAnchors: 'https://example.com/my-anchors.pem' },
		},
	}}
/>
```

#### `mapOptions`

When a manifest has a location, opening it shows a [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) map. MapLibre and the map tiles are only loaded when someone opens the map.

`mapOptions` accepts any [MapLibre `MapOptions`](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/) and is applied over these defaults:

| Option | Default | Notes |
|---|---|---|
| `style` | `'https://tiles.openfreemap.org/styles/bright'` | Map style URL or object. Set it to use your own tiles or tile provider. |
| `zoom` | `10` | Initial zoom level. |

`center` and `container` can't be overridden. The map is always centered on the manifest's location, and the component creates its own container element.

```jsx
<SywReact
	src="https://example.com/image.jpg"
	mapOptions={{
		style: 'https://tiles.openfreemap.org/styles/positron',
		zoom: 12,
	}}
/>
```

#### Event names (`onEvent`)

`onEvent` is called as `onEvent(type, event, data)`. Open and close events only fire when the state actually changes.

| `type` | When | `event` | `data` |
|---|---|---|---|
| `provenance.open` | The provenance panel opens | DOM event | `undefined` |
| `provenance.close` | The provenance panel closes | DOM event | `undefined` |
| `explainer.open` | The "What is this?" explainer opens | DOM event | `undefined` |
| `explainer.close` | The explainer closes, including when the panel closes while it's open | DOM event | `undefined` |
| `manifest.open` | A manifest's details open | DOM event | The manifest |
| `manifest.close` | A manifest's details close | DOM event | The manifest |
| `c2pa.load` | Reading the media's C2PA data starts | `null` | The media data |
| `c2pa.ready` | Reading finished and found Content Credentials | `null` | The media data |
| `c2pa.empty` | Reading finished with no Content Credentials | `null` | The media data |
| `c2pa.error` | Fetching the media or reading its C2PA data failed | `null` | The media data |

- **`event`** is the browser event that caused the change: a `click` on a button, a `keydown` for Escape, or a `pointerdown` for a click outside the panel or a drawer swipe.
- **`c2pa.*` events** report the result of reading the media's C2PA data (Content Credentials), not the `<img>` loading. Use them for analytics, or to hide the component or show your own UI when there are none.
- **The media data** is what [`parseSywData`](#parsesywdatasrc-options) returns, plus the component's `src`, `alt`, `caption` and `byline`.

### `parseSywData(src, options)`

A named export from `syw-react` and `syw-svelte` that reads a media file's Content Credentials into the same data the component uses, without rendering anything. It shares the component's C2PA reader, so using both on one page doesn't load the WASM twice.

```js
import { parseSywData, disposeSywData } from 'syw-react' // or 'syw-svelte'

const data = await parseSywData('https://example.com/image.jpg', {
	c2paOptions: { /* same as the c2paOptions prop */ },
	mediaType: 'image', // optional, detected when not set
})

if(data.phase === 'ready' && data.manifests.length) {
	// ...
}

disposeSywData(data) // when you're done with it
```

| Option | Type | Notes |
|---|---|---|
| `c2paOptions` | `object` | Same as the [`c2paOptions`](#c2paoptions) prop. |
| `mediaType` | `'image' \| 'video'` | Same as the `mediaType` prop. |

It returns a promise of:

| Field | Type | Notes |
|---|---|---|
| `phase` | `'idle' \| 'ready' \| 'error'` | `ready` when the read finished, `error` when fetching or reading failed. `idle` when `src` is empty or there's no browser to read in (no Web Workers, e.g. during server rendering). |
| `manifests` | `array` | The Content Credentials manifests, prepared for display. Empty when the media has none. |
| `types` | `array` | The type of each manifest, such as camera capture, edit or AI generated. |
| `mediaType` | `'image' \| 'video'` | The detected or given media type. |
| `reader` | `object \| null` | The c2pa-web reader, for reading anything the prepared data leaves out. |
| `error` | `Error \| null` | Why the read failed, when `phase` is `error`. |

`disposeSywData(data)` frees the reader and the image URLs created for manifest thumbnails. Call it when you no longer need the data.


## Shared internal utilities `syw-common`

`syw-common` is a shared package used internally across the `react` and `svelte` packages.

- `constants`: defaults and i18n dictionaries
- `helpers`: C2PA parsing, i18n getters and formatters
- `trustlists`: trust anchor bundles consumed by C2PA verification
- `css`: shared styles used by both frameworks
- `images`: shared static assets

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for local dev setup and the release process.