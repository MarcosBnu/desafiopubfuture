from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager, UserMixin
import os
from models.config import *

caminho = os.path.dirname(os.path.abspath(__file__)) 
arquivobd = os.path.join(caminho, "banco.db") #recebe o caminho do arquivo banco.db




@lm.user_loader 
def load_user(user_id): 
    return Usuario.query.filter(Usuario.id == int(user_id)).first()

class Usuario(db.Model, UserMixin):#cria a tabela usuario
    #cria as colunas
    id = db.Column(db.Integer, primary_key=True)
    Nome_usuario=db.Column(db.String, nullable=False)
    Email= db.Column(db.String, unique=True, nullable=False)
    Senha= db.Column(db.String, nullable=False)
    Saldo= db.Column(db.Integer, nullable=False)
    Status= db.Column(db.String, nullable=False)
    financeira= db.Column(db.String, nullable=False)

    def __str__(self):
        return f'{str(self.id)},{self.Nome_usuario}, {self.Email}, {self.Senha}, {self.Saldo}, {self.Status}, {self.financeira}'
    #retorna em string as informaçoes
    def json(self):
        return{
            "id" : self.id,
            "Nome_usuario" : self.Nome_usuario,
            "Email" : self.Email,
            "Senha" : self.Senha,
            "Saldo" : self.Saldo,
            "Status" : self.Status,
            "financeira" : self.financeira
            #retorna em join as informaçoes
        }
        
class Receita(db.Model):#cria a tabela Receitas
    #cria as colunas
    idreceita = db.Column(db.Integer, primary_key=True)
    Receita=db.Column(db.Integer, nullable=False)
    Recebimento=db.Column(db.String, nullable=False)
    Esperado= db.Column(db.String, nullable=False)
    Descrição= db.Column(db.String, nullable=False)
    Tipo_de_Receita= db.Column(db.String, nullable=False)
    idusuario = db.Column(db.Integer, db.ForeignKey(Usuario.id), nullable= False)
    usuario1 = db.relationship("Usuario", foreign_keys =  idusuario)
    def __str__(self):
        return f'{str(self.idreceita)}, {self.Receita}, {self.Recebimento}, {self.Esperado}, {self.Descrição}, {self.Tipo_de_Receita}, {self.idusuario}'
    #retorna em string as informaçoes
    def jsonn(self):
        return{
            "idreceita" : self.idreceita,
            "Receita" : self.Receita,
            "Recebimento" : self.Recebimento,
            "Esperado" : self.Esperado,
            "Descrição" : self.Descrição,
            "Tipo_de_Receita" : self.Tipo_de_Receita,
            "idusuario" : self.idusuario
            #retorna em join as informaçoes
        }

class Despesas(db.Model):#cria a tabela Despesas
    #cria as colunas
    iddespesas = db.Column(db.Integer, primary_key=True)
    Despesas_valor=db.Column(db.Integer, nullable=False)
    Data_Pagamento=db.Column(db.String, nullable=False)
    Data_esperada= db.Column(db.String, nullable=False)
    Despesas_tipo= db.Column(db.String, nullable=False)
    idusuario_despesas = db.Column(db.Integer, db.ForeignKey(Usuario.id), nullable= False)
    usuario = db.relationship("Usuario", foreign_keys =  idusuario_despesas)
    
    def __str__(self):
        return f'{str(self.iddespesas)}, {self.Despesas_valor}, {self.Data_Pagamento}, {self.Data_esperada}, {self.Despesas_tipo}, {self.idusuario_despesas}'
    #retorna em string as informaçoes
    def jsonnn(self):
        return{
            "iddespesas" : self.iddespesas,
            "Despesas_valor" : self.Despesas_valor,
            "Data_Pagamento" : self.Data_Pagamento,
            "Data_esperada" : self.Data_esperada,
            "Despesas_tipo" : self.Despesas_tipo,
            "idusuario_despesas" : self.idusuario_despesas,
            #retorna em join as informaçoes
        }
        
if __name__=="__main__":#testa as classes
    if os.path.exists(arquivobd):
        os.remove(arquivobd)#remove o banco de dados se existir
        print("foi")
    db.create_all()#cria o banco de dados
    
    