import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
    name: 'paging',
    description: 'paging for all the nodes.',

    fields: () => ({
        prev: {
            type: GraphQLString,
            description: 'Key to get previous nodes'
        },
        next: {
            type: GraphQLString,
            description: 'Key to get next nodes'
        },
        hasPrev: {
            type: GraphQLBoolean,
            description: 'Key to represent previous key'
        },
        hasNext: {
            type: GraphQLBoolean,
            description: 'Key to represent next key'
        }
    })
});
