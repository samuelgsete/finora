
async function entrar(evento) {
    evento.preventDefault();

    startSpinner();

    const form = evento.target;

    const email = form.email.value;
    const senha =  form.senha.value;
    const conectado = form.conectado.checked;

    conectado ? localStorage.setItem('email', email) : localStorage.removeItem('email')

    const conf = { method: 'GET' }

    const url = `https://6adb8eab3b7e90b820900f43.mockapi.io/perfil?email=${email}&senha=${senha}`;
    const resposta = await fetch(url, conf);
    
    if(resposta.ok) {
        const dados = await resposta.json();

        const perfil = dados[0];

        localStorage.setItem('id_perfil', perfil.id)

        window.location.href = 'index.html';
        return;
    }
    
    const loginFail = document.querySelector('#login-fail');
    loginFail.classList.remove('hide-alert');

    stopSpinner();
}

const form = document.forms['login'];

form.conectado.checked = localStorage.getItem('email') != undefined;
form.email.value = localStorage.getItem('email') || '';