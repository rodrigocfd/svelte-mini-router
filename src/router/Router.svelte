<script lang="ts">
import {path} from './index';
import Home from '@/components/Home.svelte';
import Page1 from '@/components/Page1.svelte';
import Page2 from '@/components/Page2.svelte';
</script>

{#if path === ''}
	<Home />
{:else if path === 'page1'}
	<Page1 />
{:else if path === 'page2'}
	<Page2 />
{:else}
	<h1>404</h1>
{/if}
