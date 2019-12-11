import { GraphQLInt, GraphQLList, GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';
// import the resolver
import { index, single } from '../resolvers/party';
// import the type
import PartyType from '../types/party';

export function PartyIndex() {
    return {
        type: new GraphQLObjectType({
            name: 'PartyPaging',
            description: '',
        
            fields: () => ({
                nodes: {
                    type: new GraphQLList(PartyType),
                    description: 'List of party'
                },
                total: {
                    type: GraphQLInt,
                    description: 'total party'
                }
            })         
        }),
        description: 'This will return present list',
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
                description: 'Party search keyword'
            }
        },
        resolve(parent, args, context, info) {
            return index(context, args);
        }
    };
}

export function PartySingle() {
    return {
        type: PartyType,
        description: 'This will return party details by ID',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'Party ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}