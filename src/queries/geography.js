import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
// import the resolver
import { index, single, states } from '../resolvers/geography';
// import the type
import GeographyType from '../types/geography';

export function GeographyIndex() {
    return {
        type: new GraphQLObjectType({
            name: 'GeographyPaging',
            description: '',

            fields: () => ({
                nodes: {
                    type: new GraphQLList(GeographyType),
                    description: 'List of geography'
                },
                total: {
                    type: GraphQLInt,
                    description: 'total geography'
                }
            })
        }),
        description: 'all the geography',
        args: {
            limit: {
                type: GraphQLInt,
                description: 'limit of paging'
            },
            page: {
                type: GraphQLInt,
                description: 'page no'
            },
            q: {
                type: GraphQLString,
                description: 'geography search keyword'
            }
        },
        resolve(parent, args, context, info) {
            return index(context, args);
        }
    };
}

export function GeographySingle() {
    return {
        type: GeographyType,
        description: 'This will geography party details by ID',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'geography ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}

export function GeographyStates() {
    return {
        type: new GraphQLObjectType({
            name: 'GeographyPagingForState',
            description: '',

            fields: () => ({
                nodes: {
                    type: new GraphQLList(GeographyType),
                    description: 'List of geography'
                },
                total: {
                    type: GraphQLInt,
                    description: 'total geography'
                }
            })
        }),
        description: 'This will give all states details',
        resolve(parent, args, context, info) {
            return states(context);
        }
    };
}
