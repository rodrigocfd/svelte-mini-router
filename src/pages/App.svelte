<script lang="ts">
	import {AppRouter} from '@/router';

	const baseUrl = '/wikipedia-templates';

	const routes = [
		{path: '/',          render: () => import('./home/+page.svelte')},
		{path: '/citar-web', render: () => import('./citar-web/+page.svelte')},
		{path: '/page1',     render: () => import('./page1/+page.svelte')},
		{path: '/page2',     render: () => import('./page2/+page.svelte')},
	];
</script>

<h1>Wikipedia Templates</h1>

<AppRouter {baseUrl} {routes} />

<style>
	h1 {
		color: cornflowerblue;
	}
</style>
