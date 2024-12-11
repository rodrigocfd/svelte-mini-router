<!--
	@component Generates an anchor element which will redirect to a route path.
-->
<script lang="ts">
import type {Snippet} from 'svelte';
import type {GetParameters} from './types';
import {generateFullUrl, navigate} from './state.svelte';

const props: {
	/**
	 * Route path to redirect when the anchor is clicked.
	 */
	path: string;
	/**
	 * Object with GET parameters; optional.
	 */
	params?: GetParameters;
	children: Snippet;
} = $props();

function clicked(ev: MouseEvent & {currentTarget: EventTarget & HTMLAnchorElement}): void {
	ev.preventDefault();
	navigate(props.path, props.params);
}
</script>

<a href={generateFullUrl(props.path, props.params)} onclick={clicked}>
	{@render props.children()}
</a>
