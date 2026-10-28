
let saldo = 1000.00;

let historico = [
    "Abertura da conta: R$ 1.000,00"
];

const campoOperacao = document.getElementById("operacao");
const campoValor = document.getElementById("valor");
const campoSaldo = document.getElementById("saldo");
const campoResultado = document.getElementById("resultado");
const botao = document.getElementById("executar");

function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

botao.addEventListener("click", function () {
    const operacao = campoOperacao.value;
    const entrada = campoValor.value;
    const valor = Number(entrada);

    let mensagem = "";

    switch (operacao) {

        case "consultar":
            mensagem = "Saldo disponível: " + formatarDinheiro(saldo);
            break;

        case "depositar":

            if (entrada.trim() === "" ||
                !Number.isInteger(valor) ||
                valor <= 0) {

                mensagem = "Erro: informe um valor inteiro maior que zero.";

            } else {
                saldo += valor;

                historico.push(
                    "Depósito: +" + formatarDinheiro(valor)
                );

                mensagem =
                    "Depósito de " + formatarDinheiro(valor) +
                    " realizado com sucesso!\n" +
                    "Novo saldo: " + formatarDinheiro(saldo);
            }

            break;

        case "sacar":

            if (entrada.trim() === "" ||
                !Number.isInteger(valor) ||
                valor <= 0) {

                mensagem = "Erro: informe um valor inteiro maior que zero.";

            } else if (valor % 10 !== 0) {

                mensagem = "Erro: o valor do saque deve ser múltiplo de 10.";

            } else if (valor > saldo) {

                mensagem = "Erro: saldo insuficiente.";

            } else {
                let restante = valor;

                let notas100 = 0;
                let notas50 = 0;
                let notas20 = 0;
                let notas10 = 0;

                while (restante >= 100) {
                    restante -= 100;
                    notas100++;
                }

                while (restante >= 50) {
                    restante -= 50;
                    notas50++;
                }

                while (restante >= 20) {
                    restante -= 20;
                    notas20++;
                }


                while (restante >= 10) {
                    restante -= 10;
                    notas10++;
                }

                saldo -= valor;

                historico.push(
                    "Saque: -" + formatarDinheiro(valor)
                );

                const totalNotas =
                    notas100 + notas50 + notas20 + notas10;

                mensagem =
                    "Saque de " + formatarDinheiro(valor) +
                    " realizado com sucesso!\n\n" +
                    "Notas entregues:\n" +
                    "R$ 100: " + notas100 + " nota(s)\n" +
                    "R$ 50: " + notas50 + " nota(s)\n" +
                    "R$ 20: " + notas20 + " nota(s)\n" +
                    "R$ 10: " + notas10 + " nota(s)\n\n" +
                    "Total de notas: " + totalNotas + "\n" +
                    "Total sacado: " + formatarDinheiro(valor) + "\n" +
                    "Saldo restante: " + formatarDinheiro(saldo);
            }

            break;

        case "extrato":

            mensagem = "===== EXTRATO =====\n\n";

            for (let i = 0; i < historico.length; i++) {
                mensagem += (i + 1) + ". " + historico[i] + "\n";
            }

            mensagem +=
                "\nSaldo atual: " + formatarDinheiro(saldo);

            break;

        default:
            mensagem = "Erro: operação inválida.";
    }

    campoSaldo.textContent = formatarDinheiro(saldo);
    campoResultado.textContent = mensagem;

    campoValor.value = "";
});
