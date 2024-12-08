<script lang="ts">
	import {type Route, findCurrentRoute, setBaseUrl} from './funcs.svelte';

	const props: {
		/** Base URL, as defined in vite.config.ts. */
		baseUrl?: string;
		/** Application routes. */
		routes: Route[];
	} = $props();

	setBaseUrl(props.baseUrl);
	const currentRoute = $derived(findCurrentRoute(props.routes));
</script>

{#if currentRoute === undefined}
	{#await import('./Error404.svelte') then {default: Error404}}
		<Error404 />
	{/await}
{:else}
	{#await currentRoute.render() then {default: RouteComponent}}
		<RouteComponent />
	{/await}
{/if}
