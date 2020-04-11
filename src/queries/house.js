import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
// import the resolver
import { index } from '../resolvers/house';
// import the type
import HouseType from '../types/house';

export function HouseIndex() {
    return {
        type: new GraphQLObjectType({
            name: 'HousePaging',
            description: '',

            fields: () => ({
                nodes: {
                    type: new GraphQLList(HouseType),
                    description: 'List of house'
                },
                total: {
                    type: GraphQLInt,
                    description: 'total house'
                }
            })
        }),
        description: 'This will return present list',
        resolve(parent, args, context, info) {
            return index(context);
        }
    };
}
