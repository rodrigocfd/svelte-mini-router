<script lang="ts">
import {path} from './index';
import Home from '@/pages/home/Home.svelte';
import Page1 from '@/pages/page1/Page1.svelte';
import Page2 from '@/pages/page2/Page2.svelte';
import CitarWeb from '@/pages/citar-web/CitarWeb.svelte';
import Error404 from './Error404.svelte';
</script>

{#if path === '/'}
	<Home />
{:else if path === '/page1'}
	<Page1 />
{:else if path === '/page2'}
	<Page2 />
{:else if path === '/citar-web'}
	<CitarWeb />
{:else}
	<Error404 />
{/if}
