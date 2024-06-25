let listaNumerosSorteados = []
let numeroLimit = 10
let numeroScreto = gerarNumeroAleatorio();
let tentativas = 1


function exibirTexto (tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}

function msgInicial () {
    exibirTexto('h1','Jogo do numero secreto')
    exibirTexto('p','Escolha um numero entre 1 e 10')
}

msgInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
   
    if (chute == numeroScreto) {
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa'
        let msgTentativas = `Voce descobriu o numero secreto! Com ${tentativas} ${palavraTentativa}!`
        exibirTexto('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroScreto) {
            exibirTexto('p', `O numero secreto é menor que ${chute}`);
        } else {
            exibirTexto('p', `O numero secreto é maior que ${chute}`);
        }
        tentativas = tentativas + 1;
        limparCampo()
    }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimit + 1);
    let quantidadeElementoList = listaNumerosSorteados.length

    if (quantidadeElementoList == numeroLimit) {
        listaNumerosSorteados = []
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido)
        console.log(listaNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input')
    chute.value = '';
}

function reiniciarJogo() {
    numeroScreto = gerarNumeroAleatorio()
    limparCampo()
    tentativas = 1
    msgInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true)
}