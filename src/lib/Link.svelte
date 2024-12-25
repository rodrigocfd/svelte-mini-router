<!--
	@component Generates an anchor element which will redirect to a route path.
-->
<script lang="ts">
	import type {Snippet} from 'svelte';
	import routerState from './state.svelte';
	import type {QueryParams} from './types';

	const props: {
		/**
	 * Route path to redirect when the anchor is clicked.
	 */
		path: string;
		/**
	 * URL query parameters; optional.
	 */
		params?: QueryParams;
		children: Snippet;
	} = $props();

	function clicked(ev: MouseEvent & {currentTarget: EventTarget & HTMLAnchorElement}): void {
		ev.preventDefault();
		routerState.navigate(props.path, props.params);
	}
</script>

<a href={routerState.generateFullUrl(props.path, props.params)} onclick={clicked}>
	{@render props.children()}
</a>
