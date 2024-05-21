//let titulo = document.querySelector('h1');
//titulo.innerHTML = `Jogo do número secreto`;
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = `Escolha um número entre 1 e 10`;

let listaDeNumerosSorteados = []
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//funções com parâmetros
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}
function mensagemInicial(){
    exibirTextoNaTela('h1', `Jogo do número secreto`);
    exibirTextoNaTela('p', `Escolha um número entre 1 e 10`);
}
mensagemInicial()


//funcoes sem parâmetro
function verificarChute(){
    let chute = document.querySelector('input').value;
   
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1  ?'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'o número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

//funcao com retorno
function gerarNumeroAleatorio() {
    let numeroEsolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    } 
    if(listaDeNumerosSorteados.includes(numeroEsolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEsolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEsolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

