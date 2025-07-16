let btnConverter = document.querySelector("#converter");
let inputValor = document.querySelector("#valor");
let selectDe = document.querySelector("#moedaOrigem");
let selectPara = document.querySelector("#moedaDestino");
let resultado = document.querySelector("#resultado");
let resultadoBTC = document.querySelector("#resultadoBTC");

btnConverter.onclick = function (e) {
    let valor = parseFloat(inputValor.value);
    let de = selectDe.value;
    let para = selectPara.value;
    let access_key = '6de6a1531284a8ca43404c107de6e501';

    console.log(valor);
    console.log(de);
    console.log(para);

    if (isNaN(valor) || valor <= 0) {
        inputValor.style.borderColor = 'red';
        resultado.textContent = "Digite um valor válido.";
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
    

        // Agora vamos buscar o preço do Bitcoin nessa moeda
         let urlBitCoin = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${para}`
       return fetch(urlBitCoin);
    })

    .then(response => response.json())
    .then(btcData => {
        let btcPreco = btcData.bitcoin[para].toFixed(2);
        resultado.textContent += ` | Preço do Bitcoin: ${btcPreco} ${para}`;

        let btcQuantidade = (valorConvertido / btcPreco).toFixed(8);
        resultadoBTC.textContent += ` | Você compraria: ${btcQuantidade} BTC`;
  })
  .catch(error => console.error('Erro ao buscar dados:', error));
}

// https://api.exchangerate.host/convert?access_key=6de6a1531284a8ca43404c107de6e501&from=USD&to=BRL&amount=10
// https://api.exchangerate.host/convert?acess_key=d7905380f2855571bafabc5bcddc4bb0&from=EUR&to=GBP&amount=100
