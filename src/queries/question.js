import { GraphQLList, GraphQLString, GraphQLInt } from 'graphql';

// import the type
import QuestionType from '../types/question';

// import the resolver
import { index, single } from '../resolvers/question';

export function QuestionIndex() {
    return {
        type: new GraphQLList(QuestionType),
        description: 'This will return all the question present in the database',
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
                description: 'Question Search Word'
            },
            house: {
                type: GraphQLString,
                description: 'House'
            },
            type: {
                type: GraphQLString,
                description: 'Type'
            },
            ministry: {
                type: GraphQLString,
                description: 'Ministry'
            },
            questionBy: {
                type: new GraphQLList(GraphQLString),
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
            marital_status: {
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
            education: {
                type: new GraphQLList(GraphQLString),
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
            }
        },
        resolve(parent, args, context, info) {
            return index(context, args);
        }
    };
}

export function QuestionSingle() {
    return {
        type: QuestionType,
        description: 'This will return question details by ID',
        args: {
            id: {
                type: GraphQLString,
                description: 'Question ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}