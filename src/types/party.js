import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
	name: 'party',
	description: 'All political parties of india.',

	fields: () => ({
		_id: {
			type: GraphQLID,
			description: 'ID of the address, Generated automatically by MongoDB',
		},
        name: {
            type: GraphQLString,
			description: 'Party name',
		},
        abbr: {
			type: GraphQLString,
			description: 'Party abbr',
		},
	})
});
