/*
    TODO: Add house in other collections.
*/
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
    name: 'house',
    description: 'All houses of india.',

    fields: () => ({
        _id: {
            type: GraphQLID,
            description: 'ID of the address, Generated automatically by MongoDB'
        },
        name: {
            type: GraphQLString,
            description: 'House name'
        }
    })
});