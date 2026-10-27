

function gerarSelectAno() {
    const anos = [2022, 2023, 2024, 2025, 2026];
    const selectAno = document.querySelector('#ano');

    anos.forEach((ano) => {
        const option = document.createElement('option');
        option.value = ano;
        option.textContent = ano;
        selectAno.appendChild(option);
    });

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();

    selectAno.value = anoAtual;
}

function gerarSelectMes() {
    const meses = [
        { numero: 1, nome: 'Janeiro' },
        { numero: 2, nome: 'Favereiro' },
        { numero: 3, nome: 'Março' },
        { numero: 4, nome: 'Abril' },
        { numero: 5, nome: 'Maio' },
        { numero: 6, nome: 'Junho' },
        { numero: 7, nome: 'Julho' },
        { numero: 8, nome: 'Agosto' },
        { numero: 9, nome: 'Setembro' },
        { numero: 10, nome: 'Outubro' },
        { numero: 11, nome: 'Novembro' },
        { numero: 12, nome: 'Dezembro' }
    ];

    const selectMes = document.querySelector('#mes');

    meses.forEach((mes) => {
        const option = document.createElement('option');
        option.value = mes.numero;
        option.textContent = mes.nome;
        selectMes.appendChild(option);
    });

    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    
    selectMes.value = mesAtual;
}

async function carregarPerfil() {
    const conf = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    const id_perfil = localStorage.getItem('id_perfil');

    const url = `https://6adb8eab3b7e90b820900f43.mockapi.io/perfil/${id_perfil}`;

    const resposta = await fetch(url, conf);
    const perfil = await resposta.json();

    return perfil;

}

async function buscarLancamentos(mesAtual, anoAtual, tipo = 'Todos') 
{
    startSpinner();

    const conf = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    
    const id_perfil = localStorage.getItem('id_perfil');
    const url = `https://6adb8eab3b7e90b820900f43.mockapi.io/lancamentos?id_perfil=${id_perfil}`;

    const resposta = await fetch(url, conf);
    stopSpinner();  

    if(!resposta.ok) {
        return [];    
    }

    const lancamentos = await resposta.json();

    const lancamentosFiltrados = lancamentos
        .filter(lancamento => {
            const [ano, mes, dia] = lancamento.data.split('-');
            return ano == anoAtual && mes == mesAtual;
        })
        .filter(lancamento => {
            if(tipo == 'Todos') return true;
            return lancamento.tipo == tipo;
        });

    return lancamentosFiltrados;
}

async function povoarTabela(mesAtual, anoAtual, tipo = 'Todos') 
{
    const tabela = document.querySelector('#lancamentos');
    tabela.innerHTML = 'Um momento...';

    const lancamentos = await buscarLancamentos(mesAtual, anoAtual, tipo);

    const perfil = await carregarPerfil();
    const strongRenda = document.querySelector('#renda');
    strongRenda.textContent = `R$ ${perfil.renda.toFixed(2)}`;

    const strongUsuario = document.querySelector('#usuario');
    strongUsuario.textContent =  `${perfil.nome},`;

    if(lancamentos.length == 0) {
        tabela.innerHTML = 'Nenhum lançamento encontrado!';
        return;
    }

    tabela.innerHTML = '';

    lancamentos.forEach(lancamento => {
        const tr = document.createElement('tr');
        const avatar = lancamento.categoria[0];
        const [ano, mes, dia] = lancamento.data.split('-');
        
        tr.innerHTML = `
            <td>
                <div class="transaction">
                    <div class="avatar avatar-red">${avatar}</div>
                    <div>
                        <p>${lancamento.descricao}</p>
                        <span>${lancamento.categoria} &middot; ${dia}/${mes}</span>
                    </div>
                </div>
            </td>
            <td class="align-right ${ lancamento.tipo == 'DESPESA' ? 'currency-red' : 'currency-green' }">
                <span class="material-symbols-outlined">
                    ${ lancamento.tipo == 'DESPESA' ? 'arrow_downward' : 'arrow_upward' }
                </span>
                R$ ${lancamento.valor.toFixed(2)}
            </td>
            <td>
                <button type="button" class="btn-icon" onclick="remover(${lancamento.id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;

        tabela.append(tr);

    });

    const despesas = lancamentos.filter(lancamento => lancamento.tipo === 'DESPESA');
    const receitas = lancamentos.filter(lancamento => lancamento.tipo === 'RECEITA');

    const totalDespesas = despesas.reduce((soma, lancamento) => soma + lancamento.valor, 0);
    const totalReceitas = receitas.reduce((soma, lancamento) => soma + lancamento.valor, 0);

    const balanco = totalReceitas - totalDespesas
    const saldo = perfil.renda + balanco;
    
    const valorReceitas = document.querySelector('#valor-receitas');
    valorReceitas.textContent = `R$ ${totalReceitas.toFixed(2)}`;

    const valorDespesas = document.querySelector('#valor-despesas');
    valorDespesas.textContent = `R$ ${totalDespesas.toFixed(2)}`;

    const valorSaldo = document.querySelector('#saldo');
    valorSaldo.textContent = `R$ ${saldo.toFixed(2)}`;
    
    // Quanto porcento você gastou por mês
    const percentualGastos = Math.abs((balanco * 100) / perfil.renda);

    const percentualSalario = document.querySelector('#percentual-salario');
    const percentual = `${percentualGastos.toFixed(0)}%`;
    percentualSalario.textContent = percentual;

    // Desenha a barra de consumo do salário
    const percent = document.querySelector('.percent');
    percent.style = `width: ${percentual}`;
}

function definirPeriodo() {

    const { mes, ano } = getMesAno();

    povoarTabela(mes, ano);
}

function getMesAno() {
    const selectMes = document.querySelector('#mes');
    const mes = Number(selectMes.value);

    const selectAno = document.querySelector('#ano');
    const ano = Number(selectAno.value)

    return { mes: mes, ano: ano }
}

function filtrarPorTipo(tipo = 'Todos') 
{
    const { mes, ano } = getMesAno();

    povoarTabela(mes, ano, tipo);

}

async function remover(id) {
    if(confirm('Tem certeza que deseja excluir?')) {
        startSpinner();

        const conf = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }

        const url = `https://6adb8eab3b7e90b820900f43.mockapi.io/lancamentos/${id}`;

        const resposta = await fetch(url, conf);

        stopSpinner();

        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        const mesAtual = hoje.getMonth() + 1;

        if(resposta.ok) {
            povoarTabela(mesAtual, anoAtual);
        }
    }
}

const hoje = new Date();
const anoAtual = hoje.getFullYear();
const mesAtual = hoje.getMonth() + 1;

gerarSelectAno();
gerarSelectMes();

povoarTabela(mesAtual, anoAtual);

carregarPerfil();