from flask_sqlalchemy import SQLAlchemy
from flask import Flask, json, jsonify, request
from flask_cors import CORS
from flask_login import login_user, current_user
from modelo import *
import os


path = os.path.dirname(os.path.abspath(__file__))
retorno_receita=[]
np=[]
@app.route("/cadastrar_usuario", methods=["POST"])
def cadastrar_usuario():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova conta
    dados = request.get_json()# (force=True) dispensa Content-Type na requisição
    if dados["Nome_usuario"]=="" or dados["Email"]=="" or dados["Senha"]=="" or dados["Saldo"]=="" or dados["Status"]=="" or dados["financeira"]=="":
        #verifica se o usuario não deixou nem um campo em branco
        resposta = jsonify({"resultado": "erro", "detalhes": "preencha todos os campos"})
        return resposta        
    try:  # tentar executar a operação
        nova = Usuario(**dados)  # criar a nova conta
        db.session.add(nova)  # adicionar no BD
        db.session.commit()  # efetivar a operação de gravação
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!

@app.route("/login_usuario", methods=["GET", "POST"])
def login_usuario():#função para o usuario logar
    dados = request.get_json() # receber as informações 
    np.clear() #limpa a lista
    user = db.session.query(Usuario)\
        .filter(Usuario.Email==dados['VEmail'], Usuario.Senha==dados['VSenha'])\
        .first() #busca no banco de dados as informaçoes
    if user:
        login_user(user, remember=True)
        if user.is_authenticated==True:#se o login foi feito
            np.append(current_user.id)#coloca na lista o valor da id do usuario, valor necessario para rodar as outras rotas
            resposta=jsonify({"resultado":"ok", "detalhes":np})#mensagem de Ok
        else:
            resposta=jsonify({"resultado":"erro", "detalhes":"erro"})#informa a mensagem de erro
    else:
        # informar mensagem de erro
        resposta=jsonify({"resultado":"erro", "detalhes":"erro"})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/editar_usuario", methods=['POST'])
def editar_usuario():
    dados = request.get_json() #pego os dados para atualizar
    valor=np[0]#recebe a id do usuario logado
    objeto=Usuario.query.filter_by(id=valor).first()#busca no banco de dados as informaçoes do usuario logado
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})#mensagem positiva
    try:
        #os if a baixo verifica o que o usuario deseja alterar
        if dados["ENome_usuario"]!="":
            objeto.Nome_usuario = dados['ENome_usuario']
        if dados["EEmail"]!="":
            objeto.Email = dados['EEmail']
        if dados["ESenha"]!="":
            objeto.Senha = dados['ESenha']
        if dados["ESaldo"]!="":
            objeto.Saldo = dados['ESaldo']
        if dados["EStatus"]!="":
            objeto.Status = dados['EStatus']
        if dados["Efinanceira"]!="":
            objeto.financeira = dados['Efinanceira']
        db.session.add(objeto)#salva as alterações no banco
        db.session.commit()#confirma as alterações
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(valor)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!
@app.route("/deletar_conta", methods=['DELETE'])
def deletar_livro():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})#resposta positiva
    try:
        # excluir a pessoa do ID informado
        Usuario.query.filter_by(id=np[0]).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/lista_contas")
