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
        //     test.classList.remove("abrir-formulario")..
        // }
}

const transacao = {
    entradas() {
        let entrada = 0
        // pegar todas as transações
        // para cada transação,
        transacoes.forEach(transacoes => {
            // se ela for maior que zero
            if(transacoes.valor > 0) {
                // somar a uma variavel e retornar ela
                entrada = entrada + transacoes.valor
            }
        })
        return entrada
    },

    saidas() {
        let saida = 0
        // pegar todas as transações
        // para cada transação,
        transacoes.forEach(transacoes => {
            // se ela for menor que zero
            if(transacoes.valor < 0) {
                // somar a uma variavel e retornar ela
                saida = saida + transacoes.valor
            }
        })
        return saida
    },

    total() {
        // valor das entradas - as saídas
        return transacao.entradas() + transacao.saidas()
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
        valor: -20012,
        data: '25/01/2022'
    },
    {
        id: 4,
        descricao: 'App',
        valor: 200000,
        data: '25/01/2022'
    }
]

const DOM = {
    // pega as tags #dados-tabela tbody e coloca na var containerTransacoes
    containerTransacoes: document.querySelector('#dados-tabela tbody'),

    // Cria a tag tr
    adicionarTransacao(transacoes, indice) {       

        console.log(transacoes)

        const tr = document.createElement('tr')
        
        tr.innerHTML = DOM.transacaoInnerHTML(transacoes)
        // Dentro do html do tr, coloca os tds
        // a var tr tem o valor dos tds

        console.log(tr.innerHTML + "****")

        // Adiciona o tr dentro de #dados-tabela no tbody. Child é o tr
        DOM.containerTransacoes.appendChild(tr)
    },

    // Cria os tds para a tag tr
    transacaoInnerHTML(transacoes) {
        const CSSclasse = transacoes.valor > 0 ? "entrada" : "saida"

        const valor =  uteis.formatoMoeda(transacoes.valor)

        const html =
        `   <td class="descricao">${transacoes.descricao}</td>
            <td class=${CSSclasse}>${valor}</td>
            <td class="data">${transacoes.data}</td>   
        `
        // Cria os tds e retorna para fora
        return html
    },
    
    atualizarValoresCartoes() {
        document
            .getElementById('mostraEntradas')
            .innerHTML = uteis.formatoMoeda(transacao.entradas())
    
        document
            .getElementById('mostraSaidas')
            .innerHTML = uteis.formatoMoeda(transacao.saidas())
    
        document
            .getElementById('mostraTotal')
            .innerHTML = uteis.formatoMoeda(transacao.total())
    }
}

const uteis = {
    formatoMoeda(valor) {
        // Força o valor para ser number
        const sinal = Number(valor) < 0 ? "-" : ""

        // Transforma o valor em string
        valor = String(valor).replace(/\D/g, "")

        // Transforma em número novamente e divide por 100 para tirar os 2 últimos zeros
        valor = Number(valor) / 100

        valor = valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return sinal + valor
    }
}

// Chamar a funcão adicionarTransacao pegando a posição 0 do obj transacoes e jogando pra dentro da func adicionarTransacao
// DOM.adicionarTransacao(transacoes[0])
// DOM.adicionarTransacao(transacoes[1])
// DOM.adicionarTransacao(transacoes[2])

// Para cada obj, cria o html em cada posição do obj transacoes
transacoes.forEach(function(transacoes) {
    DOM.adicionarTransacao(transacoes)
})

DOM.atualizarValoresCartoes()
