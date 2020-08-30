var page_inclusao, page_alteracao, page_verificacao, info;

page_inclusao = document.getElementById("page-inclusao");
page_alteracao = document.getElementById("page-alteracao");
page_verificacao = document.getElementById("page-verificacao"),
page_tabelas = document.getElementById("page-tabelas"),
btn_expandir = document.getElementById("expandir");

info = document.getElementById("info");
info_update = document.getElementById("info-update");

var blockchain = [];

function inclusao(){
    page_tabelas.style = "";
    btn_expandir.style = "";
    page_tabelas.className = "col-sm-3 text-center py-3 bg-black";

    page_inclusao.style = "";
    page_alteracao.style = "display: none;";
    page_verificacao.style = "display: none;";

    info.innerHTML = "";
    info.className = "";

    document.getElementById("dificuldade").value = "Selecione";
    document.getElementById("dados").value = "";
}

function incluir(){
    var block = [],
        dificuldade = document.getElementById("dificuldade").value,
        dados = document.getElementById("dados").value;

    if(dificuldade == "Selecione" && dados == ""){
        info.innerHTML = "-Selecione uma dificuldade e Insira algum dado-";
        info.className = "span-h6 text-light bg-danger";
    }
    else if(dificuldade == "Selecione"){
        info.innerHTML = "-Selecione uma dificuldade-";
        info.className = "span-h6 text-light bg-danger";
    }
    else if(dados == ""){
        info.innerHTML = "-Insira algum dado-";
        info.className = "span-h6 text-light bg-danger";
    }
    else{

        block.push(blockchain.length)

        if(blockchain.length == 0){
            block.push(0x00);
            //console.log(block);
        }
        else{
            block.push(blockchain[blockchain.length - 1][3]);
            //console.log(block);
        }
    
        block.push(dados);

        var mining_values;

        mining_values = mining(dificuldade, dados);

        block.push(mining_values[0]);
    
        block.push(dificuldade);

        block.push(mining_values[1]);

        blockchain.push(block);
    
        console.log(blockchain);

        info.innerHTML = "-Incluído com sucesso-";
        info.className = "span-h6 text-light bg-success";

        att_table();
    }

    //console.log(dificuldade);
    //console.log(dados);

}

function alteracao(bloco){
    page_tabelas.style = "";
    btn_expandir.style = "";
    page_tabelas.className = "col-sm-3 text-center py-3 bg-black";

    page_inclusao.style = "display: none;";
    page_alteracao.style = "";
    page_verificacao.style = "display: none;";

    info_update.innerHTML = "";
    info_update.className = "";

    var n_bloco = document.getElementById("n-bloco-update"),
        hash_anterior_group = document.getElementById("hash-anterior-group"),
        hash_anterior = document.getElementById("hash-anterior"),
        dificuldade_update = document.getElementById("dificuldade-update"),
        dados_update = document.getElementById("dados-update");
    
/*
    if(typeof(bloco) == 'undefined'){
        n_bloco.value = '';
        n_bloco.disabled = false;

        //hash_anterior.value = '';
        //hash_anterior.disabled = false;
        hash_anterior_group.style = "display: none;";

        dados_update.value = '';
    }
    else{
*/

    n_bloco.value = blockchain[bloco][0];
    n_bloco.disabled = true;

    hash_anterior.value = blockchain[bloco][1];
    hash_anterior.disabled = true;
    hash_anterior_group.style = "";

    dificuldade_update.value = blockchain[bloco][4];

    dados_update.value = blockchain[bloco][2];


//    }

}

function alterar(){
    var n_bloco = document.getElementById("n-bloco-update").value,
        dados_update = document.getElementById("dados-update").value;
        dificuldade_update = document.getElementById("dificuldade-update").value;

    if(dados_update == ""){
        info_update.innerHTML = "-Insira algum dado-";
        info_update.className = "span-h6 text-light bg-danger";
    }
    else{
        info_update.innerHTML = "-Alterado com sucesso-";
        info_update.className = "span-h6 text-light bg-success";

        var mining_values;

        mining_values = mining(dificuldade_update, dados_update)

        blockchain[n_bloco][2] = dados_update;
        blockchain[n_bloco][3] = mining_values[0];
        blockchain[n_bloco][4] = dificuldade_update;
        blockchain[n_bloco][5] = mining_values[1];

        att_table();

    }
}

