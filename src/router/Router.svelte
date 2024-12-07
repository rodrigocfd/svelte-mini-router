<script lang="ts">
	import {path} from './index';
	import routes from './routes';

	const route = routes.find(r => slashPrefix(r.path) === path);
	let componentPath = '../pages';

	if (route !== undefined) {
		const effectivePath = (route.redirect === undefined) ? route.path : route.redirect;
		componentPath += slashPrefix(effectivePath) + '/+page.svelte';
	}

	function slashPrefix(p: string): string {
		const p2 = p.endsWith('/') ? p.substring(0, p.length - 1) : p;
		return (p2.startsWith('/') ? '' : '/') + p2;
	}
</script>

{#if route === undefined}
	{#await import('./Error404.svelte') then {default: Error404}}
		<Error404 />
	{/await}
{:else}
	{#await import(/* @vite-ignore */ componentPath) then {default: CurComp}}
		<CurComp />
	{/await}
{/if}
