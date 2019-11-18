import { GraphQLList, GraphQLString } from 'graphql';

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