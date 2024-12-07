<script lang="ts">
	import {path} from './index';
	import routes from './routes';
	import Error404 from './Error404.svelte';

	const CurElem = routes.find(r => r.path === path)?.render;
</script>

{#if CurElem === undefined}
	<Error404 />
{:else}
	<CurElem />
{/if}
