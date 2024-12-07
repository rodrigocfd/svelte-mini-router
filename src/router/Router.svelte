<script lang="ts">
	import {path} from './index';
	import routes from './routes';

	const route = routes.find(r => slashPrefix(r.path) === path);
	let componentPath = '../pages';

	if (route !== undefined) {
		if (route.component !== undefined) {
			componentPath += slashPrefix(route.component); // user defined a component, use it
		} else {
			componentPath += slashPrefix(route.path) + '/'
				+ pathToComponentName(route.path)
				+ '.svelte';
		}
	}

	function slashPrefix(p: string): string {
		return (p.startsWith('/') ? '' : '/') + p;
	}
	function pathToComponentName(p: string): string {
		return (p.startsWith('/') ? p.slice(1) : p)
			.split('-')
			.map(p => p.charAt(0).toUpperCase() + p.slice(1))
			.join('');
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
