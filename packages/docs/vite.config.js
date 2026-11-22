import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { resolve } from 'path';

// In dev, load syw-svelte from source instead of its packaged dist
const sywSvelteSource = () => {
	const svelteRoot = resolve(__dirname, '../svelte')
	const svelteLib = resolve(svelteRoot, 'src/lib')
	const docsLib = resolve(__dirname, 'src/lib')
	return {
		name: 'syw-svelte-source',
		apply: 'serve',
		enforce: 'pre',
		resolveId(id, importer) {
			if(id === 'syw-svelte') {
				return this.resolve(resolve(svelteLib, 'index.ts'), importer, { skipSelf: true })
			}
			// syw-svelte's $lib, not the docs' own, which SvelteKit may have already aliased it to
			if(!importer?.startsWith(svelteRoot)) return
			const libPath = id.startsWith('$lib/') ? id.slice(5)
				: id.startsWith(docsLib + '/') ? id.slice(docsLib.length + 1)
				: null
			if(libPath) return this.resolve(resolve(svelteLib, libPath), importer, { skipSelf: true })
		}
	}
}

export default defineConfig({
	plugins: [
		sywSvelteSource(),
		sveltekit(),
		devtoolsJson()
	],
	ssr: {
		noExternal: ['@ark-ui/svelte']
	},
	resolve: {
		dedupe: ['svelte', '@ark-ui/svelte'],
	},
	css: {
		modules: {
			localsConvention: 'dashes',
			generateScopedName: 'Syw-[local]',
		},
	},
	server: {
		port: 3000
	}
});
