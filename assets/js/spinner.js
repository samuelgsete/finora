const div = document.createElement('div');

div.innerHTML = `
    <div class="hide-spinner" id="spinner-box">
        <img class="spinner-img" src="assets/img/spinner.png" alt="Um momento...">
    </div>
`;

const body = document.querySelector('body');
body.appendChild(div);

const startSpinner = () => {
    const spinner = document.querySelector('#spinner-box');
    spinner.classList.remove('hide-spinner');
}

const stopSpinner = () => {
    const spinner = document.querySelector('#spinner-box');
    spinner.classList.add('hide-spinner');
}