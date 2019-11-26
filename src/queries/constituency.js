import { GraphQLList, GraphQLString, GraphQLInt } from 'graphql';

// import the type
import ConstituencyType from '../types/constituency';

// import the resolver
import { index, single } from '../resolvers/constituency';

export function ConstituencyIndex() {
    return {
        type: new GraphQLList(ConstituencyType),
        description: 'This will return all the constituency present in the database',
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
                description: 'Constituency search keyword'
            }
        },
        resolve(parent, args, context, info) {
            return index(context, args);
        }
    };
}

export function ConstituencySingle() {
    return {
        type: ConstituencyType,
        description: 'This will constituency party details by ID',
        args: {
            id: {
                type: GraphQLString,
                description: 'Constituency ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}
