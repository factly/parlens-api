import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// import the query file
import { PartyIndex, PartySingle } from './queries/party';
import { MemberIndex, MemberSingle } from './queries/member';
import { GeographyIndex, GeographySingle } from './queries/geography';
import { QuestionIndex, QuestionSingle } from './queries/question';
import { HouseIndex } from './queries/house';
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
        //geography
        geographies: GeographyIndex(),
        geography: GeographySingle(),
        //question
        questions: QuestionIndex(),
        question: QuestionSingle(),
        //houses
        houses: HouseIndex()
    }
});

// export the schema
export default new GraphQLSchema({
    query
});
