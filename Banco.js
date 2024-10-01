const readline = require('readline');

// Configura o readline para capturar entrada do usuário no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//cria classe
class contabancaria{
    // Chama o método construtor para atrinuir os valores as propriedades
    constructor(titular, saldo, numerodaconta){
        this.titular = titular;
        this.saldo = saldo;
        this.numerodaconta = numerodaconta;
    }
    // Método para depositar um valor na conta
    depositar (valor){
        if(valor > 0){
            this.saldo += valor;
            console.log(`Deposito de R$${valor} realizado com sucesso na conta de ${this.titular}!`);
        }
        else{
            console.log('O valor do deposito deve ser positivo');
        }
    }
    // Método para sacar um valor da conta
    sacar (valor){
        if (valor > 0 && valor <= this.saldo){
            this.saldo -= valor;
            console.log(`Saque de R$${valor} realizado com sucesso na conta de ${this.titular}!`);
        }
        else if(valor > this.saldo){
            console.log('Saldo insuficiente para saque.');
        }
        else{
            console.log('O valor do saque deve ser positivo.');
        }
    }
    // Método para consultar o saldo atual da conta
    consultar (){
        console.log(`Saldo atual da conta de ${this.titular}: R$${this.saldo}`);
    }
}

// Array para armazenar todas as contas bancárias
let contas = [];

// Função para criar uma nova conta bancária
function criarconta(titular, saldo, numerodaconta){
    let novaconta = new contabancaria(titular, saldo, numerodaconta);
    contas.push(novaconta);
    console.log(`Conta criada com sucesso para ${titular}!`);
}

// Função para depositar em uma conta existente
function depositar(numerodaconta, valor){
    let conta = contas.find(conta => conta.numerodaconta === numerodaconta);
    if (conta) {
        conta.depositar(valor);
    }
    else {
        console.log('Conta não encontrada');
    }
}

// Função para sacar de uma conta existente
function sacar(numerodaconta, valor) {
    let conta = contas.find(conta => conta.numerodaconta === numerodaconta);
    if (conta) {
        conta.sacar(valor);
    } else {
        console.log('Conta não encontrada.');
    }
}

// Função para sacar de uma conta existente
function consultarsaldo(numerodaconta) {
    let conta = contas.find(conta => conta.numerodaconta === numerodaconta);
    if (conta) {
        conta.consultar();
    }
    else {
        console.log('Conta não encontrada');
    }
}

// Função para listar todas as contas existentes
function listarcontas() {
    if (contas.length > 0){
        console.log('Contas existentes:');
        contas.forEach(conta => {
            console.log(`Titular: ${conta.titular}, Número da conta: ${conta.numerodaconta}, Saldo: R$${conta.saldo}`);
        });
    }
    else {
        console.log('Não há contas cadastradas.');
    }
}

// Função para validar se o input contém apenas letras
function validarLetras(input) {
    return /^[a-zA-Z\s]+$/.test(input);
}

// Função para validar se o input contém apenas números
function validarNumeros(input) {
    return /^[0-9]+$/.test(input);
}

// Função para exibir o menu de opções
function exibirMenu() {
    console.log("\n----- Menu -----");
    console.log("1. Criar conta");
    console.log("2. Depositar");
    console.log("3. Sacar");
    console.log("4. Consultar saldo");
    console.log("5. Listar contas");
    console.log("6. Sair");
    console.log("----------------");
}

// Função para lidar com as opções do menu
function menu() {
    exibirMenu();
    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1': // Criar conta
                rl.question('Nome do titular: ', (titular) => {
                    if (!validarLetras(titular)) {
                        console.log('Digite apenas letras.');
                        return menu(); // Exibe o menu novamente
                    }
                    rl.question('Saldo inicial: ', (saldo) => {
                        if (!validarNumeros(saldo)) {
                             console.log('Digite apenas números.');
                             return menu(); // Exibe o menu novamente
                        }
                        rl.question('Número da conta: ', (numerodaconta) => {
                            if (!validarNumeros(numerodaconta)) {
                                console.log('Digite apenas números.');
                                return menu(); // Exibe o menu novamente
                            }
                            criarconta(titular, parseFloat(saldo), parseInt(numerodaconta));
                            menu(); // Exibe o menu novamente
                        });
                    });
                });
                break;

            case '2': // Depositar
                rl.question('Número da conta: ', (numerodaconta) => {
                    if (!validarNumeros(numerodaconta)) {
                        console.log('Digite apenas números.');
                        return menu(); // Exibe o menu novamente
                    }
                    rl.question('Valor a depositar: ', (valor) => {
                        if (!validarNumeros(valor)) {
                            console.log('Digite apenas números.');
                            return menu(); // Exibe o menu novamente
                        }
                        depositar(parseInt(numerodaconta), parseFloat(valor));
                        menu(); // Exibe o menu novamente
                    });
                });
                break;

            case '3': // Sacar
                rl.question('Número da conta: ', (numerodaconta) => {
                    if (!validarNumeros(numerodaconta)) {
                        console.log('Digite apenas números.');
                        return menu(); // Exibe o menu novamente
                    }
                    rl.question('Valor a sacar: ', (valor) => {
                        if (!validarNumeros(valor)) {
                            console.log('Digite apenas números.');
                            return menu(); // Exibe o menu novamente
                        }
                        sacar(parseInt(numerodaconta), parseFloat(valor));
                        menu(); // Exibe o menu novamente
                    });
                });
                break;

            case '4': // Consultar saldo
                rl.question('Número da conta: ', (numerodaconta) => {
                    if (!validarNumeros(numerodaconta)) {
                        console.log('Digite apenas números.');
                        return menu(); // Exibe o menu novamente
                    }
                    consultarsaldo(parseInt(numerodaconta));
                    menu(); // Exibe o menu novamente
                });
                break;

            case '5': // Listar contas
                listarcontas();
                menu(); // Exibe o menu novamente
                break;

            case '6': // Sair
                console.log('Saindo do sistema...');
                rl.close(); // Fecha o readline
                break;

            default:
                console.log('Opção inválida. Tente novamente.');
                menu(); // Exibe o menu novamente
                break;
        }
    });
}

// Inicia o sistema mostrando o menu
menu();