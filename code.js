
var ordem;
var contRodadas;
var contCliques

function startGame(){
    document.getElementById('wrong').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    ordem = []
    contRodadas = 0
    newRound()

}

function aleatorizar(){
    let valor = (Math.random() * 800).toString().slice(1, 3);
    valor = valor.replace('.', '0');
    return valor
}

function newRound(){
    contRodadas++
    document.getElementById('contRodadas').innerHTML = contRodadas
    contCliques = 0
    document.getElementById('gameSpace').style.pointerEvents = "none";

    
    let choosedColor = aleatorizar()
    if(choosedColor < 25){
        ordem.push('red');
    }else if(choosedColor < 50){
        ordem.push('green');
    }else if(choosedColor < 75){
        ordem.push('yellow');
    }else if(choosedColor >= 75){
        ordem.push('blue')
    }else{
        alert('Deu um erro no if do New Round')
    }
    

    showCurrentPattern()

}

function showCurrentPattern(){
    let cont = 0;
    let show = setInterval(() => {

        if(cont == ordem.length){
            clearInterval(show);
            runRound()
        }else{
            document.getElementById(ordem[cont]).classList.add(ordem[cont] + 'Light');
        }
        cont++
        setTimeout(() => {
            document.getElementById('red').classList.remove('redLight')
            document.getElementById('blue').classList.remove('blueLight')
            document.getElementById('green').classList.remove('greenLight')
            document.getElementById('yellow').classList.remove('yellowLight')

        }, 1000);

    }, 1500);
}

function runRound(){
    document.getElementById('gameSpace').style.pointerEvents = "all";
}

function selected(color){
    document.getElementById(color).classList.add(color + 'Light');

    setTimeout(() => {
        document.getElementById(color).classList.remove(color + 'Light');

        contCliques++;

        let atualContCliques = contCliques


        let ordemLenght = ordem.length;
        if(color != ordem[atualContCliques - 1]){
            wrong();
            return
        }

        if(atualContCliques == ordemLenght){
            win()
            return
        }
    }, 500);
    

}

function wrong(){
    document.getElementById('wrong').style.display = 'block'
    document.getElementById('msg').children[0].innerHTML = 'Parabéns, você chegou até a rodada ' + contRodadas;
}

function win(){

    let contBlinks = 0

    let blink = setInterval(() => {
        contBlinks++
        document.getElementById('red').classList.add('redLight');
        document.getElementById('blue').classList.add('blueLight');
        document.getElementById('yellow').classList.add('yellowLight');
        document.getElementById('green').classList.add('greenLight');

         setTimeout(() => {
            document.getElementById('red').classList.remove('redLight');
            document.getElementById('blue').classList.remove('blueLight');
            document.getElementById('yellow').classList.remove('yellowLight');
            document.getElementById('green').classList.remove('greenLight');
        }, 500);
        if(contBlinks == 2){
            clearInterval(blink)
            setTimeout(() => {
                newRound()
            }, 1500);
        }
    }, 1000);


    
}