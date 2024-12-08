<script lang="ts">
import type {Snippet} from 'svelte';
import {generateFullUrl, navigate} from './funcs.svelte';

const props: {
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
