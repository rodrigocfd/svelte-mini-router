<!--
	@component Renders the current route component.
-->
<script lang="ts">
import type {LazyComponent, RouterConf} from './types';
import routerState from './state.svelte';

const props: {
	/**
	 * Router configuration.
	 */
	routerConf: RouterConf;
} = $props();

routerState.init(props.routerConf);
</script>

{#if routerState.curComponent === undefined}
	{#if props.routerConf.render404 !== undefined}
		{@render asyncComponent(props.routerConf.render404)}
	{:else}
		404 - Not found
	{/if}
{:else}
	{@render asyncComponent(routerState.curComponent)}
{/if}

{#snippet asyncComponent(lazyComp: LazyComponent)}
	{#await lazyComp()}
		{props.routerConf.loadingText || 'Loading...'}
	{:then {default: UserComp}}
		<UserComp />
	{/await}
{/snippet}
