<script lang="ts">
	import {path} from './index';
	import routes from './routes';

	const curComp = routes.find(r => r.path === path)?.render;
</script>

{#if curComp === undefined}
	{#await import('./Error404.svelte') then {default: Error404}}
		<Error404 />
	{/await}
{:else}
	{#await import('../pages/' + curComp) then {default: CurComp}}
		<CurComp />
	{/await}
{/if}
