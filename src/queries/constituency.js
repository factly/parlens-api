import GraphQL from 'graphql';
const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;

// import the user type we created
import ConstituencyType from '../types/constituency';

// import the user resolver we created
import ConstituencyResolver from '../resolvers/constituency';

module.exports = {
	index() {
		return {
			type: new GraphQLList(ConstituencyType),
			description: 'This will return all the constituency present in the database',
			resolve(parent, args, context, info) {
				return ConstituencyResolver.index({});
			}
		}
	},
};