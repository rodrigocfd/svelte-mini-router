<script lang="ts">
import * as router from '@/router';
import Name from './Name.svelte';

const state = $state({
	name: 'tomato',
});
</script>

<h1>Home</h1>

<div>
	<a href={router.link('/page1')}>Page 1</a>
	<a href={router.link('/page2')}>Page 2</a>
	<a href={router.link('/citar-web')}>Citar Web</a>
</div>

<Name name={state.name} onClick={n => state.name = n} />
