from flask_sqlalchemy import SQLAlchemy
from flask import Flask, json, jsonify, request, send_file, session
from werkzeug.wrappers import response
from flask_cors import CORS
from flask_login import login_user
from modelo import *
import os
import random

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
path = os.path.dirname(os.path.abspath(__file__))
@app.route("/")
def padrao():
    return "backend funciona"
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
@app.route("/login_usuario", methods=["POST"])
def login_usuario():#função para o usuario logar
    dados = request.get_json()
    Cad = db.session.query(Usuario)\
        .filter(Usuario.Email==dados['VEmail'], Usuario.Senha==dados['VSenha'])\
        .first() #busca no banco de dados as informaçoes
    if Cad:
        login_user(Cad)
        resposta=jsonify({"resultado":"ok", "detalhes":Cad.json()})
        #se cad não for nulo, ele ira retornar os seus valores convertidos em json
    else:
        # informar mensagem de erro
        resposta=jsonify({"resultado":"erro", "detalhes": "Nao encontrado"})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta
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
