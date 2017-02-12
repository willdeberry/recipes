from flask import Flask, json
from flask_restful import Resource, Api
from pymongo import MongoClient
from urllib.parse import quote_plus
from pathlib import Path

from statics import Statics
from recipes import Recipes

app = Flask( __name__ )
app.config['MAX_CONTENT_LENGTH'] = 16777216

api = Api( app )
api.add_resource( Recipes, '/recipes' )

information = Path('/var/www/data/information.json')
data = None
user = None
password = None
db = None

if information.exists():
	with information.open() as f:
		data = json.load(f)

	for site in data['sites']:
		if site['name'] == 'recipes':
			user = site['user']
			password = site['password']
			db = site['db']

uri = 'mongodb://{}:{}@localhost'.format(user, quote_plus(password))

Statics.mongo_client = MongoClient( uri, connect = False )
Statics.db = Statics.mongo_client[db]
Statics.recipes = Statics.db[db]


if __name__ == '__main__':
	app.run( host = '0.0.0.0', debug = True )
