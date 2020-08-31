//Criando e Inicializando as variáveis globais.
var page_inclusao = document.getElementById("page-inclusao"),
    page_alteracao = document.getElementById("page-alteracao"),
    page_verificacao = document.getElementById("page-verificacao"),
    page_blocos = document.getElementById("page-blocos"),
    btn_expandir = document.getElementById("btn-expandir"),
    info = document.getElementById("info"),
    info_update = document.getElementById("info-update"),
    blockchain = [];

//Inicializando a visualização dos Blocos.
att_blocos();

//Página de Inclusão.
function inclusao(){
    //Determinando como a parte dos blocos será mostrada.
    page_blocos.style = "";
    page_blocos.className = "col-sm-3 text-center py-3 bg-black";
    btn_expandir.style = "";

    //Determinando o que será mostrado na parte principal.
    page_inclusao.style = "";
    page_alteracao.style = "display: none;";
    page_verificacao.style = "display: none;";

    //Determinando o que será mostrado na parte de informações.
    info.innerHTML = "";
    info.className = "";

    //Determinando o que será mostrado nos campos de dados.
    document.getElementById("dificuldade").value = "1";
    document.getElementById("dados").value = "";

    //Atualizando a visualização dos Blocos.
    att_blocos();
}

//Processo de Inclusão.
function incluir(){
    //Criando e inicializando as variáveis.
    var bloco = [],
        dificuldade = parseInt(document.getElementById("dificuldade").value),
        dados = document.getElementById("dados").value;

    //Verificando se cumpre os requisitos para dificuldade e dados.
    //Caso não cumpra, mostra a mensagem de informação.
    if(dificuldade <= 0 && dados == ""){
        info.innerHTML = "-Selecione uma dificuldade maior que zero e Insira algum dado-";
        info.className = "span-h6 text-light bg-danger";
    }
    else if(dificuldade <= 0){
        info.innerHTML = "-Selecione uma dificuldade maior que zero-";
        info.className = "span-h6 text-light bg-danger";
    }
    else if(dados == ""){
        info.innerHTML = "-Insira algum dado-";
        info.className = "span-h6 text-light bg-danger";
    }
    else{
        //Criando as variáveis.
        var mining_values,
            tempo_antes, 
            tempo_depois, 
            tempo;

        //Adicionando o número do bloco no bloco.
        bloco.push(blockchain.length)

        //Verificando se a blockchain está vazia.
        //Se estiver vazia, o hash do bloco anterior é 0x0.
        //Se não estiver, adiciona o hash do bloco anterior.
        if(blockchain.length == 0)
            bloco.push(0x00);
        else
            bloco.push(blockchain[blockchain.length - 1][3]);
    
        //Adicionando os dados no bloco.
        bloco.push(dados);

        //Determinando o tempo antes do processo de mineração.
        tempo_antes = new Date();

        //Processo de mineração.
        mining_values = mining(dificuldade, dados);

        //Determinando o tempo depois do processo de mineração.
        tempo_depois = new Date();

        //Calculando quanto tempo durou o processo de mineração.
        tempo = tempo_depois.getTime() - tempo_antes.getTime();

        //Mostrando no console a dificuldade e o tempo de duração.
        console.log("Dif: " + dificuldade + " - T: " + tempo + "ms");

        //Adicionando o valor do hash atual no bloco.
        bloco.push(mining_values[0]);
    
        //Adicionando a dificuldade no bloco.
        bloco.push(dificuldade);

        //Adicionando o nonce no bloco.
        bloco.push(mining_values[1]);

        //Adicionando o bloco na blockchain.
        blockchain.push(bloco);

        //Mostrando a mensagem de informação.
        info.innerHTML = "-Incluído com sucesso-";
        info.className = "span-h6 text-light bg-success";

        //Atualizando a visualização dos Blocos.
        att_blocos();
    }
}

