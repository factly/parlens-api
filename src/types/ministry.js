import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
    name: 'ministry',
    description: 'All ministries of india.',

    fields: () => ({
        MINID: {
            type: GraphQLInt,
            description: 'Internal ministry ID'
        },
        name: {
            type: GraphQLString,
            description: 'Ministry name'
        }
    })
});