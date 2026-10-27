async function criarPerfil(evento) {
    evento.preventDefault();

    startSpinner();
    
    const form = evento.target;

    const perfil = {
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value,
        renda: Number(form.renda.value)
    }

    const conf = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfil)
    }

    const resposta = await fetch('https://6adb8eab3b7e90b820900f43.mockapi.io/perfil', conf);
    
    if(resposta.ok) {

        stopSpinner();

        window.location.href = 'login.html';
        return;
    }

    alert('ERRO: perfil não criado');
    
}