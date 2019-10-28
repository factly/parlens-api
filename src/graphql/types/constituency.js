import GraphQL from 'graphql';

const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const ConstituencyType = new GraphQL.GraphQLObjectType({
	name: 'constituency',
	description: 'All constituency of india.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the address, Generated automatically by MongoDB',
		},
        name: {
            type: GraphQLString,
			description: 'Constituency name',
		},
        state: {
			type: GraphQLString,
			description: 'Constituency state',
		},
        pincodes: {
			type:new GraphQLList(GraphQLInt),
			description: 'Constituency pincodes',
		},
		from: {
			type: GraphQLString,
			description: 'Constituency adding date',
		},
		to: {
			type: GraphQLString,
			description: 'Constituency delimitation date',
		}
	})

});


module.exports = ConstituencyType;