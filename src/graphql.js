import {GraphQLObjectType, GraphQLSchema } from 'graphql';

// import the query file
import { PartyIndex, PartySingle, PartySearch } from './queries/party';
import { MemberIndex, MemberSingle } from './queries/member';

// lets define our root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'This is the default root query provided by the backend',
	fields: {
        //party
		parties: PartyIndex(),
		party: PartySingle(),
		search: PartySearch(),
		members: MemberIndex(),
		member: MemberSingle()
	},
});

// export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
});