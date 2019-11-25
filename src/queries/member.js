import { GraphQLList, GraphQLString, GraphQLInt } from 'graphql';

// import the type 
import MemberType from '../types/member';

// import the resolver
import { index, single } from '../resolvers/member';

export function	MemberIndex() {
    return {
        type: new GraphQLList(MemberType),
        description: 'This will return all the member present in the database',
        args: {
            name: {
                type: GraphQLString,
                description: 'Member ID'
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
                type: new GraphQLList(GraphQLString),
                description: 'List of party ID'
            },
            constituency: {
                type: new GraphQLList(GraphQLString),
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
                type: GraphQLString,
                description: 'Member ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}