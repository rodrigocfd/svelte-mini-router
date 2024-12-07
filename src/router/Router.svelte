<script lang="ts">
	import {path} from './index';
	import routes from './routes';

	const route = routes.find(r => {
		let p = r.path;
		if (p.endsWith('/')) p = p.substring(0, p.length - 1); // remove trailing "/"
		if (!p.startsWith('/')) p = '/' + p; // always prefix with "/"
		return path === p;
	});
</script>

{#if route === undefined}
	{#await import('./Error404.svelte') then {default: Error404}}
		<Error404 />
	{/await}
{:else}
	{#await route.render() then {default: RouteComponent}}
		<RouteComponent />
	{/await}
{/if}
