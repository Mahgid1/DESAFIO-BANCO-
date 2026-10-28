const botao = document.getElementById("contar");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", function () {
    let numero = Numberdocument.getElementById("numero").value;

    let texto = "";

    if(number.isInteger(numero) || numero <1 || numero > 20) {
        resultado.textContent = "Digite um numero inteiro entre 1 e 20.";
        return;
}


while (numero > 0) {
    texto += numero + "<br>";
    numero--;
}

texto +="Fiml";
resultado.innerHTML = texto;
})