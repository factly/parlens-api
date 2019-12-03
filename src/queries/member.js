import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
// import the resolver
import { index, single } from '../resolvers/member';
// import the type 
import MemberType from '../types/member';

export function	MemberIndex() {
    return {
        type: new GraphQLList(MemberType),
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
                type: GraphQLString,
                description: 'Gender'
            },
            dob: {
                type: GraphQLString,
                description: 'dob'
            },
            marital_status:  {
                type: new GraphQLList(GraphQLString),
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
            education:  {
                type: new GraphQLList(GraphQLString),
                description: 'education'
            },
            profession:  {
                type: new GraphQLList(GraphQLString),
                description: 'profession'
            },
            expertise:  {
                type: new GraphQLList(GraphQLString),
                description: 'expertise'
            },
            term: {
                type: GraphQLInt,
                description: 'no of term'
            },
            party: {
                type: new GraphQLList(GraphQLInt),
                description: 'List of party ID'
            },
            constituency: {
                type: new GraphQLList(GraphQLInt),
                description: 'List of constituency ID'
            },
            house: {
                type: new GraphQLList(GraphQLString),
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

export function	MemberSingle(){
    return {
        type: MemberType,
        description: 'This will return member details by ID',
        args: {
            id: {
                type: GraphQLInt,
                description: 'Member ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}