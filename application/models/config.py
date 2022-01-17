from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager, UserMixin
import os
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SECRET_KEY']="secret"
db= SQLAlchemy(app)
lm=LoginManager()
lm.init_app(app)