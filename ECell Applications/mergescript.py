from flask_sqlalchemy import SQLAlchemy
from flask import Flask, session, render_template, request, redirect, url_for, Response, json, g, flash
import os


app = Flask(__name__)
app.secret_key = os.urandom(67)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///final_applications.db'
db = SQLAlchemy(app)

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:///applications.db', convert_unicode=True, echo=False)
Base = declarative_base()
Base.metadata.reflect(engine)

from sqlalchemy.orm import relationship, backref

class Duplicates(Base):
    __table__ = Base.metadata.tables['Duplicates']

class FinalApplications(db.Model):
    __tablename__ = 'final_applications'
    
    Name = db.Column(db.String(100), primary_key=True, nullable=False)
    RollNo = db.Column(db.Integer,nullable=False)
    ContactNumber = db.Column(db.Integer,nullable=False)
    Teams = db.Column(db.Text,nullable=False)

@app.route('/')
def main():
    pass

if __name__ == '__main__':
    from sqlalchemy.orm import scoped_session, sessionmaker, Query
    db_session = scoped_session(sessionmaker(bind=engine))
    rolls=[]
    for roll in db_session.query(Duplicates.RollNumber).distinct():
            rolls.append(roll)

