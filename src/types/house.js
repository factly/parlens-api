import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
    name: 'house',
    description: 'All houses of india.',

    fields: () => ({
        HID: {
            type: GraphQLInt,
            description: 'Internal house ID'
        },
        name: {
            type: GraphQLString,
            description: 'House name'
        }
    })
});