<!--
	@component Renders the current route component.
-->
<script lang="ts">
import type {LazyComponent, RouterConf} from './types';
import {findCurrentRoute, initInternalState} from './state.svelte';

const props: {
	/**
	 * Router configuration.
	 */
	routerConf: RouterConf;
} = $props();

initInternalState(props.routerConf.baseUrl);
const currentRoute = $derived(findCurrentRoute(props.routerConf.routes));
</script>

{#snippet asyncComponent(lazyComp: LazyComponent)}
	{#await lazyComp()}
		{props.routerConf.loadingText || 'Loading...'}
	{:then {default: UserComp}}
		<UserComp />
	{/await}
{/snippet}

{#if currentRoute === undefined}
	{#if props.routerConf.render404 !== undefined}
		{@render asyncComponent(props.routerConf.render404)}
	{:else}
		404 - Not found
	{/if}
{:else}
	{@render asyncComponent(currentRoute.render)}
{/if}
