<script lang="ts">
	const state = $state({
		url: '',
		titulo: '',
		publicado: '',
		autorNome: '',
		autorSobrenome: '',
		data: '',
		acessoData: '',
	});

	const saida = $derived.by(() => {
		let t = '<ref>{{citar web';
		if (state.url) t += ' |url=' + state.url;
		if (state.titulo) t += ' |titulo=' + state.titulo;
		if (state.publicado) t += ' |publicado=' + state.publicado;
		if (state.autorNome) t += ' |primeiro=' + state.autorNome;
		if (state.autorSobrenome) t += ' |ultimo=' + state.autorSobrenome;
		if (state.data) t += ' |data=' + state.data;
		if (state.acessoData) t += ' |acessoData=' + state.acessoData;
		t += '}}</ref>';
		return t;
	});

	let txtUrl: HTMLInputElement;
	$effect(() => {
		txtUrl.focus();
	});
</script>

<div class="campos">
	<div>URL</div>
	<div><input type="text" class="campo500" bind:value={state.url} bind:this={txtUrl} /></div>
	<div>Título</div>
	<div><input type="text" class="campo500" bind:value={state.titulo} /></div>
	<div>Publicado</div>
	<div><input type="text" class="campo500" bind:value={state.publicado} /></div>
	<div>Autor</div>
	<div>
		<input type="text" class="campo200" bind:value={state.autorNome} />
		<input type="text" class="campo200" bind:value={state.autorSobrenome} />
	</div>
	<div>Data</div>
	<div><input type="text" class="campo200" bind:value={state.data} /></div>
	<div>Acesso data</div>
	<div><input type="text" class="campo200" bind:value={state.acessoData} /></div>
</div>

<div>
	<textarea class="saida" value={saida} onclick={e => e.currentTarget.select()} readonly></textarea>
</div>

<style>
	.campos {
		display: inline-grid;
		grid-template-columns: auto auto;
		gap: 10px;
		& > div > input {
			font-family: monospace;
			font-size: 11pt;
		}
		.campo500 {
			width: 500px;
		}
		.campo200 {
			width: 200px;
		}
	}
	.saida {
		font-size: 11pt;
		width: 90vw;
		height: 80px;
		border: 1px solid #ccc;
		margin-top: 20px;
		padding: 4px;
	}
</style>
