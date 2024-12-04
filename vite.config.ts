import {resolve} from 'path';
import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	base: '/wikipedia-templates',
	resolve: {
		alias: [{
			find: '@',
			replacement: resolve(__dirname, 'src'),
		}],
	},
	server: {
		port: 8080,
	},
	build: {
		outDir: 'build',
	},
});
