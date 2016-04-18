// GraphQL
import {
    GraphQLID,
    GraphQLString
} from 'graphql';
// RethinkDB
import r from 'rethinkdb';
// Constants
import { DB_HOST, DB_PORT } from '../../constants/configurations.js';

let WorkLogMutation = {
	'createWorkLog': {
		type: GraphQLString,
		description: 'create a worklog ',
        args: {
			data: {
				type: GraphQLString,
				description: 'new worklog data'
			}
		},
		resolve: async (root, { data }) => {
			let connection = null,
				query = null;

			try {
				
				let worklog = JSON.parse(data);

				query = r.db('work_genius').table('worklog').insert(worklog);
				connection = await r.connect({ host: DB_HOST, port: DB_PORT });
				let result = await query.run(connection);
				await connection.close();
				let id = '';
		        if (result && result.generated_keys && result.generated_keys.length > 0){
		          id = result.generated_keys[0];
		        }
		        return id;
			} catch (err) {
				return 'Fail to create a worklog!';
			}
		}
	},
	'updateWorkLog': {
		type: GraphQLString,
		description: 'update a worklog ',
        args: {
        	id: {
				type: GraphQLID,
				description: 'worklog id'
        	},
			data: {
				type: GraphQLString,
				description: 'new worklog data'
			}
		},
		resolve: async (root, { id,data }) => {
			let connection = null,
				query = null;

			try {
				
				let worklog = JSON.parse(data);
				if(worklog.id){
					delete worklog.id;
				}
				query = r.db('work_genius').table('worklog').get(id).update(worklog);
				connection = await r.connect({ host: DB_HOST, port: DB_PORT });
				await query.run(connection);
				await connection.close();
			} catch (err) {
				return 'Fail to update a worklog!';
			}
			return 'Update worklog successfully!';
		}
	},
	'deleteWorkLog': {
		type: GraphQLString,
		description: 'delete a worklog ',
        args: {
        	id: {
				type: GraphQLID,
				description: 'worklog id'
        	}
		},
		resolve: async (root, { id }) => {
			let connection = null,
				query = null;

			try {
				
				query = r.db('work_genius').table('worklog').get(id).delete();
				connection = await r.connect({ host: DB_HOST, port: DB_PORT });
				await query.run(connection);
				await connection.close();
			} catch (err) {
				return 'Fail to delete a worklog!';
			}
			return 'Delete worklog successfully!';
		}
	},
	'createWorkLogBatch': {
		type: GraphQLString,
		description: 'create a batch of worklog ',
        args: {
			data: {
				type: GraphQLString,
				description: 'new worklog array'
			}
		},
		resolve: async (root, { data }) => {
			let connection = null,
				query = null;

			try {
				
				let worklogObj = JSON.parse(data);

				query = r.db('work_genius').table('worklog').insert(worklogObj.worklog);
				connection = await r.connect({ host: DB_HOST, port: DB_PORT });
				let result = await query.run(connection);
				await connection.close();
				let idList = [];
		        if (result && result.generated_keys){
		          idList = result.generated_keys;
		        }
		        return idList;
			} catch (err) {
				return 'Fail to create a batch of worklog!';
			}
		}
	}

};

export default WorkLogMutation;