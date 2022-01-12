from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
import os
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
caminho = os.path.dirname(os.path.abspath(__file__)) 
arquivobd = os.path.join(caminho, "banco.db") #recebe o caminho do arquivo banco.db
db= SQLAlchemy(app)
lm=LoginManager()
lm.init_app(app)

class Usuario(db.Model):
    idUsuario = db.Column(db.Integer, primary_key=True)
    Nome_usuario=db.Column(db.String)
    Email= db.Column(db.String)
    Senha= db.Column(db.String)
    Saldo= db.Column(db.Integer)
    Status= db.Column(db.String)
    financeira= db.Column(db.String)
    
    @property
    def is_authenticated(self):
        return True
    
    @property
    def is_active(self):
        return True
    
    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.idUsuario)
    
    def __str__(self):
        return f'{str(self.idUsuario)},{self.Nome_usuario}, {self.Email}, {self.Senha}, {self.Saldo}, {self.Status}, {self.financeira}'
    #retorna em string as informaçoes
    def json(self):
        return{
            "idUsuario" : self.idUsuario,
            "Nome_usuario" : self.Nome_usuario,
            "Email" : self.Email,
            "Senha" : self.Senha,
            "Saldo" : self.Saldo,
            "Status" : self.Status,
            "financeira" : self.financeira
            #retorna em join as informaçoes
        }
if __name__=="__main__":#testa as classes
    if os.path.exists(arquivobd):
        os.remove(arquivobd)#remove o banco de dados se existir
        print("foi")
    db.create_all()#cria o banco de dados
    
'''class Receitas(db.Model):
    idreceitas = db.Column(db.Integer, primary_key=True)
    Nome_da_receita=db.Column(db.String)
    Modo_de_preparo= db.Column(db.String)
    Igredientes= db.Column(db.String)
    def __str__(self):
       return f'{str(self.idreceitas)},{self.Nome_da_receita}, {self.Modo_de_preparo}, {self.Igredientes}'
    #retorna em string as informaçoes
    def json(self):
        return{
            "idreceitas" : self.idreceitas,
            "Nome_da_receita": self.Nome_da_receita,
            "Modo_de_preparo" : self.Modo_de_preparo,
            "Igredientes" : self.Igredientes,
            #retorna em join as informaçoes
        }
if __name__=="__main__":#testa as classes
    if os.path.exists(arquivobd):
        os.remove(arquivobd)#remove o banco de dados se existir
        print("foi")
    db.create_all()#cria o banco de dados'''
    