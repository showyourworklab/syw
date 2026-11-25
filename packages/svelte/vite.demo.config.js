import { resolve } from 'path';
import { defineConfig, defaultClientConditions, defaultServerConditions } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	resolve: {
		conditions: ['syw-common-source', ...defaultClientConditions],
		alias: {
			$src: './src',
			$lib: './src/lib',
			'syw-docs': resolve(__dirname, '../docs'),
			'syw-common': resolve(__dirname, '../common'),
		},
	},
	ssr: {
		resolve: {
			conditions: ['syw-common-source', ...defaultServerConditions],
		},
	},
	optimizeDeps: {
		exclude: ['svelte-maplibre-gl'], 
	},
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: true,
			}
		}),
		devtoolsJson()
	],
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
