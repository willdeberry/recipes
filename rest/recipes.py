from flask import json, request, Response
from flask_restful import Resource, reqparse
from bson.json_util import dumps
from bson.objectid import ObjectId

from statics import Statics


class Recipes(Resource):
	def __init__(self):
		self.deleteparse = reqparse.RequestParser()
		self.deleteparse.add_argument( 'id', type = str, required = True, help = 'You must provide the db ID to remove' )

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
			if '_id' not in data:
				new_doc = Statics.recipes.insert(data)
			else:
				data_id = data['_id']['$oid']
				excludes = {'_id'}
				resultset = {x: data[x] for x in data if x not in excludes}
				new_doc = Statics.recipes.update({'_id': ObjectId(data['_id']['$oid'])}, {"$set": resultset}, upsert = False)

			self.status['message'] = 'New recipe added to the database'
			self.status['status'] = Statics.RET_OK
			self.status['new_id'] = str(new_doc)

		return Response(dumps(self.status), mimetype='application/json')

		return resp

	def delete(self):
		args = self.deleteparse.parse_args()
		item_id = args['id']

		if Statics.recipes.find_one({'_id': ObjectId(item_id)}):
			self.status['message'] = 'Id ({}) removed from the database'.format(item_id)
			self.status['code'] = Statics.RET_OK
			Statics.recipes.remove({'_id': ObjectId(item_id)})

		return Response(dumps(self.status), mimetype='application/json')
