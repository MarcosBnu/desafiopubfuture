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
            success: cadastrar_usuario, // chama a função cadastrar_usuario para processar o resultado
            error: erroAoIncluir
        });
        function cadastrar_usuario (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Conta cadastrada com sucesso!");
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
            success: login_usuario, // chama a função login_usuario para processar o resultado
            error: erroAoIncluir
        });
        function login_usuario (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // redireciona a guia
                window.location.href = 'index.html';
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

$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btEdusuario", function () {
        //pegar dados da tela
        ENome_usuario = $("#campoENome_usuario").val();
        EEmail = $("#campoEEmail").val();
        ESenha = $("#campoESenha").val();
        ESaldo = $("#campoESaldo").val();
        EStatus = $("#campoET_conta").val();
        Efinanceira = $("#campoEfinanceira").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ENome_usuario: ENome_usuario, EEmail: EEmail, ESenha: ESenha, ESaldo:ESaldo, EStatus:EStatus, Efinanceira:Efinanceira});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/editar_usuario',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: editar_usuario, // chama a função editar_usuario para processar o resultado
            error: erroAoIncluir
        });
        function editar_usuario (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("conta alterada com sucesso!");
                location.reload();
                // limpar os campos
                $("#campoENome_usuario").val();
                $("#campoEEmail").val();
                $("#campoESenha").val();
                $("#campoESaldo").val();
                $("#campoET_conta").val();
                $("#campoEfinanceira").val();
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
    $(document).on("click", "#btExcluir", function () {
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/deletar_conta',
            type: 'DELETE',
            dataType: 'json', // os dados são recebidos no formato json
            success: deletar_conta, // chama a função deletar_conta para processar o resultado
            error: erroAoIncluir
        });
        function deletar_conta (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("conta deletada com sucesso!");
                window.location.href = 'login.html';
                // limpar os campos
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

$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: 'http://localhost:5000/lista_contas',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (Usi) {
        // percorrer a lista de Usi retornadas;
        for (var i in Usi) { //i vale a posição no vetor
          //lin='<div class="card cores10card col-3">'+
            lin='<div style="margin: 30px;">'+
                '<h4 class="card-title"> id da conta: ' + Usi[i].id +'</h4>'+
                '<p class="card-text">Nome do Proprietario: '+ Usi[i].Nome_usuario + '</p>'+
                '<p class="card-text">Tipo de Conta: '+ Usi[i].Status + '</p>'+
                '<p class="card-text">Institução Financeira: '+ Usi[i].financeira + '</p>'+
                '</div>'+
                '<br>';
            // adiciona a linha no corpo da tabela
            $('#listar_contas').append(lin);
        }
    }

});

$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btTransferir", function () {
        //pegar dados da tela
        idconta = $("#campoidconta").val();
        Tnome = $("#campoTnome").val();
        Tvalor = $("#campoTvalor").val();
        TSenha = $("#campoTSenha").val();
        EStatus = $("#campoET_conta").val();
        Efinanceira = $("#campoEfinanceira").val();
        // preparar dados no formato json
        var dados = JSON.stringify({idconta: idconta, Tnome: Tnome, Tvalor: Tvalor, TSenha: TSenha});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/transferir_saldo',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: transferir_saldo, // chama a função transferir_saldo para processar o resultado
            error: erroAoIncluir
        });
        function transferir_saldo (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("receita cadastrada com sucesso!");
                location.reload();
                // limpar os campos
                $("#campoidconta").val();
                $("#campoTnome").val();
                $("#campoTvalor").val();
                $("#campoTSenha").val();
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


$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: 'http://localhost:5000/listar_saldo',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
        }
    });

    function listar (uf) {
         {
        lin='<div style="margin-left:42%">'+
            '<h4> Saldo da conta: R$ ' + uf.retornar +'</h4>'+
            '</div>'+
            '<br>';
        // adiciona a linha no corpo da tabela
        $('#listar_saldo').append(lin);
        }
    }
});
$(function() { // quando o documento estiver pronto/carregado
    $(document).on("click", "#btSairlogin", function () {
        $.ajax({
            url: 'http://localhost:5000/Sair_login',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: sairL, // chama a função sairL para processar o resultado
            error: function() {
            }
        });

        function sairL (Lsair) {
            if (Lsair.resultado=="ok"){
                window.location.href = 'login.html';
            }
        }
    });
});
