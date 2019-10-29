import GraphQL from 'graphql';

const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

import MemberType from './member';

const QuestionType = new GraphQL.GraphQLObjectType({
	name: 'question',
	description: 'All questions which has been asked in both house.',

	fields: () => ({
		_id: {
			type: GraphQLID,
			description: 'ID of the address, Generated automatically by MongoDB',
		},
        subject: {
            type: GraphQLString,
			description: 'Question subject',
		},
        type: {
			type: GraphQLString,
			description: 'Question type',
		},
        question: {
			type: new GraphQLList(GraphQLString),
			description: 'Question questions',
        },
        questionBy: {
			type: new GraphQLList(MemberType),
			description: 'Question asked by',
        },
        answer: {
			type: GraphQLString,
			description: 'Question answer',
        },
        house: {
            type: GraphQLString,
            description: 'Question house',
        },
        ministry: {
			type: GraphQLString,
			description: 'Question ministry',
        },
        date: {
            type: GraphQLString,
            description: 'Question asked date'
        }
	})

});


module.exports = QuestionType;