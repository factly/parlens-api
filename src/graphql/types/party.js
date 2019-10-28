import GraphQL from 'graphql';

const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const PartyType = new GraphQL.GraphQLObjectType({
	name: 'party',
	description: 'All political parties of india.',

	fields: () => ({
		id: {
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


module.exports = PartyType;