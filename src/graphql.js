import {GraphQLObjectType, GraphQLSchema } from 'graphql';

// import the user query file we created
import PartyQuery from './queries/party';

// lets define our root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'This is the default root query provided by the backend',
	fields: {
        //party
		parties: PartyQuery.index()
	},
});

// export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
});