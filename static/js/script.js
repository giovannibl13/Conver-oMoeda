let btnConverter = document.querySelector("#converter");
let inputValor = document.querySelector("#valor");
let selectDe = document.querySelector("#moedaOrigem");
let selectPara = document.querySelector("#moedaDestino");
let resultado = document.querySelector("#resultado");
let resultadoBTC = document.querySelector("#resultadoBTC");
let curiosidade = document.querySelector("#curiosidade"); // ainda existe, mas será deixado vazio
let loading = document.querySelector(".loading");

btnConverter.onclick = function (e) {
    loading.style.display = "block";
    let valor = parseFloat(inputValor.value);
    let de = selectDe.value;
    let para = selectPara.value;
    const access_key = '6de6a1531284a8ca43404c107de6e501';

    if (isNaN(valor) || valor <= 0) {
        inputValor.style.borderColor = 'red';
        resultado.textContent = "Digite um valor válido.";
        resultadoBTC.textContent = "";
        curiosidade.textContent = "";
        return;
    } else {
        inputValor.style.borderColor = 'black';
    }

    let url = `https://api.exchangerate.host/convert?access_key=${access_key}&from=${de}&to=${para}&amount=${valor}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let valorConvertido = data.result.toFixed(2);
            resultado.textContent = `Valor convertido: ${valorConvertido} ${para}`;

            // Buscar o preço do Bitcoin na moeda convertida
            let urlBitCoin = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${para}`;
            return fetch(urlBitCoin)
                .then(response => response.json())
                .then(btcData => {
                    let btcPreco = btcData.bitcoin[para.toLowerCase()].toFixed(2);
                    resultado.textContent += ` | Preço do Bitcoin: ${btcPreco} ${para}`;

                    let btcQuantidade = (valorConvertido / btcPreco).toFixed(8);
                    resultadoBTC.textContent = `Você compraria: ${btcQuantidade} BTC`;

                    // Retira curiosidade, limpa o campo se tiver algo antigo
                    curiosidade.textContent = "";

                    // usa a API da gemini 
                    let urlGemini = `http://localhost:5000/curiosidade/${para}`
                    console.log(urlGemini);
                    fetch(urlGemini)
                        .then(response => response.text())
                        .then(data => {
                            console.log(data);
                            loading.style.display = "none";
                            curiosidade.textContent = data;
                    
                        })
                        .catch(error => {
                            console.error('Erro ao buscar dados:', error);
                        });
                });
                console.log(url);
                console.log(urlBitCoin);
        })
        
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            resultado.textContent = "Erro ao converter moeda ou buscar dados.";
            resultadoBTC.textContent = "";
            curiosidade.textContent = "";
        });
        
                
};
//chave api gemini = AIzaSyApKZi4ViCidr_FxXjvlwskmyVwn1YOHgk