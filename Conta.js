$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btCadusuario", function () {
        //pegar dados da tela
        Nome_usuario = $("#campoNome_usuario").val();
        Email = $("#campoEmail").val();
        Senha = $("#campoSenha").val();
        Saldo = $("#campoSaldo").val();
        Status = $("#campoT_conta").val();
        financeira = $("#campofinanceira").val();
        // preparar dados no formato json
        var dados = JSON.stringify({Nome_usuario: Nome_usuario, Email: Email, Senha: Senha, Saldo:Saldo, Status:Status, financeira:financeira});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastrar_usuario',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: cadastrar_usuario, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function cadastrar_usuario (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("receita cadastrada com sucesso!");
                // limpar os campos
                $("#campoNome_usuario").val();
                $("#campoEmail").val();
                $("#campoSenha").val();
                $("#campoSaldo").val();
                $("#campoT_conta").val();
                $("#campofinanceira").val();
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
    $(document).on("click", "#btLoginusuario", function () {
        //pegar dados da tela
        VEmail = $("#campoVEmail").val();
        VSenha = $("#campoVSenha").val();
        // preparar dados no formato json
        var dados = JSON.stringify({VEmail: VEmail, VSenha: VSenha});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/login_usuario',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: login_usuario, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function login_usuario (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("login cadastrada com sucesso!");
                // limpar os campos
                $("#campoVEmail").val();
                $("#campoVSenha").val();
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