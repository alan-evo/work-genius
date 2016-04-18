// GraphQL types
import {
  GraphQLInputObjectType,
	GraphQLString,
	GraphQLID,
  GraphQLList
} from 'graphql';

import AuthorInputType from '../User/AuthorInputType';
import CommentInputType from '../Comment/CommentInputType';

const ArticleInputType = new GraphQLInputObjectType({
  name: 'ArticleInputType',
  descriptyion: 'An documentation article',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Article ID'
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'Article\'s tags'
    },
    category: {
      type: new GraphQLInputObjectType({
        name: 'CategoryInputType',
        fields: {
          'id': {
            type: GraphQLID,
            description: 'Category ID'
          }
        }
      }),
      description: 'Article\'s categories'
    },
    content: {
      type: GraphQLString,
      description: 'Article\'s content'
    },
    title: {
      type: GraphQLString,
      description: 'Article\'s title'
    },
    comments: {
      type: new GraphQLList(CommentInputType),
      description: 'Comment List'
    },
    author:{ type: AuthorInputType },
    files:{
      type: new GraphQLList(new GraphQLInputObjectType({
        name: 'FileInputType',
        fields: {
          'id': {
            type: GraphQLString,
            description: 'File ID'
          }
        }
      })),
      description: 'File List'
    }
  })
});

export default ArticleInputType;
