<script lang="ts">
import {Link} from '@/router';
import Name from './Name.svelte';

const state = $state({
	name: 'tomato',
});
</script>

<h1>Home</h1>

<div>
	<Link path="/page1">Page 1</Link> |
	<Link path="/page2">Page 2</Link> |
	<Link path="/citar-web">Citar web</Link>
</div>

<Name name={state.name} onClick={n => state.name = n} />