//Página de Alteração.
function alteracao(bloco){
    //Determinando como a parte dos blocos será mostrada.
    page_blocos.style = "";
    page_blocos.className = "col-sm-3 text-center py-3 bg-black";
    btn_expandir.style = "";

    //Determinando o que será mostrado na parte principal.
    page_inclusao.style = "display: none;";
    page_alteracao.style = "";
    page_verificacao.style = "display: none;";

    //Determinando o que será mostrado na parte de informações.
    info_update.innerHTML = "";
    info_update.className = "";

    //Criando e inicializando as variáveis.
    var n_bloco = document.getElementById("n-bloco-update"),
        hash_anterior = document.getElementById("hash-anterior"),
        hash_anterior_group = document.getElementById("hash-anterior-group"),
        dificuldade_update = document.getElementById("dificuldade-update"),
        dados_update = document.getElementById("dados-update");
    
    //Determinando o que será mostrado nos campos de dados.
    //Determinando o campo do número do bloco e desabilita.
    n_bloco.value = blockchain[bloco][0];
    n_bloco.disabled = true;

    //Determinando o campo do hash do bloco anterior e desabilita.
    hash_anterior.value = blockchain[bloco][1];
    hash_anterior.disabled = true;
    hash_anterior_group.style = "";

    //Determinando o campo da dificuldade.
    dificuldade_update.value = blockchain[bloco][4];

    //Determinando o campo de dados.
    dados_update.value = blockchain[bloco][2];

    //Atualizando a visualização dos Blocos.
    att_blocos();
}

//Processo de Alteração.
function alterar(){
    //Criando e inicializando as variáveis.
    var n_bloco = document.getElementById("n-bloco-update").value,
        dificuldade_update = parseInt(document.getElementById("dificuldade-update").value),
        dados_update = document.getElementById("dados-update").value;

    //Verificando se cumpre os requisitos para dificuldade e dados.
    //Caso não cumpra, mostra a mensagem de informação.
    if(dificuldade_update <= 0 && dados_update == ""){
        info_update.innerHTML = "-Selecione uma dificuldade maior que zero e Insira algum dado-";
        info_update.className = "span-h6 text-light bg-danger";
    }
    else if(dificuldade_update <= 0){
        info_update.innerHTML = "-Selecione uma dificuldade maior que zero-";
        info_update.className = "span-h6 text-light bg-danger";
    }
    else if(dados_update == ""){
        info_update.innerHTML = "-Insira algum dado-";
        info_update.className = "span-h6 text-light bg-danger";
    }
    else{
        //Criando a variável.
        var mining_values;

        //Processo de mineração.
        mining_values = mining(dificuldade_update, dados_update)

        //Determinando os novos valores do bloco.
        blockchain[n_bloco][2] = dados_update;
        blockchain[n_bloco][3] = mining_values[0];
        blockchain[n_bloco][4] = dificuldade_update;
        blockchain[n_bloco][5] = mining_values[1];

        //Mostrando a mensagem de informação.
        info_update.innerHTML = "-Alterado com sucesso-";
        info_update.className = "span-h6 text-light bg-success";

        //Atualizando a visualização dos Blocos.
        att_blocos();
    }
}

//Página e processo de Verificação.
function verificar(){
    //Determinando como a parte dos blocos será mostrada.
    page_blocos.style = "";
    page_blocos.className = "col-sm-3 text-center py-3 bg-black";
    btn_expandir.style = "";

    //Determinando o que será mostrado na parte principal.
    page_inclusao.style = "display: none;";
    page_alteracao.style = "display: none;";
    page_verificacao.style = "";

    //Criando e inicializando as variáveis.
    var info_integridade = document.getElementById("info-integridade"),
        bloco = 0;

    //Realiza a verificação da integridade e determina 
    //o que será mostrado na parte de informações.
    //Se a blockchain está vazia ou com somente 1 bloco,
    //então a integridade é confirmada.
    if(blockchain.length == 0 || blockchain.length == 1){
        info_integridade.className = "span-h3 bg-success";
        info_integridade.innerHTML = "Integridade Confirmada";
    }
    else{
        //Percorrendo e verificando a blockchain.
        for(bloco = 0; bloco < blockchain.length - 1; bloco++){
            if(sha256(blockchain[bloco][2] + blockchain[bloco][5]) != blockchain[bloco + 1][1])
                break;
        }

        //Se não percorreu a blockchain inteira, quer dizer
        //que a integridade foi violada.
        if(bloco != blockchain.length - 1){
            var item;

            //Exclui os blocos após o bloco violado.
            for(item = blockchain.length - 1; item >= bloco; item--)
                blockchain.pop();

            //Mostrando a mensagem de informação.
            info_integridade.className = "span-h3 bg-danger";
            info_integridade.innerHTML = "Integridade Violada no Bloco " + bloco + "<br>Todos os blocos após a violação foram exluídos";
        }

        //Mostrando a mensagem de informação.
        else{
            info_integridade.className = "span-h3 bg-success";
            info_integridade.innerHTML = "Integridade Confirmada";
        }
    }

    //Atualizando a visualização dos Blocos.
    att_blocos();
}

