import GraphQL from 'graphql';
const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;

// import the user type we created
import MemberType from '../types/member';

// import the user resolver we created
import MemberResolver from '../resolvers/member';

module.exports = {
	index() {
		return {
			type: new GraphQLList(MemberType),
			description: 'This will return all the party present in the database',
			resolve(parent, args, context, info) {
				return MemberResolver.index({});
			}
		}
	},
};