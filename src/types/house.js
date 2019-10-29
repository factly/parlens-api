/*
    TODO: Add house in other collections.
*/
import GraphQL from 'graphql';

const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const HouseType = new GraphQL.GraphQLObjectType({
	name: 'house',
	description: 'All houses of india.',

	fields: () => ({
		_id: {
			type: GraphQLID,
			description: 'ID of the address, Generated automatically by MongoDB',
		},
        name: {
            type: GraphQLString,
			description: 'House name',
		},
	})

});


module.exports = ConstituencyType;