import { GraphQLList, GraphQLString, GraphQLInt } from 'graphql';

// import the type
import PartyType from '../types/party';

// import the resolver
import { index, single } from '../resolvers/party';

export function PartyIndex() {
    return {
        type: new GraphQLList(PartyType),
        description: 'This will return all the party present in the database',
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
                type: GraphQLString,
                description: 'Party ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}