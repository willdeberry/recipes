from flask import Flask
from flask_restful import Resource, Api
from pymongo import MongoClient

from statics import Statics
from recipes import Recipes

app = Flask( __name__ )
app.config['MAX_CONTENT_LENGTH'] = 16777216

api = Api( app )
api.add_resource( Recipes, '/rp/recipes' )

Statics.mongo_client = MongoClient( connect = False )
Statics.db = Statics.mongo_client['recipes']
Statics.recipes = Statics.db['recipes']


if __name__ == '__main__':
	app.run( host = '0.0.0.0', debug = True )
