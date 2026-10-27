const nome = localStorage.getItem('usuario');
const renda = localStorage.getItem('renda');

if(nome == undefined && renda == undefined) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('renda');
    localStorage.removeItem('id_perfil');

    window.location.href = 'login.html';
}