// Botões de filtros

const buttons = document.querySelectorAll('.btn-filter');
const arrayBtn = Array.from(buttons);

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const activeButton = arrayBtn.find(button => {
            return button.classList.contains('filter-active');
        });

        activeButton.classList.remove('filter-active');

        button.classList.add('filter-active');

    });
});

// Campos de formulário

const inputs = document.querySelectorAll(
    'div.field > input, div.field > select, div.field > textarea'
);
const arrayInputs = Array.from(inputs);

arrayInputs.forEach(input => {
    input.addEventListener('focus', () => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        label.classList.add('focus')
    });

     input.addEventListener('blur', () => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        label.classList.remove('focus')
    });
});