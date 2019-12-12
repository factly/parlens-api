import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from "graphql";

const TermType = new GraphQLObjectType({
  name: "termsnotnested",
  description: "All term of MP.",

  fields: () => ({
    party: {
      type: GraphQLString,
      description: "Term party"
    },
    constituency: {
      type: GraphQLString,
      description: "Term constituency"
    },
    house: {
      type: GraphQLString,
      description: "Term house type"
    },
    session: {
      type: GraphQLInt,
      description: "Term house session"
    }
  })
});

export default new GraphQLObjectType({
  name: "memberwithoutterms",
  description: "All MPs of india.",

  fields: () => ({
    MID: {
      type: GraphQLInt,
      description: "MID"
    },
    name: {
      type: GraphQLString,
      description: "Member name"
    },
    gender: {
      type: GraphQLString,
      description: "Member gender"
    },
    dob: {
      type: GraphQLString,
      description: "Member dob"
    },
    birth_place: {
      type: GraphQLString,
      description: "Member birth place"
    },
    marital_status: {
      type: GraphQLString,
      description: "Member marital status"
    },
    sons: {
      type: GraphQLInt,
      description: "Member sons"
    },
    daughters: {
      type: GraphQLInt,
      description: "Member daughters"
    },
    email: {
      type: new GraphQLList(GraphQLString),
      description: "Member marital status"
    },
    phone: {
      type: new GraphQLList(GraphQLString),
      description: "Member sons"
    },
    education: {
      type: GraphQLString,
      description: "Member marital status"
    },
    expertise: {
      type: new GraphQLList(GraphQLString),
      description: "Member marital status"
    },
    profession: {
      type: new GraphQLList(GraphQLString),
      description: "Member sons"
    },
    terms: {
      type: new GraphQLList(TermType),
      description: "Member term list"
    }
  })
});
