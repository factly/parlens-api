import {GraphQLObjectType, GraphQLSchema } from 'graphql';

// import the query file
import { PartyIndex, PartySingle, PartySearch } from './queries/party';
import { MemberIndex, MemberSingle } from './queries/member';
import { ConstituencyIndex, ConstituencySingle} from './queries/constituency';
import { QuestionIndex, QuestionSingle } from './queries/question';

// define root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'This is the default root query provided by the backend',
	fields: {
        //party
		parties: PartyIndex(),
		party: PartySingle(),
		search: PartySearch(),
		//member
		members: MemberIndex(),
		member: MemberSingle(),
		//constituency
		constituencies: ConstituencyIndex(),
		constituency: ConstituencySingle(),
		//question
		questions: QuestionIndex(),
		question: QuestionSingle(),
	},
});

// export the schema
export default new GraphQLSchema({
	query: RootQuery,
});