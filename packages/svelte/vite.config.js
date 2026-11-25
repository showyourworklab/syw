import { resolve } from 'path';
import { defineConfig, defaultClientConditions, defaultServerConditions } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	build: {
		outDir: 'dist',
        // emptyOutDir: true,
		lib: {
			name: 'SywSvelte',
			entry: resolve(__dirname, 'src/lib/index.ts'),
			// fileName: (format) => `index.${format}.js`,
			fileName: () => `index.js`,
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				'svelte',
				'@contentauth/c2pa-web'
			],
			output: {
                assetFileNames: 'styles.[ext]',
            },
		},
		cssCodeSplit: false
	},
	resolve: {
		// syw-common-source: resolve syw-common (and its internal #imports) to its TypeScript source, so dev never needs common built
		conditions: ['syw-common-source', ...defaultClientConditions],
		alias: {
			$src: resolve(__dirname, '/src'),
			$lib: resolve(__dirname, '/src/lib'),
			'syw-common': resolve(__dirname, '../common'),
		},
	},
	plugins: [
		svelte({
			compilerOptions: {
				runes: true,
			},
			emitCss: true,
		}),
		devtoolsJson()
	],
	ssr: {
		resolve: {
			conditions: ['syw-common-source', ...defaultServerConditions],
		},
		noExternal: [
			'@ark-ui/svelte',
			'@lucide/svelte'
		]
	},
	css: {
		modules: {
			localsConvention: 'dashes',
			generateScopedName: 'Syw-[local]',
		},
	}
});
