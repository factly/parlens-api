import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
    name: 'party',
    description: 'All political parties of india.',

    fields: () => ({
        PID: {
            type: GraphQLID,
            description: 'Internal party ID'
        },
        name: {
            type: GraphQLString,
            description: 'Party name'
        },
        abbr: {
            type: GraphQLString,
            description: 'Party abbr'
        }
    })
});
