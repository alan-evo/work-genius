// GraphQL types
import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID
} from 'graphql';

let TaskType = new GraphQLObjectType({
	name: 'Task',
	description: 'A task object',
	fields: () => ({
		'task_id': {
			type: GraphQLID,
			description: 'Task ID'
		},
		'developer': {
			type: GraphQLString,
			description: 'Developer responsible for this task'
		},
		'title': {
			type: GraphQLString,
			description: 'Task title'
		},
		'pri': {
			type: GraphQLString,
			description: 'Task pri'
		},
		'status': {
			type: GraphQLString,
			description: 'Current task status'
		},
		'dev_progress': {
			type: GraphQLString,
			description: 'Current developing progress'
		},
		'qa_progress': {
			type: GraphQLString,
			description: 'Developer responsible for this task'
		},
		'qa': {
			type: GraphQLString,
			description: 'QA responsible for this task'
		},
		'project': {
			type: GraphQLString,
			description: 'Project that this task belongs to'
		},
		'eta': {
			type: GraphQLString,
			description: 'Estimated time of completion'
		}
	})
});

export default TaskType;
