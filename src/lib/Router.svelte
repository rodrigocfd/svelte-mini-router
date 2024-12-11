<!--
	@component Renders the current route component.
-->
<script lang="ts">
import {type RouterConf} from './types';
import {findCurrentRoute, initInternalState} from './state.svelte';

const props: {
	/** Router configuration. */
	routerConf: RouterConf;
} = $props();

initInternalState(props.routerConf.baseUrl);
const currentRoute = $derived(findCurrentRoute(props.routerConf.routes));
</script>

{#if currentRoute === undefined}
	{#if props.routerConf.render404 !== undefined}
		{#await props.routerConf.render404()}
			{props.routerConf.loadingText || 'Loading...'}
		{:then {default: Route404Component}}
			<Route404Component />
		{/await}
	{:else}
		404 - Not found
	{/if}
{:else}
	{#await currentRoute.render()}
		{props.routerConf.loadingText || 'Loading...'}
	{:then {default: RouteComponent}}
		<RouteComponent />
	{/await}
{/if}
