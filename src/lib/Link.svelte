<!--
	@component Generates an anchor element which will redirect to a route path.
-->
<script lang="ts">
import type {Snippet} from 'svelte';
import {generateFullUrl, navigate} from './state.svelte';

const props: {
	/** Route path to redirect when the anchor is clicked. */
	path: string;
	children: Snippet;
} = $props();

function clicked(ev: MouseEvent & {currentTarget: EventTarget & HTMLAnchorElement}): void {
	ev.preventDefault();
	navigate(props.path);
}
</script>

<a href={generateFullUrl(props.path)} onclick={clicked}>
	{@render props.children()}
</a>
