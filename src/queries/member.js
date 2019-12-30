import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLFloat,
} from 'graphql';
// import the resolver
import { index, single } from '../resolvers/member';
// import the type
import MemberType from '../types/member';

export function MemberIndex() {
    return {
        type: new GraphQLObjectType({
            name: 'MembersPaging',
            description: '',

            fields: () => ({
                nodes: {
                    type: new GraphQLList(MemberType),
                    description: 'List of members'
                },
                total: {
                    type: GraphQLInt,
                    description: 'total members'
                }
            })
        }),
        description: 'This will return all the member present in the database',
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
                description: 'Member Name'
            },
            gender: {
                type: new GraphQLList(GraphQLInt),
                description: 'Gender'
            },
            ageMin: {
                type: GraphQLFloat,
                description: 'dob max'
            },
            ageMax: {
                type: GraphQLFloat,
                description: 'dob min'
            },
            maritalStatus: {
                type: new GraphQLList(GraphQLInt),
                description: 'merital status'
            },
            sons: {
                type: new GraphQLList(GraphQLInt),
                description: 'sons'
            },
            daughters: {
                type: new GraphQLList(GraphQLInt),
                description: 'daughters'
            },
            education: {
                type: new GraphQLList(GraphQLInt),
                description: 'education'
            },
            profession: {
                type: new GraphQLList(GraphQLString),
                description: 'profession'
            },
            expertise: {
                type: new GraphQLList(GraphQLString),
                description: 'expertise'
            },
            terms: {
                type: GraphQLInt,
                description: 'no of term'
            },
            party: {
                type: new GraphQLList(GraphQLInt),
                description: 'List of party ID'
            },
            constituency: {
                type: new GraphQLList(GraphQLInt),
                description: 'List of geography ID'
            },
            state: {
                type: new GraphQLList(GraphQLInt),
                description: 'List of state ID'
            },
            house: {
                type: new GraphQLList(GraphQLInt),
                description: 'House'
            },
            session: {
                type: new GraphQLList(GraphQLInt),
                description: 'Session'
            }
        },
        resolve(parent, args, context, info) {
            return index(context, args);
        }
    };
}

export function MemberSingle() {
    return {
        type: MemberType,
        description: 'This will return member details by ID',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'Member ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}
