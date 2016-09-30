from flask import json, request, Response
from flask_restful import Resource
from bson.json_util import dumps

from statics import Statics


class Recipes(Resource):
	def __init__(self):
		self.status = {'message': None, 'status': Statics.RET_ERR}
		super().__init__()

	def get(self):
		self.status['message'] = Statics.recipes.find()
		self.status['status'] = Statics.RET_OK

		documents = []
		for document in Statics.recipes.find():
			documents.append(document)

		if documents:
			self.status['message'] = documents

		return Response(dumps(self.status), mimetype='application/json')

	def post(self):
		data = json.loads(request.data)

		if data:
			new_doc = Statics.recipes.insert(data)
			self.status['message'] = 'New recipe added to the database'
			self.status['status'] = Statics.RET_OK
			self.status['new_id'] = str(new_doc)

		return Response(dumps(self.status), mimetype='application/json')

		return resp
