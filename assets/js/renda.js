async function atualizarRenda(evento)
{
    evento.preventDefault();

    startSpinner();

    const form = document.forms['renda'];
    const id = form.id.value;

    const dados = {
        nome: form.nome.value,
        renda: Number(form.renda.value)
    }

    const conf = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    }

    const url = `https://6adb8eab3b7e90b820900f43.mockapi.io/perfil/${id}`;
    const resposta = await fetch(url, conf);

    stopSpinner();

    if(resposta.ok) {
        window.location.href = 'index.html';
    }
}

async function preencherFormulario() {
    const id_perfil = localStorage.getItem('id_perfil');

    startSpinner();

    const conf = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    const url = `https://6adb8eab3b7e90b820900f43.mockapi.io/perfil/${id_perfil}`;

    const resposta = await fetch(url, conf);
    const perfil = await resposta.json();

    stopSpinner();

    const form = document.forms['renda'];

    form.id.value = perfil.id;
    form.nome.value = perfil.nome;
    form.renda.value = perfil.renda;
    
}

preencherFormulario();
