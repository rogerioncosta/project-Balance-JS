const caixaFormulario = {
        abrirFormulario() {
            document
            .querySelector(".caixa-form-geral")
            .classList
            .add("abrir-formulario")
        },
        
        fecharFormulario() {
            document
            .querySelector(".caixa-form-geral")
            .classList
            .remove("abrir-formulario")
        }
        
        // fecharFormulario2() {
        //     let test = document.getElementsByClassName("caixa-form-geral abrir-formulario")[0]
        //     test.classList.remove("abrir-formulario")
        // }
}

const transacao = {
    entradas() {
        // somar as entradas
    },

    saidas() {
        // somar as saídas
    },

    total() {
        // valor das entradas - as saídas
    }
}

const transacoes = [
    {
        id: 1,
        descricao: 'Luz',
        valor: -50000,
        data: '23/01/2022'
    }, 
    {
        id: 2,
        descricao: 'Website',
        valor: 500000,
        data: '24/01/2022'
    }, 
    {
        id: 3,
        descricao: 'Internet',
        valor: -20000,
        data: '25/01/2022'
    }
]


const DOM = {
    // Cria a tag tr
    adicionarTransacao(umaTransacao, indice) {
        console.log(umaTransacao)
        const tr = document.createElement('tr')
        // Dentro do html do tr, coloca os tds
        tr.innerHTML = DOM.transacaoInnerHTML()
        // a var tr tem o valor dos tds
    },

    // Cria os tds para a tag tr
    transacaoInnerHTML() {
        const html =
        `   <td class="descricao">Luz</td>
            <td class="saida">-R$ 500,00</td>
            <td class="data">23/01/2022</td>   
        `
        // Cria os tds e retorna para fora
        return html
    }    
}

// Chamar a funcão adicionarTransacao
DOM.adicionarTransacao(transacoes[1])

