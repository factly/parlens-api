import GraphQL from 'graphql';
const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;

// import the user type we created
import QuestionType from '../types/question';

// import the user resolver we created
import QuestionResolver from '../resolvers/question';

export function QuestionIndex() {
	return {
		type: new GraphQLList(QuestionType),
		description: 'This will return all the party present in the database',
		resolve(parent, args, context, info) {
			return QuestionResolver.index({});
		}
	}
}
