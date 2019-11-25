import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// import the query file
import { PartyIndex, PartySingle } from './queries/party';
import { MemberIndex, MemberSingle } from './queries/member';
import { ConstituencyIndex, ConstituencySingle } from './queries/constituency';
import { QuestionIndex, QuestionSingle } from './queries/question';

// define root query
const query = new GraphQLObjectType({
    name: 'query',
    description: 'This is the default root query provided by the backend',
    fields: {
        //party
        parties: PartyIndex(),
        party: PartySingle(),
        //member
        members: MemberIndex(),
        member: MemberSingle(),
        //constituency
        constituencies: ConstituencyIndex(),
        constituency: ConstituencySingle(),
        //question
        questions: QuestionIndex(),
        question: QuestionSingle()
    }
});

// export the schema
export default new GraphQLSchema({
    query
});