function verificar(){
    page_inclusao.style = "display: none;";
    page_alteracao.style = "display: none;";
    page_verificacao.style = "";

    page_tabelas.style = "";
    btn_expandir.style = "";
    page_tabelas.className = "col-sm-3 text-center py-3 bg-black";

    var integridade = document.getElementById("integridade");


    var block;

    if(blockchain.length == 0 || blockchain.length == 1){
        integridade.className = "span-h3 bg-success";
        integridade.innerHTML = "Integridade Confirmada";
        console.log("Right_1")
    }
    else{
        for(block = 0; block < blockchain.length - 1; block++){
            if(sha256(blockchain[block][2] + blockchain[block][5]) != blockchain[block + 1][1])
                break;
        }

        if(block != blockchain.length - 1){
            var item;

            for(item = blockchain.length - 1; item >= block; item--){
                blockchain.pop();
            }

            integridade.className = "span-h3 bg-danger";
            integridade.innerHTML = "Integridade Violada no Bloco " + block + "<br>Todos os blocos após a violação foram exluídos";
            
            console.log("Wrong_1")

            att_table();

        }

        else{
            integridade.className = "span-h3 bg-success";
            integridade.innerHTML = "Integridade Confirmada";
            console.log("Right_2")
        }
    }


}

function limpar(){
    page_tabelas.style = "display: none;";
    btn_expandir.style = "display: none;";
    page_tabelas.className = "col-sm-12 text-center py-3 bg-black";

    page_inclusao.style = "display: none;";
    page_alteracao.style = "display: none;";
    page_verificacao.style = "display: none;";

    var tam,
        block;

    tam = blockchain.length;

    for(block = 0; block < tam; block++){
        blockchain.pop();
    }
}

function expandir(){
    page_tabelas.style = "";
    btn_expandir.style = "display: none;";
    page_tabelas.className = "col-sm-12 text-center py-3 bg-black";

    page_inclusao.style = "display: none;";
    page_alteracao.style = "display: none;";
    page_verificacao.style = "display: none;";
}

function mining(dificuldade, dados){
    var nonce = 0,
        res = '';

    while(true){
        res = sha256(dados + nonce);

        if((res.substring(0, dificuldade).match(/0/g) || []).length == dificuldade){
            return [res, nonce];
        }

        nonce++;
    }
}

att_table();

function att_table(){

    //var part1 = "<a href=\"!#\" style=\"color: transparent\"><table style=\"word-wrap: break-word; table-layout:fixed;\" class=\"table text-light\"><thead class=\"thead-light\"><tr><th class=\"py-0 fs-3\">Bloco ";
    var part1 = "<button onclick=\"alteracao(";

    var part3 = ")\" class=\"btn-table mb-3 p-0 bg-transparent\"><table style=\"word-wrap: break-word; table-layout:fixed;\" class=\"table text-light mb-0\"><thead class=\"thead-light\"><tr><th class=\"py-0 fs-3\">Bloco ";
    //n_bloco
    var part5 = "</th></tr></thead><tbody><tr class=\"bg-dark\"><th class=\"py-1 fs-3\">Hash do Bloco Anterior</th></tr><tr class=\"bg-secondary\"><td class=\"py-1 fs-3\">";
    //hash_antigo
    var part7 = "</td></tr><tr class=\"bg-dark\"><th class=\"py-1 fs-3\">Dados</th></tr><tr class=\"bg-secondary\"><td class=\"py-1 fs-3\">";
    //dados
    var part9 = "</td></tr></tbody></table></button>"

    var tabela = "",
        block = 0;

    for(block = 0; block < blockchain.length; block++){
        tabela += part1 + blockchain[block][0]  + part3 + block + part5 + blockchain[block][1] + part7 + blockchain[block][2] + part9;
    }

    document.getElementById("tabela-lateral").innerHTML = tabela;
}

//[0 - n_bloco][1 - hash_anterior][2 - dados][3 - hash_atual][4 - dificuldade][5 - nonce]

//Alterar algo quando coloca mouse na tabela

