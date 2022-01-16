$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btcadreceita", function () {
        //pegar dados da tela
        Receita = $("#campoRreceita").val();
        Recebimento = $("#campoRrecebimento").val();
        Esperado = $("#campoResperado").val();
        Descrição = $("#campoRdesc").val();
        Tipo_de_Receita = $("#campoRtipo").val();
        idusuario = $("#campoRreceita").val();
        // preparar dados no formato json
        var dados = JSON.stringify({Receita: Receita, Recebimento: Recebimento, Esperado: Esperado, Descrição:Descrição, Tipo_de_Receita:Tipo_de_Receita, idusuario:idusuario});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastrar_receita',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: cadastrar_receita, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function cadastrar_receita (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("receita cadastrada com sucesso!");
                location.reload();
                // limpar os campos
                $("#campoRreceita").val();
                $("#campoRrecebimento").val();
                $("#campoResperado").val();
                $("#campoRdesc").val();
                $("#campoRtipo").val();
                $("#campoRreceita").val();
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
    $(document).on("click", "#btEdreceita", function () {
        //pegar dados da tela
        Eidreceita = $("#campoEidreceita").val();
        Ereceita = $("#campoERreceita").val();
        Erecebimento = $("#campoERrecebimento").val();
        Eesperado = $("#campoEResperado").val();
        Edesc = $("#campoERdesc").val();
        Etipo = $("#campoERtipo").val();
        // preparar dados no formato json
        var dados = JSON.stringify({Eidreceita: Eidreceita, Ereceita: Ereceita, Erecebimento: Erecebimento, Eesperado:Eesperado, Edesc:Edesc, Etipo:Etipo});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/editar_receita',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: editar_usuario, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function editar_usuario (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("receita cadastrada com sucesso!");
                location.reload();
                // limpar os campos
                $("#campoEidreceita").val();
                $("#campoERreceita").val();
                $("#campoERrecebimento").val();
                $("#campoEResperado").val();
                $("#campoERdesc").val();
                $("#campoERtipo").val();
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
    $(document).on("click", "#btDelreceita", function () {
        //pegar dados da tela
        delreceita = $("#campoDelreceita").val();
        // preparar dados no formato json
        //var deldados = JSON.stringify({delNomeLivro:delNomeLivro});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/deletar_receita/'+delreceita,
            type: 'DELETE',
            dataType: 'json', // os dados são recebidos no formato json
            //contentType: 'application/json', // tipo dos dados enviados
            //data: deldados, // estes são os dados enviados
            success: delreceita1, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function delreceita1 (retorno_cad) {
            if (retorno_cad.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("livro deletado com sucesso!");
                location.reload();
                // limpar os campos
            } else {
                // informar mensagem de erro
                alert(retorno_cad.resultado + ":" + retorno_cad.detalhes);
            }            
        }
        function erroAoIncluir (retorno_cad) {
            // informar mensagem de erro
            alert("ERRO: "+retorno_cad.resultado + ":" + retorno_cad.detalhes);
        }
    });
  });

  $(function() { // quando o documento estiver pronto/carregado
    $.ajax({
        url: 'http://localhost:5000/listar_receita',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
        }
    });

    function listar (Usi) {
        for (var i in Usi) { //i vale a posição no vetor
            //lin='<div class="card cores10card col-3">'+
              lin='<div style="margin: 30px; text-align: justify">'+
                  '<h4 class="card-title"> id da Receita: ' + Usi[i].idreceita +'</h4>'+
                  '<p class="card-text">Valor da Receita: R$ '+ Usi[i].Receita + '</p>'+
                  '<p class="card-text">Data de Recebimento: : '+ Usi[i].Recebimento + '</p>'+
                  '<p class="card-text">Data de Recebimento Esperado: '+ Usi[i].Esperado + '</p>'+
                  '<p class="card-text">Descrição: '+ Usi[i].Descrição + '</p>'+
                  '<p class="card-text">Tipo de Receita: '+ Usi[i].Tipo_de_Receita + '</p>'+
                  '</div>'+
                  '<br>';
              // adiciona a linha no corpo da tabela
              $('#listar_receita').append(lin);
        }
    }
});

