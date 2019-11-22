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
            q: {
                type: GraphQLString,
                description: 'Question Search Word'
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
            house: {
                type: new GraphQLList(GraphQLString),
                description: 'House'
            },
            session: {
                type: new GraphQLList(GraphQLString),
                description: 'Session'
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