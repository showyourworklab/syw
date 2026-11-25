# Show Your Work — React (`syw-react`)

A React component that reads C2PA Content Credentials from an image or video and displays its provenance, created by [Show Your Work Lab](https://showyourworklab.org).

## Install

```bash
npm install syw-react
```

Requires React 18 or 19.

## Usage

```jsx
import SywReact from 'syw-react'
import 'syw-react/styles.css'

export default function Example() {
	return (
		<SywReact
			src="https://example.com/image.jpg"
			alt="Alt text"
			caption="Caption"
			byline="Photographer"
		/>
	)
}
```

Import `syw-react/styles.css` once, anywhere in your app. The Work Sans font loads automatically.

To read the provenance data without rendering the UI, use `parseSywData`:

```js
import { parseSywData, disposeSywData } from 'syw-react'

const data = await parseSywData('https://example.com/image.jpg')
// { phase, manifests, types, mediaType, reader, error }

disposeSywData(data) // when you're done with it
```

See the [full props, events and `parseSywData` options](https://github.com/showyourworklab/syw#component-props).

## Customizing fonts and colors

The component's styles use CSS variables. Override them on `body`, or on a wrapper element to style only the components inside it:

```css
body {
	--syw-font-primary: 'Your Font', sans-serif;
	--syw-color-primary: rgb(6, 0, 53);
	--syw-color-secondary: rgb(236, 242, 248);
	--syw-color-tertiary: rgb(139, 142, 145);
	--syw-color-quaternary: rgb(222, 227, 236);
	--syw-color-quinary: rgb(5, 51, 255);
}
```

## Framework notes

- **Next.js (App Router):** the package is marked `'use client'`, so you can render `<SywReact>` directly from a Server Component.
- **Vite, Next.js and other bundlers:** no extra config is needed.
- **Content Security Policy:** the C2PA reader loads its WASM from `cdn.jsdelivr.net` and runs in a `blob:` worker. If your CSP blocks either one, allow them (`connect-src`, `worker-src`) or host the files yourself with `c2paOptions.wasmSrc` and `c2paOptions.workerSrc`. The map, when opened, loads tiles from `tiles.openfreemap.org` unless you set your own `mapOptions.style`. See the [`c2paOptions`](https://github.com/showyourworklab/syw#c2paoptions) and [`mapOptions`](https://github.com/showyourworklab/syw#mapoptions) docs.

## License

MIT