$(function() { // quando o documento estiver pronto/carregado
    $(document).on("click", "#btFiltrodata", function () {
        Datainicial = $("#campoDatainicial").val();
        Datafinal = $("#campoDatafinal").val();
        FDtipo = $("#campoFDtipo").val();
        $.ajax({
            url: 'http://localhost:5000/filtroData_receita',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (fd1) {
            for (var i in fd1) { //i vale a posição no vetor
                //lin='<div class="card cores10card col-3">'+
                if (FDtipo=="receber"){
                    var date1 = new Date(fd1[i].Recebimento);
                    var Datainicial2 = new Date(Datainicial);
                    var Datafinal2 = new Date(Datafinal);
                    if (date1>Datainicial2 && date1<Datafinal2){
                        lin='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + fd1[i].idreceita +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ fd1[i].Receita + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ fd1[i].Recebimento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ fd1[i].Esperado + '</p>'+
                            '<p class="card-text">Descrição: '+ fd1[i].Descrição + '</p>'+
                            '<p class="card-text">Tipo de Receita: '+ fd1[i].Tipo_de_Receita + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrodata').append(lin);
                    }
                }
                if (FDtipo=="esperado"){
                    var date2 = new Date(fd1[i].Esperado);
                    var Datainicial1 = new Date(Datainicial);
                    var Datafinal1 = new Date(Datafinal);
                    if (date2>Datainicial1 && date2<Datafinal1){
                        lin='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + fd1[i].idreceita +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ fd1[i].Receita + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ fd1[i].Recebimento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ fd1[i].Esperado + '</p>'+
                            '<p class="card-text">Descrição: '+ fd1[i].Descrição + '</p>'+
                            '<p class="card-text">Tipo de Receita: '+ fd1[i].Tipo_de_Receita + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrodata').append(lin);
                    }
                // adiciona a linha no corpo da tabela
                }
            }
        };
    });
});

$(function() { // quando o documento estiver pronto/carregado
    $(document).on("click", "#btLimp", function () {
        $.ajax({
            url: 'http://localhost:5000/limpar_receita',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: limpar_r, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function limpar_r (resposta) {
            if (resposta.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                location.reload();
        }
    }
    });
});

$(function() { // quando o documento estiver pronto/carregado
    $(document).on("click", "#btFiltrotipo", function () {
        Ftipo = $("#campoFtipo").val();
        $.ajax({
            url: 'http://localhost:5000/filtroData_receita',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (fq) {
            for (var i in fq) { //i vale a posição no vetor
                //lin='<div class="card cores10card col-3">'+
                if (Ftipo=="Salário"){
                    if (fq[i].Tipo_de_Receita=="Salário"){
                        lin='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + fq[i].idreceita +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ fq[i].Receita + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ fq[i].Recebimento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ fq[i].Esperado + '</p>'+
                            '<p class="card-text">Descrição: '+ fq[i].Descrição + '</p>'+
                            '<p class="card-text">Tipo de Receita: '+ fq[i].Tipo_de_Receita + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipo').append(lin);
                    }
                }
                if (Ftipo=="Presente"){
                    if (fq[i].Tipo_de_Receita=="Presente"){
                        lin='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + fq[i].idreceita +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ fq[i].Receita + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ fq[i].Recebimento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ fq[i].Esperado + '</p>'+
                            '<p class="card-text">Descrição: '+ fq[i].Descrição + '</p>'+
                            '<p class="card-text">Tipo de Receita: '+ fq[i].Tipo_de_Receita + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipo').append(lin);
                    }
                }
                if (Ftipo=="Premio"){
                    if (fq[i].Tipo_de_Receita=="Premio"){
                        lin='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + fq[i].idreceita +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ fq[i].Receita + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ fq[i].Recebimento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ fq[i].Esperado + '</p>'+
                            '<p class="card-text">Descrição: '+ fq[i].Descrição + '</p>'+
                            '<p class="card-text">Tipo de Receita: '+ fq[i].Tipo_de_Receita + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipo').append(lin);
                    }
                }
                if (Ftipo=="Outros"){
                    if (fq[i].Tipo_de_Receita=="Outros"){
                        lin='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + fq[i].idreceita +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ fq[i].Receita + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ fq[i].Recebimento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ fq[i].Esperado + '</p>'+
                            '<p class="card-text">Descrição: '+ fq[i].Descrição + '</p>'+
                            '<p class="card-text">Tipo de Receita: '+ fq[i].Tipo_de_Receita + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipo').append(lin);
                    }
                }
            }
        };
    });
});

$(function() { // quando o documento estiver pronto/carregado
    $.ajax({
        url: 'http://localhost:5000/listar_receitatotal',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
        }
    });

    function listar (qw) {
            lin='<div style="margin-left: 40%; text-align: left; margin-right: 35%;">'+
                '<h3 class="card-title"> Voce possui um total de ' + qw.detalhes +' receitas cadastradas</h3>'+
                '</div>'+
                '<br>';
            // adiciona a linha no corpo da tabela
            $('#listar_receitatotal').append(lin);
    }
});
