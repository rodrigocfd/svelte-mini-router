<script lang="ts">
const props: {
	name: string;
	onClick(name: string): void;
} = $props();

const state = $state({
	txt: '',
});

let txtStuff: HTMLInputElement;

$effect(() => {
	txtStuff.focus();
});

function envia(ev: SubmitEvent): void {
	ev.preventDefault();
	props.onClick(state.txt);
}
</script>

<div>
	<div class="name">Name: {props.name}</div>
	<form onsubmit={envia}>
		<input type="text" size="20" bind:this={txtStuff} bind:value={state.txt} />
		<button type="submit">Change '{props.name}'</button>
	</form>
</div>

<style>
	.name {
		color: tomato;
	}
</style>
