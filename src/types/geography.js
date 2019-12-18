import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

const GeographyType = new GraphQLObjectType({
    name: 'geography',
    description: 'All geography of india.',

    fields: () => ({
        GID: {
            type: GraphQLInt,
            description: 'Internal geography ID'
        },
        name: {
            type: GraphQLString,
            description: 'geography name'
        },
        parent: {
            type: GeographyType,
            description: 'geography state',
            resolve(parent, args, context, info) {
                return context.loaders.parents.load(parent.parent);
            }
        },
        type: {
            type: GraphQLString,
            description: 'geography type'
        },
        pincodes: {
            type: new GraphQLList(GraphQLInt),
            description: 'geography pincodes'
        },
        from: {
            type: GraphQLString,
            description: 'geography adding date'
        },
        to: {
            type: GraphQLString,
            description: 'geography delimitation date'
        }
    })
});

export default GeographyType;
