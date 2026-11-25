// import { resolve } from 'path'
import { defineConfig, defaultClientConditions } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	publicDir: 'static',
	base: process.env.NODE_ENV === 'production'
		? '/syw/react/'
		: '',
	resolve: {
		// syw-common-source: resolve syw-common (and its internal #imports) to its TypeScript source, so dev never needs common built
		conditions: ['syw-common-source', ...defaultClientConditions],
		fs: false,
		path: false,
		alias: {
			// '$src': resolve(__dirname, 'src'),
			// '$common': resolve(__dirname, '../common'),
			'$src': `${process.cwd()}/src`,
			'$common': `${process.cwd()}/../common`,
		},
	},
	build: {
		// outDir: resolve(__dirname, '../../public/react'),
		outDir: `${process.cwd()}/../../public/react`,
		// rollupOptions: {
		// 	external: ['react'],
		// }
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
		exclude: ['c2pa', '@contentauth/react-hooks'],
	},
	css: {
		modules: {
			localsConvention: 'dashes', // dashes camelCase
			generateScopedName: 'Syw-[local]',
		},
	},
	plugins: [
		react({
			// Disabling this since to stop re-registration custom element error when
			// hot-reloading web components
			// fastRefresh: false,
		}),
	],
	server: {
		port: 3000,
	}
})