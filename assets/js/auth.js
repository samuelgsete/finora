const id_perfil = localStorage.getItem('id_perfil');

if(id_perfil == undefined) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('id_perfil');
    window.location.href = 'login.html';
}