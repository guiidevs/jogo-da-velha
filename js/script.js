const blocos = document.querySelectorAll('.bloco');
const mensagem = document.querySelector('.mensagem label');
const div_mensagem = document.querySelector('.mensagem');
const nome = document.querySelector('#nome');
const painel = document.querySelector('.painel');

let ultimoPlayer = "0"
let combinacoes = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
let sequencia = [];
let qtd = 0;

setInterval(robo, 10)

function iniciar() {
    blocos.forEach((item) => {
        item.innerText = "";
        item.addEventListener("click", newSimbolo)
        qtd = 0;
        sequencia = [];
        ultimoPlayer = "0";
        div_mensagem.style.display = "none";
        mensagem.innerHTML = "";
        painel.style.display = "none";

    })
}

function configurar(){
    painel.style.display = "block";
    div_mensagem.style.display = "none";
}

function travar() {
    blocos.forEach((item) => {
        item.removeEventListener("click", newSimbolo)
    })
}


function newSimbolo(event){
    const player =  ultimoPlayer == "X" ? ultimoPlayer = "0" : ultimoPlayer = "X";
    var datapos = event.target.getAttribute("data-i");
    event.target.innerText = player;
    event.target.removeEventListener("click", newSimbolo);
    sequencia[datapos] = player;
    win();
    qtd += 1;
}
function robo(){
    if(ultimoPlayer == "X" && div_mensagem.style.display == "none"){
        let index = 0; //Math.round(Math.random()*10)
        while(teste = Math.round(Math.random()*10)){
            if((teste - 1) >= 9 && sequencia[teste].includes("X")){ //
                console.log(teste, sequencia[teste].includes("X"))
            }else{
                index = teste;
                blocos[index].click();
                console.log(teste, sequencia[teste].includes("X"))
                break;
            }
        }
    }
}


function win(){
    combinacoes.map((item) => {
        let verif = 0;
        item.map((item)=>{
            verif = sequencia[item] == ultimoPlayer ? verif += 1 : verif += 0; 
        })
        
        if(verif == 3){
            qtd = 0;
            mensagem.innerText = ganhador(ultimoPlayer);
            mostrarMensagem();
            travar();
            
        }
    }
    )
    if(qtd >= 8){
        mostrarMensagem("O jogo ficou empatado!");
        travar();
    }
}

function ganhador(win){
    if(win == "X"){
        return win = `O jogador ` + nome.value + ` foi o vencedor`;
    }else{
        return win = "Que pena! O Bot foi o vencedor";
    }
}

function mostrarMensagem(msg){
    div_mensagem.style.display = "flex";
    mensagem.innerText += msg ? msg : "" ;
}

