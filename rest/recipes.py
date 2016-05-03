from flask import Response, json, request
from flask_restful import Resource, reqparse
from bson import ObjectId
from bson.json_util import dumps
from datetime import datetime

from statics import Statics


class Recipes(Resource):
	def __init__(self):
		self.status = {'message': None, 'code': Statics.RET_ERR}
		super().__init__()

	def post(self):
		data = json.loads(request.data)

		if Statics.recipes.find_one({'name': data['name']}):
			self.status['message'] = 'Recipe already exists'
			self.status['code'] = Statics.RET_ERR
		else:
			self.status['message'] = 'New recipe added to the database'
			self.status['code'] = Statics.RET_OK
			new_doc = Statics.recipes.insert(data)
			self.status['new_id'] = str(new_doc)

		return Response(dumps(self.status), mimetype='application/json')