//Processo de Limpeza.
function limpar(){
    //Determinando como a parte dos blocos será mostrada.
    page_blocos.style = "display: none;";
    page_blocos.className = "col-sm-12 text-center py-3 bg-black";
    btn_expandir.style = "display: none;";

    //Determinando o que será mostrado na parte principal.
    page_inclusao.style = "display: none;";
    page_alteracao.style = "display: none;";
    page_verificacao.style = "display: none;";

    //Criando e inicializando as variáveis.
    var tam = blockchain.length,
        bloco = 0;

    //Exclui todos os elementos da blockchain.
    for(bloco = 0; bloco < tam; bloco++){
        blockchain.pop();
    }

    //Atualizando a visualização dos Blocos.
    att_blocos();
}

//Processo de Expansão dos Blocos.
function expandir(){
    //Determinando como a parte dos blocos será mostrada.
    page_blocos.style = "";
    page_blocos.className = "col-sm-12 text-center py-3 bg-black";
    btn_expandir.style = "display: none;";

    //Determinando o que será mostrado na parte principal.
    page_inclusao.style = "display: none;";
    page_alteracao.style = "display: none;";
    page_verificacao.style = "display: none;";

    //Atualizando a visualização dos Blocos.
    att_blocos();
}

//Processo de Mineração.
function mining(dificuldade, dados){
    //Criando e inicializando as variáveis.
    var nonce = 0,
        res = '';

    //Encontrando um hash que cumpre os requisitos.
    while(true){
        //Gerando o hash dos dados com o nonce;
        res = sha256(dados + nonce);

        //Verificando se o hash gerado cumpre os requisitos de dificuldade,
        //Se cumprir, retorna o hash e o nonce.
        if((res.substring(0, dificuldade).match(/0/g) || []).length == dificuldade){
            return [res, nonce];
        }

        //Incrementando o nonce.
        nonce++;
    }
}

//Processo de Atualização da Visualização dos Blocos.
function att_blocos(){
    //Criando e inicializando as variáveis.
    var tabelas = "",
        bloco = 0;

    //Criando e inicializando as variáveis que formarão o html.
    var part1 = "<button onclick=\"alteracao(",
        part3 = ")\" class=\"btn-table mb-3 p-0 bg-transparent\"><table style=\"word-wrap: break-word; table-layout:fixed;\" class=\"table text-light mb-0\"><thead class=\"thead-light\"><tr><th class=\"py-0 fs-3\">Bloco ",
        part5 = "</th></tr></thead><tbody><tr class=\"bg-dark\"><th class=\"py-1 fs-3\">Hash do Bloco Anterior</th></tr><tr class=\"bg-secondary\"><td class=\"py-1 fs-3\">",
        part7 = "</td></tr><tr class=\"bg-dark\"><th class=\"py-1 fs-3\">Dados</th></tr><tr class=\"bg-secondary\"><td class=\"py-1 fs-3\">",
        part9 = "</td></tr></tbody></table></button>";

    //Montando o html dos blocos.
    for(bloco = 0; bloco < blockchain.length; bloco++){
        tabelas += part1 + blockchain[bloco][0]  + part3 + bloco + part5 + blockchain[bloco][1] + part7 + blockchain[bloco][2] + part9;
    }

    //Mostrando os blocos na tela.
    document.getElementById("table-lateral").innerHTML = tabelas;
}

