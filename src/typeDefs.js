import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    members: [Member!]!  
    member(name: String, gender: String, dob: String, marital_status: String, sons: Int, daughters: Int, education: String, profession: String, term: Int, party: String, from: String, house: String, session: Int): [Member]!
    parties: [Party!]!
    constituencies: [Constituency!]!
    questions: [Question!]!
    question(subject: String, type: String, question: String, asked: String, answer: String, ministry: String, name: String, gender: String, dob: String, marital_status: String, sons: Int, daughters: Int, education: String, profession: String, term: Int, party: String, from: String, house: String, session: Int): [Question!]!
  }
  type Mutation {
    createParty(name: String!, abbr: String!): Party!
    createConstituency(name: String, state: String!, from: String!, to: String): Constituency!
    createMember(name: String!, gender: String!, dob: String, birth_place: String, marital_status: String, sons: Int, daughters: Int, education: String, profession: String, party: String, from: String, house: String, session: Int): Member!
    createQuestion(subject: String!, type: String!, question: String!, asked: String!, answer: String!, ministry: String!, date: String): Question!
  }
  type Question {
    id: ID!
    subject: String!
    type: String!
    question: String!
    asked: [Member!]!
    answer: String!
    ministry: String!
    date: String!
  }
  type Party {
    id: ID!
    name: String!
    abbr: String!
  }
  type Constituency {
    id: ID!
    name: String
    state: String!
    from: String
    to: String
  }
  type Winner {
    party: Party!
    from: Constituency!
    house: String!
    session: Int!
  }
  type Member {
    id: ID!
    name: String!
    gender: String!
    dob: String
    birth_place: String
    marital_status: String
    sons: Int
    daughters: Int
    education: String
    profession: [String]
    wins: [Winner]
  }
`;

