$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btcaddespesas", function () {
        //pegar dados da tela
        Despesas_valor = $("#campoVdespesas").val();
        Data_Pagamento = $("#campoVDatapagament").val();
        Data_esperada = $("#campoPagamentoesperado").val();
        Despesas_tipo = $("#campoTdespesa").val();
        idusuario_despesas = $("#campoVdespesas").val();
        // preparar dados no formato json
        var dados = JSON.stringify({Despesas_valor: Despesas_valor, Data_Pagamento: Data_Pagamento, Data_esperada: Data_esperada, Despesas_tipo:Despesas_tipo, idusuario_despesas:idusuario_despesas});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastrar_despesas',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: cadastrar_despesas, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function cadastrar_despesas (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("receita cadastrada com sucesso!");
                location.reload();
                // limpar os campos
                $("#campoVdespesas").val();
                $("#campoVDatapagament").val();
                $("#campoPagamentoesperado").val();
                $("#campoTdespesa").val();
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
    $(document).on("click", "#btEdespesas", function () {
        //pegar dados da tela
        Eiddespesa = $("#campoEiddespesa").val();
        EDdespesa = $("#campoEDdespesa").val();
        EDrecebimento = $("#campoEDrecebimento").val();
        DEResperado = $("#campoDEResperado").val();
        EDRtipo = $("#campoEDRtipo").val();
        // preparar dados no formato json
        var dados = JSON.stringify({Eiddespesa: Eiddespesa, EDdespesa: EDdespesa, EDrecebimento: EDrecebimento, DEResperado:DEResperado, EDRtipo:EDRtipo});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/editar_despesas',
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
                $("#campoEiddespesa").val();
                $("#campoEDdespesa").val();
                $("#campoEDrecebimento").val();
                $("#campoDEResperado").val();
                $("#campoEDRtipo").val();
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
    $(document).on("click", "#btDeldespesas", function () {
        //pegar dados da tela
        deldespesas = $("#campoDeldespesas").val();
        // preparar dados no formato json
        //var deldados = JSON.stringify({delNomeLivro:delNomeLivro});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/deletar_despesas/'+deldespesas,
            type: 'DELETE',
            dataType: 'json', // os dados são recebidos no formato json
            //contentType: 'application/json', // tipo dos dados enviados
            //data: deldados, // estes são os dados enviados
            success: deldespesas1, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function deldespesas1 (retorno_des) {
            if (retorno_des.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("livro deletado com sucesso!");
                location.reload();
                // limpar os campos
            } else {
                // informar mensagem de erro
                alert(retorno_des.resultado + ":" + retorno_des.detalhes);
            }            
        }
        function erroAoIncluir (retorno_des) {
            // informar mensagem de erro
            alert("ERRO: "+retorno_des.resultado + ":" + retorno_des.detalhes);
        }
    });
  });

  $(function() { // quando o documento estiver pronto/carregado
    $.ajax({
        url: 'http://localhost:5000/listar_despesas',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
        }
    });

    function listar (utr) {
        for (var i in utr) { //i vale a posição no vetor
            //linhaFD='<div class="card cores10card col-3">'+
              linha_despesas='<div style="margin: 30px; text-align: justify">'+
                  '<h4 class="card-title"> id da Despesa: ' + utr[i].iddespesas +'</h4>'+
                  '<p class="card-text">Valor da Despesa: R$ '+ utr[i].Despesas_valor + '</p>'+
                  '<p class="card-text">Data de Pagamento: : '+ utr[i].Data_Pagamento + '</p>'+
                  '<p class="card-text">Data de Pagamento Esperado: '+ utr[i].Data_esperada + '</p>'+
                  '<p class="card-text">tipo de despesa: '+ utr[i].Despesas_tipo + '</p>'+
                  '</div>'+
                  '<br>';
              // adiciona a linha no corpo da tabela
              $('#listar_despesas').append(linha_despesas);
        }
    }
});