def lista_contas():
    # obter as contas cadastradas
    Usi = db.session.query(Usuario).all()
    # aplicar o método json que a classe livros possui a cada elemento da lista
    livros_em_json = [ x.json() for x in Usi ]
    # converter a lista do python para json
    resposta = jsonify(livros_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/transferir_saldo", methods=['POST'])
def transferir_saldo():
    dados = request.get_json() #pego os dados para atualizar
    valor=np[0]#valor da id do usuario cadastrado
    User_logado=Usuario.query.filter_by(id=valor).first()
    User_deslogado=Usuario.query.filter_by(id=dados["idconta"]).first()
    try:
        obj=User_logado.Saldo
        obj=int(obj)
        obj1=User_deslogado.Saldo
        obj1=int(obj1)
        if valor!=User_deslogado.id:
            if User_logado.Senha==dados["TSenha"]:#verifica se a senha do usuario esta correta
                if User_deslogado.Nome_usuario==dados["Tnome"]:#verifica se o nome do usuario que ira receber o saldo esta correto
                    if obj>=int(dados["Tvalor"]):#verifica se o usuario possui saldo suficiente
                        obj2=obj-int(dados["Tvalor"])
                        User_logado.Saldo=obj2
                        obj3=obj1+int(dados["Tvalor"])
                        User_deslogado.Saldo=obj3
                        db.session.add(User_logado)
                        db.session.add(User_deslogado)
                        #salva as alteracoes no banco
                        db.session.commit() #confirma as alteraçoes
                        resposta = jsonify({"resultado": "ok", "detalhes": str(dados["Tvalor"])})
                    else:
                        resposta = jsonify({"resultado":"erro", "detalhes":"seu saldo é insuficiente amigo, tenta conseguir um emprego na publica para aumentar esse salario ai"})
                else:
                    resposta = jsonify({"resultado":"erro", "detalhes":str(dados["Tnome"])})
            else:
                resposta = jsonify({"resultado":"erro", "detalhes":"Senha errada"})
        else:
            resposta = jsonify({"resultado":"erro", "detalhes":"Voce não pode transferir saldo para sí mesmo"})
            
            
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(valor)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!
@app.route("/listar_saldo")
def listar_saldo():
    valor=np[0]#valor da id do usuario cadastrado
    idsaldo=Usuario.query.filter_by(id=valor).first() #recebe as informaçoes do usuario logado
    retornar=idsaldo.Saldo#recebe o saldo do usuario logado
    resposta = jsonify({"retornar":str(retornar)})
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/cadastrar_receita", methods=["POST"])
def cadastrar_receita():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova receita
    dados = request.get_json()# (force=True) dispensa Content-Type na requisição
    valor=np[0]#valor da id do usuario cadastrado
    valor=int(valor)
    dados["idusuario"]=valor
    if dados["Receita"]=="" or dados["Recebimento"]=="" or dados["Esperado"]=="" or dados["Descrição"]=="" or dados["Tipo_de_Receita"]=="" or dados["idusuario"]=="":
        resposta = jsonify({"resultado": "erro", "detalhes": "preencha todos os campos"})
        return resposta        
    try:  # tentar executar a operação
        nova = Receita(**dados)  # criar a nova receita
        db.session.add(nova)  # adicionar no BD
        db.session.commit()  # efetivar a operação de gravação
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!

@app.route("/editar_receita", methods=['POST'])
def editar_receita():
    dados = request.get_json() #pego os dados para atualizar
    dif=dados["Eidreceita"]
    dif=int(dif)
    objeto=Receita.query.filter_by(idreceita=dif).first()
    try:
        if objeto.idusuario == np[0]:#verifica se a receita é do usuario logado
            if dados["Ereceita"]!="":
                objeto.Receita = dados['Ereceita']
            if dados["Erecebimento"]!="":
                objeto.Recebimento = dados['Erecebimento']
            if dados["Eesperado"]!="":
                objeto.Esperado = dados['Eesperado']
            if dados["Edesc"]!="":
                objeto.Descrição = dados['Edesc']
            if dados["Etipo"]!="":
                objeto.Tipo_de_Receita = dados['Etipo']
            db.session.add(objeto)#add no banco de dados
            db.session.commit()#confirma as alteraçoes
            resposta = jsonify({"resultado":"ok", "detalhes":"receita alterada"})
        else:
            resposta = jsonify({"resultado":"erro", "detalhes":"essa receita não pertence a voce"})       
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/deletar_receita/<int:delreceita>", methods=['DELETE'])
def deletar_receita(delreceita):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    valor=np[0]
    #busca no banco de dados as informaçoes
    delR=Receita.query.filter_by(idreceita=delreceita).first()
    try:
        if delR.idusuario==valor:
            # excluir a receita do ID informado
            Receita.query.filter(Receita.idreceita == delreceita).delete()
            # confirmar a exclusão
            db.session.commit()
        else:
            resposta = jsonify({"resultado": "erro", "detalhes": "Essa receita não é sua"})
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/listar_receita")
def listar_receita():
    # obter as receitas cadastradas
    valor=np[0]
    Usi = db.session.query(Receita).filter_by(idusuario=valor).all()
    # aplicar o método json que a classe Receita possui a cada elemento da lista
    retorno_receita = ([x.jsonn() for x in Usi])
    # converter a lista do python para json
    resposta = jsonify(retorno_receita)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...
@app.route("/filtroData_receita")
def filtroData_receita():
    # obter as livros do cadastro
    valor=np[0]
    # obter as receitas cadastradas do usuario
    fd = db.session.query(Receita).filter_by(idusuario=valor).all()
    # aplicar o método json que a classe Receita possui a cada elemento da lista
    filtroD_receita = ([x.jsonn() for x in fd])
    # converter a lista do python para json
    resposta = jsonify(filtroD_receita)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/limpar_receita")
def limpar_receita():
    resposta = jsonify({"resultado":"ok", "detalhes":"ok"})
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/filtroTipo_receita")
def filtroTipo_receita():
    # obter as livros do cadastro
    valor=np[0]
    fq = db.session.query(Receita).filter_by(idusuario=valor).all() # obter as receitas cadastradas pelo usuario
    # aplicar o método json que a classe livros possui a cada elemento da lista
    filtrotipo_receita = ([x.jsonn() for x in fq])
    # converter a lista do python para json
    resposta = jsonify(filtrotipo_receita)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/listar_receitatotal")
def listar_receitatotal():
    valor=np[0]
    qw = db.session.query(Receita).filter_by(idusuario=valor).count() #pega o numero de receitas cadastradas pelo usuario
    # converter a lista do python para json
    resposta = jsonify({"resultado":"ok", "detalhes": str(qw)})
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/cadastrar_despesas", methods=["POST"])
def cadastrar_despesas():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova despesa
    dados = request.get_json()# (force=True) dispensa Content-Type na requisição
    valor=np[0]
    valor=int(valor)
    dados["idusuario_despesas"]=valor
    if dados["Despesas_valor"]=="" or dados["Data_Pagamento"]=="" or dados["Data_esperada"]=="" or dados["Despesas_tipo"]=="" or dados["idusuario_despesas"]=="":
        resposta = jsonify({"resultado": "erro", "detalhes": "preencha todos os campos"})
        return resposta        
    try:  # tentar executar a operação
        nova = Despesas(**dados)  # criar a nova despesa
        db.session.add(nova)  # adicionar no BD
        db.session.commit()  # efetivar a operação de gravação
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": str(dados)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!
@app.route("/editar_despesas", methods=['POST'])
def editar_despesas():
    dados = request.get_json() #pego os dados para atualizar
    des=dados["Eiddespesa"]
    des=int(des)
    objeto=Despesas.query.filter_by(iddespesas=des).first()
    try:
        if objeto.idusuario_despesas == np[0]:
            if dados["EDdespesa"]!="":
                objeto.Despesas_valor = dados['EDdespesa']
            if dados["EDrecebimento"]!="":
                objeto.Data_Pagamento = dados['EDrecebimento']
            if dados["DEResperado"]!="":
                objeto.Data_esperada = dados['DEResperado']
            if dados["EDRtipo"]!="":
                objeto.Despesas_tipo = dados['EDRtipo']
            db.session.add(objeto)
            db.session.commit()
            resposta = jsonify({"resultado":"ok", "detalhes":"receita alterada"})
        else:
            resposta = jsonify({"resultado":"erro", "detalhes":"essa receita não pertence a voce"})       
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(dados)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/deletar_despesas/<int:deldespesas>", methods=['DELETE'])
def deletar_despesas(deldespesas):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    valor=np[0]#recebe a id do usuario logado
    delD=Despesas.query.filter_by(iddespesas=deldespesas).first()#busca no banco de dados o que voce deseja excluir
    try:
        if delD.idusuario_despesas==valor:
            Despesas.query.filter(Despesas.iddespesas == deldespesas).delete() # excluir a pessoa do ID informado
            # confirmar a exclusão
            db.session.commit()
        else:
            resposta = jsonify({"resultado": "erro", "detalhes": "Essa receita não é sua"})
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/listar_despesas")
def listar_despesas():
    # obter as livros do cadastro
    valor=np[0]#id do usuario logado
    Usi = db.session.query(Despesas).filter_by(idusuario_despesas=valor).all() # obter as despesas cadastradas pelo usuario
    # aplicar o método json que a classe livros possui a cada elemento da lista
    retorno_Despesas = ([x.jsonnn() for x in Usi])
    # converter a lista do python para json
    resposta = jsonify(retorno_Despesas)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...
@app.route("/filtroData_despesas")
def filtroData_despesas():
    valor=np[0]
    fd = db.session.query(Despesas).filter_by(idusuario_despesas=valor).all()# obter as despesas cadastradas pelo usuario
    # aplicar o método json que a classe livros possui a cada elemento da lista
    filtroD_Despesas = ([x.jsonnn() for x in fd])
    # converter a lista do python para json
    resposta = jsonify(filtroD_Despesas)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar..
@app.route("/filtroTipo_despesas")
def filtroTipo_despesas():
    valor=np[0]
    fq = db.session.query(Despesas).filter_by(idusuario_despesas=valor).all()# obter as despesas cadastradas pelo usuario
    # aplicar o método json que a classe livros possui a cada elemento da lista
    filtroTipo_despesas1 = ([x.jsonnn() for x in fq])
    # converter a lista do python para json
    resposta = jsonify(filtroTipo_despesas1)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...
@app.route("/listar_despesatotal")
def listar_despesatotal():
    valor=np[0]
    qw1 = db.session.query(Despesas).filter_by(idusuario_despesas=valor).count() # obter o numero de despesas cadastradas pelo usuario
    # converter a lista do python para json
    resposta = jsonify({"resultado":"ok", "detalhes": str(qw1)})
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...
app.run(debug=True)
