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


const Transacao = {
    all: [
        // {
        //     // id: 1,
        //     descricao: 'Luz',
        //     valor: -50000,
        //     data: '23/01/2022'
        // }, 
        // {
        //     // id: 2,
        //     descricao: 'Website',
        //     valor: 500000,
        //     data: '24/01/2022'
        // }, 
        // {
        //     // id: 3,
        //     descricao: 'Internet',
        //     valor: -20012,
        //     data: '25/01/2022'
        // },
        // {
        //     // id: 4,
        //     descricao: 'App',
        //     valor: 200000,
        //     data: '25/01/2022'
        // }
    ],

    add(transacao) {
        Transacao.all.push(transacao)

        app.reiniciar()
    },

    remover(indice) {
        Transacao.all.splice(indice, 1)
        app.reiniciar()
    },

    entradas() {
        let entrada = 0
        // pegar todas as transações
        // para cada transação,
        Transacao.all.forEach(transacao => {
            // se ela for maior que zero
            if(transacao.valor > 0) {
                // somar a uma variavel e retornar ela
                entrada = entrada + transacao.valor
            }
        })
        return entrada
    },

    saidas() {
        let saida = 0
        // pegar todas as transações
        // para cada transação,
        Transacao.all.forEach(transacao => {
            // se ela for menor que zero
            if(transacao.valor < 0) {
                // somar a uma variavel e retornar ela
                saida = saida + transacao.valor
            }
        })
        return saida
    },

    total() {
        // valor das entradas - as saídas
        return Transacao.entradas() + Transacao.saidas()
    }
}

const DOM = {
    // pega as tags #dados-tabela tbody e coloca na var containerTransacoes
    containerTransacoes: document.querySelector('#dados-tabela tbody'),

    // Cria a tag tr
    adicionarTransacao(transacao, indice) {       

        console.log(transacao)

        const tr = document.createElement('tr')
        
        tr.innerHTML = DOM.transacaoInnerHTML(transacao)
        // Dentro do html do tr, coloca os tds
        // a var tr tem o valor dos tds

        console.log(tr.innerHTML + "****")

        // Adiciona o tr dentro de #dados-tabela no tbody. Child é o tr
        DOM.containerTransacoes.appendChild(tr)
    },

    // Cria os tds para a tag tr
    transacaoInnerHTML(transacao) {
        const CSSclasse = transacao.valor > 0 ? "entrada" : "saida"

        const valor =  uteis.formatoMoeda(transacao.valor)

        const html =
        `   <td class="descricao">${transacao.descricao}</td>
            <td class=${CSSclasse}>${valor}</td>
            <td class="data">${transacao.data}</td>   
        `
        // Cria os tds e retorna para fora
        return html
    },
    
    atualizarValoresCartoes() {
        document
            .getElementById('mostraEntradas')
            .innerHTML = uteis.formatoMoeda(Transacao.entradas())
    
        document
            .getElementById('mostraSaidas')
            .innerHTML = uteis.formatoMoeda(Transacao.saidas())
    
        document
            .getElementById('mostraTotal')
            .innerHTML = uteis.formatoMoeda(Transacao.total())
    },

    limparTransacoes() {
        DOM.containerTransacoes.innerHTML = ""
    }
}

const uteis = {
    formatarValor(valor) {
      valor = Number(valor) * 100
      return valor
    },

    formatarData(data) {
        const separarData = data.split("-")
        return `${separarData[2]}/${separarData[1]}/${separarData[0]}`
    },


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

const form = {
    descricao: document.querySelector('input#descricao'),
    valor: document.querySelector('input#valor'),
    data: document.querySelector('input#data'),

    pegarValores() {
        return {
            descricao: form.descricao.value,
            valor: form.valor.value,
            data: form.data.value
        }
    },

    validarCampos() {
        const { descricao, valor, data } = form.pegarValores()

        if( descricao.trim() === "" || 
            valor.trim() === "" || 
            data.trim() === "") {
                throw new Error("Por favor, preencha todos os campos")
        }
    },

    
    formatarValores() {
        let { descricao, valor, data } = form.pegarValores()

        valor = uteis.formatarValor(valor)

        data = uteis.formatarData(data)

        return {
            descricao,
            valor,
            data
        }
    },

    limparCampos() {
        form.descricao.value = ""
        form.valor.value = ""
        form.data.value = ""
    },


    submit(event) {
        event.preventDefault()

        try {
            form.validarCampos()
            const transacao = form.formatarValores()
            Transacao.add(transacao)
            form.limparCampos()
            caixaFormulario.fecharFormulario()

        } catch (error) {
            alert(error.message)
        }

    }
}

const app = {
    iniciar() {

        // Para cada obj, cria o html em cada posição do obj transacoes
        Transacao.all.forEach(function(transacao) {
            DOM.adicionarTransacao(transacao)
        })

        DOM.atualizarValoresCartoes()
        

    },
    reiniciar() {
        DOM.limparTransacoes()
        app.iniciar()

    },
}

app.iniciar()

// transacao.add({
//     // id: 39,
//     descricao: 'alo',
//     valor: 200,
//     data: '18/04/2022'
// })

// Chamar a funcão adicionarTransacao pegando a posição 0 do obj transacoes e jogando pra dentro da func adicionarTransacao
// DOM.adicionarTransacao(transacoes[0])
// DOM.adicionarTransacao(transacoes[1])
// DOM.adicionarTransacao(transacoes[2])



