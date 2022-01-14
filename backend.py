from flask_sqlalchemy import SQLAlchemy
from flask import Flask, json, jsonify, request, send_file, session, render_template, redirect, url_for
from sqlalchemy.orm import query
from werkzeug.datastructures import auth_property
#from werkzeug.utils import redirect
from werkzeug.wrappers import response
from flask_cors import CORS
from flask_login import login_user, login_required, current_user
from modelo import *
import os


path = os.path.dirname(os.path.abspath(__file__))

np=[]
@app.route("/")
def padrao():
    return "backend funciona"
@app.route("/teste", methods=["GET"])
def index():
    return render_template('index.html')
@app.route("/cadastrar_usuario", methods=["POST"])
def cadastrar_usuario():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova receita
    dados = request.get_json()  # (force=True) dispensa Content-Type na requisição
    try:  # tentar executar a operação
        nova = Usuario(**dados)  # criar a nova pessoa
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
    dados = request.get_json()
    user = db.session.query(Usuario)\
        .filter(Usuario.Email==dados['VEmail'], Usuario.Senha==dados['VSenha'])\
        .first() #busca no banco de dados as informaçoes
    if user:
        login_user(user, remember=True)
        if user.is_authenticated==True:
            np.append(current_user.id)
            resposta=jsonify({"resultado":"ok", "detalhes":np})
        else:
            resposta=jsonify({"resultado":"erro", "detalhes":"erro"})
        #se cad não for nulo, ele ira retornar os seus valores convertidos em json
    else:
        # informar mensagem de erro
        resposta=jsonify({"resultado":"erro", "detalhes":"erro"})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/editar_usuario", methods=['POST'])
def editar_usuario():
    #busca no banco de dados as informaçoes
    dados = request.get_json() #pego os dados para atualizar
    #objeto=Usuario.query.filter_by(id=).first()
    valor=np[0]
    objeto=Usuario.query.filter_by(id=valor).first()
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a pessoa do ID informado
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
        db.session.add(objeto)
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(valor)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!
@app.route("/deletar_conta", methods=['DELETE'])
def deletar_livro():
    #busca no banco de dados as informaçoes
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
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
    # obter as livros do cadastro
    Usi = db.session.query(Usuario).all()
    # aplicar o método json que a classe livros possui a cada elemento da lista
    livros_em_json = [ x.json() for x in Usi ]
    # converter a lista do python para json
    resposta = jsonify(livros_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...
'''@app.route("/incluir_receita", methods=["POST"])
def incluir_receita():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova receita
    dados = request.get_json()  # (force=True) dispensa Content-Type na requisição
    try:  # tentar executar a operação
        nova = Receitas(**dados)  # criar a nova pessoa
        db.session.add(nova)  # adicionar no BD
        db.session.commit()  # efetivar a operação de gravação
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!

@app.route("/alterar_receita/<int:idreceita>", methods=['POST'])
def alterar_receita(idreceita):
    #busca no banco de dados as informaçoes
    dados = request.get_json() #pego os dados para atualizar
    objeto=Receitas.query.filter_by(idreceitas=idreceita).first()
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a pessoa do ID informado
        if dados["Campo_alt"]=="Nome da receita":
            objeto.Nome_da_receita = dados['Alterasao']
        if dados["Campo_alt"]=="Modo de preparo":
            objeto.Modo_de_preparo = dados['Alterasao']
        if dados["Campo_alt"]=="Igredientes":
            objeto.Igredientes = dados['Alterasao']
        db.session.add(objeto)
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(dados)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!
'''
app.run(debug=True)
