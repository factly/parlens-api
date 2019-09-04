import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    members: [Member!]!
    parties: [Party!]!
    constituencies: [Constituency!]!
  }
  type Mutation {
    createParty(name: String!, abbr: String!): Party!
    createConstituency(name: String, state: String!, from: String!, to: String): Constituency!
    createMember(name: String, gender: String, dob: String, birth_place: String, marital_status: String, sons: Int, daughters: Int, education: String, profession: String, party: String, from: String, type: String, session: Int): Member!
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
    type: String!
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

