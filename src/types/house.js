/*
    TODO: Add house in other collections.
*/
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
    name: 'house',
    description: 'All houses of india.',

    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'House name'
        }
    })
});