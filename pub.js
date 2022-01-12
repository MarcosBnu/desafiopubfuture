$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btIncluirreceita", function () {
        //pegar dados da tela
        Nome_da_receita = $("#campoNome_da_receita").val();
        Modo_de_preparo = $("#campoModo_de_preparo").val();
        Igredientes = $("#campoIgredientes").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ Nome_da_receita: Nome_da_receita, Modo_de_preparo: Modo_de_preparo, Igredientes: Igredientes});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_receita',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: incluir_receita, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function incluir_receita (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("receita cadastrada com sucesso!");
                // limpar os campos
                $("#campoNome_da_receita").val();
                $("#campoModo_de_preparo").val();
                $("#campoIgredientes").val();
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
});

$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btAlterar_receita", function () {
        //pegar dados da tela
        idreceita = $("#idreceita").val();
        Campo_alt= $("#idCampo_alt").val();
        Alterasao= $("#idAlterasao").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ Campo_alt:Campo_alt, Alterasao:Alterasao});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/alterar_receita/'+idreceita,
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: alterar_receita, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function alterar_receita (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("login feito cadastrada com sucesso!");
                // limpar os campos
                idreceita = $("#idreceita").val();
                Campo_alt= $("#idCampo_alt").val();
                Alterasao= $("#idAlterasao").val();
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
});