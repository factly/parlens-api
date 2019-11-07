import { GraphQLList, GraphQLString } from 'graphql';

// import the type
import PartyType from '../types/party';

// import the resolver
import { index, single, search } from '../resolvers/party';

export function PartyIndex() {
    return {
        type: new GraphQLList(PartyType),
        description: 'This will return all the party present in the database',
        resolve(parent, args, context, info) {
            return index(context);
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

export function	PartySearch() {
    return {
        type: new GraphQLList(PartyType),
        description: 'This will return party search result',
        args: {
            q: {
                type: GraphQLString,
                description: 'Party search keyword'
            }
        },
        resolve(parent, args, context, info) {
            return search(context, args);
        }
    };
}