import { GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';

// import the type
import ConstituencyType from '../types/constituency';
import PagingType from '../types/paging';

// import the resolver
import { index, single } from '../resolvers/constituency';

export function ConstituencyIndex() {
    return {
        type: new GraphQLObjectType({
            name: 'PagingCon',
            fields: () => ({
                nodes: {
                    type: new GraphQLList(ConstituencyType)
                },
                edges: {
                    type: PagingType
                }
            })
        }),
        description: 'This will return all the constituency present in the database',
        resolve(parent, args, context, info) {
            return index(context);
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