$(function() { // quando o documento estiver pronto/carregado
    $(document).on("click", "#btDFiltrodata", function () {
        DDatainicial = $("#campoDDatainicial").val();
        DDatafinal = $("#campoDDatafinal").val();
        DFDtipo = $("#campoDFDtipo").val();
        alert(DFDtipo)
        $.ajax({
            url: 'http://localhost:5000/filtroData_despesas',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (ep1) {
            for (var i in ep1) { //i vale a posição no vetor
                //linhaFD='<div class="card cores10card col-3">'+
                if (DFDtipo=="DPagamento"){
                    var date10 = new Date(ep1[i].Data_Pagamento);
                    var Datainicial2C = new Date(DDatainicial);
                    var Datafinal2C = new Date(DDatafinal);
                    if (date10>Datainicial2C && date10<Datafinal2C){
                        linhaFD='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + ep1[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ ep1[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ ep1[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Pagamento Esperado: '+ ep1[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ ep1[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_Dfiltrodata').append(linhaFD);
                    }
                }
                if (DFDtipo=="Desperado"){
                    var date20 = new Date(ep1[i].Data_esperada);
                    var Datainicial1C = new Date(DDatainicial);
                    var Datafinal1C = new Date(DDatafinal);
                    if (date20>Datainicial1C && date20<Datafinal1C){
                        linhaFD='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + ep1[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ ep1[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Pagamento: : '+ ep1[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Pagamento esperada: '+ ep1[i].Data_esperada + '</p>'+
                            '<p class="card-text">Tipo de despesa: '+ ep1[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_Dfiltrodata').append(linhaFD);
                    }
                // adiciona a linha no corpo da tabela
                }
            }
        };
    });
});

//--------------------------------------------------------------------------------------------------------

$(function() { // quando o documento estiver pronto/carregado
    $(document).on("click", "#btFiltrotipodespesas", function () {
        FiltroDesTipo = $("#campoFiltroDespesatipo").val();
        $.ajax({
            url: 'http://localhost:5000/filtroTipo_despesas',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (tipdes) {
            for (var i in tipdes) { //i vale a posição no vetor
                //linhafiltrotipodes='<div class="card cores10card col-3">'+
                if (FiltroDesTipo=="Alimentação"){
                    if (tipdes[i].Despesas_tipo=="Alimentação"){
                        linhafiltrotipodes='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + tipdes[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ tipdes[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ tipdes[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ tipdes[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ tipdes[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipodespesas').append(linhafiltrotipodes);
                    }
                }
                if (FiltroDesTipo=="Educação"){
                    if (tipdes[i].Despesas_tipo=="Educação"){
                        linhafiltrotipodes='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + tipdes[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ tipdes[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ tipdes[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ tipdes[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ tipdes[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipodespesas').append(linhafiltrotipodes);
                    }
                }
                if (FiltroDesTipo=="Lazer"){
                    if (tipdes[i].Despesas_tipo=="Lazer"){
                        linhafiltrotipodes='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + tipdes[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ tipdes[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ tipdes[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ tipdes[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ tipdes[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipodespesas').append(linhafiltrotipodes);
                    }
                }
                if (FiltroDesTipo=="Moradia"){
                    if (tipdes[i].Despesas_tipo=="Moradia"){
                        linhafiltrotipodes='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + tipdes[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ tipdes[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ tipdes[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ tipdes[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ tipdes[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipodespesas').append(linhafiltrotipodes);
                    }
                }
                if (FiltroDesTipo=="Roupa"){
                    if (tipdes[i].Despesas_tipo=="Roupa"){
                        linhafiltrotipodes='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + tipdes[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ tipdes[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ tipdes[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ tipdes[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ tipdes[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipodespesas').append(linhafiltrotipodes);
                    }
                }
                if (FiltroDesTipo=="Saúde"){
                    if (tipdes[i].Despesas_tipo=="Saúde"){
                        linhafiltrotipodes='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + tipdes[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ tipdes[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ tipdes[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ tipdes[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ tipdes[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipodespesas').append(linhafiltrotipodes);
                    }
                }
                if (FiltroDesTipo=="Transporte"){
                    if (tipdes[i].Despesas_tipo=="Transporte"){
                        linhafiltrotipodes='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + tipdes[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ tipdes[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ tipdes[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ tipdes[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ tipdes[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipodespesas').append(linhafiltrotipodes);
                    }
                }
                if (FiltroDesTipo=="Outros"){
                    if (tipdes[i].Despesas_tipo=="Outros"){
                        linhafiltrotipodes='<div style="margin: 30px; text-align: justify">'+
                            '<h4 class="card-title"> id da Receita: ' + tipdes[i].iddespesas +'</h4>'+
                            '<p class="card-text">Valor da Receita: R$ '+ tipdes[i].Despesas_valor + '</p>'+
                            '<p class="card-text">Data de Recebimento: : '+ tipdes[i].Data_Pagamento + '</p>'+
                            '<p class="card-text">Data de Recebimento Esperado: '+ tipdes[i].Data_esperada + '</p>'+
                            '<p class="card-text">Descrição: '+ tipdes[i].Despesas_tipo + '</p>'+
                            '</div>'+
                            '<br>';
                        $('#listar_filtrotipodespesas').append(linhafiltrotipodes);
                    }
                }
            }
        };
    });
});

$(function() { // quando o documento estiver pronto/carregado
    $.ajax({
        url: 'http://localhost:5000/listar_despesatotal',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar_totalDes, // chama a função listar_totalDes para processar o resultado
        error: function() {
        }
    });

    function listar_totalDes (qw1) {
            linLTD='<div style="margin-left: 40%; text-align: left; margin-right: 35%;">'+
                '<h3 class="card-title"> Voce possui um total de ' + qw1.detalhes +' receitas cadastradas</h3>'+
                '</div>'+
                '<br>';
            // adiciona a linha no corpo da tabela
            $('#listar_despesatotal').append(linLTD);
    }
});