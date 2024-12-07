export const state = $state({
	url: '',
	titulo: '',
	publicado: '',
	autorNome: '',
	autorSobrenome: '',
	data: '',
	acessoData: '',
});

export const saida = $derived.by(() => {
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
