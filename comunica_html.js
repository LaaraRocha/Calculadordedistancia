export function comunicador () {
    estrada();
}

export function escreverNomes() {
    const api = mountApi("")
    var mycars = [retornaOrigem()];
    var list = document.getElementById('anrede');

    mycars.forEach(function(item){
        var option = document.createElement('option');
        option.value = item;
        list.appendChild(option);
    });
}

document.getElementById('teste').addEventListener('click', chamada(), false);

async function chamada() {
    console.log('chegou chamada');
    const response = await fetch('http://localhost:3080/');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
}

