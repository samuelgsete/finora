async function salvar(evento) {
    evento.preventDefault();

    startSpinner();

    const form = evento.target;

    const lancamento = {
        tipo: form.tipo.value,
        descricao: form.descricao.value,
        valor: Number(form.valor.value),
        data: form.data.value,
        categoria: form.categoria.value,
        observacoes: form.observacoes.value,
        id_perfil: localStorage.getItem('id_perfil')
    }

    const conf = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lancamento)
    }
    
    const url = 'https://6adb8eab3b7e90b820900f43.mockapi.io/lancamentos';

    const resposta = await fetch(url, conf);

    stopSpinner();
    
    if(resposta.ok) {
        window.location.href = 'index.html';
        return;
    }

    alert('ERRO: lançamento não cadastrado');
}