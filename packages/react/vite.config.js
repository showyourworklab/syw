import { resolve } from 'path'
import { readFileSync } from 'fs'
import { defineConfig, defaultClientConditions } from 'vite'
import react from '@vitejs/plugin-react'

// Leave every dependency (and its subpaths, e.g. react/jsx-runtime) for the
// consumer's bundler to resolve and dedupe. CSS imports are the exception: they're
// bundled into dist/styles.css so consumers only import 'syw-react/styles.css',
// except maplibre's CSS, which the map loads on demand together with maplibre itself.
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8'))
const externalDeps = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })
const isExternal = (id) =>
	id === 'maplibre-gl/dist/maplibre-gl.css' ||
	(!id.endsWith('.css') && externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`)))

// The fonts are imported from App.tsx so they load in dev, but a CSS import in the published
// JS breaks anything that loads it with plain Node (server rendering). For the library build,
// drop that import from the JS and add it as the first line of dist/styles.css instead, unbundled,
// so the consumer's bundler emits the font files and the browser only fetches the subsets it needs.
const FONTS_CSS = 'syw-common/css/fonts.css'
const fontsInStylesheet = () => [
	{
		name: 'syw-fonts-out-of-js',
		apply: 'build',
		enforce: 'pre',
		// Matched after the syw-common alias has turned it into a path
		resolveId: (id) => (id === FONTS_CSS || id.endsWith('/common/css/fonts.css')) ? '\0syw-fonts' : null,
		load: (id) => id === '\0syw-fonts' ? '' : null,
	},
	{
		name: 'syw-fonts-into-stylesheet',
		apply: 'build',
		// After Vite has emitted dist/styles.css
		enforce: 'post',
		generateBundle(_options, bundle) {
			for(const file of Object.values(bundle)) {
				if(file.type === 'asset' && file.fileName === 'styles.css') {
					file.source = `@import "${FONTS_CSS}";\n${file.source}`
				}
			}
		},
	},
]

export default defineConfig({
	publicDir: 'public',
	resolve: {
		// syw-common-source: resolve syw-common (and its internal #imports) to its TypeScript source, so dev never needs common built
		conditions: ['syw-common-source', ...defaultClientConditions],
		alias: {
			'$src': resolve(__dirname, 'src'),
			'syw-common': resolve(__dirname, '../common')
		},
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
			fileName: () => 'index.js',
			cssFileName: 'style'
		},
		rollupOptions: {
			external: isExternal,
			output: {
				// Next.js App Router: the components use hooks/context, so mark the
				// entry as a client module and it can be imported from Server Components
				banner: "'use client';",
				// styles.css at the root; bundled fonts and other assets under assets/
				assetFileNames: (asset) =>
					asset.names?.some((n) => n.endsWith('.css')) ? 'styles.css' : 'assets/[name][extname]',
			},
		},
		cssCodeSplit: false
	},
	esbuild: {
		loader: 'tsx',
		include: /(src\/.*\.jsx?$)|(\.tsx?$)/,
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
	css: {
		modules: {
			localsConvention: 'dashes', // dashes camelCase
			generateScopedName: 'Syw-[local]',
		},
	},
	plugins: [
		fontsInStylesheet(),
		react({
			// Disabling this since to stop re-registration custom element error when
			// hot-reloading web components
			// fastRefresh: false,
		}),
	],
	server: {
		port: 3000,
		// fs: {
		// 	allow: ['../..'] // or the specific path to your packages dir
		// }
	}
})