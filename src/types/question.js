import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from "graphql";

import MemberWithoutTermType from "./memberwithoutterms";

export default new GraphQLObjectType({
  name: "question",
  description: "All questions which has been asked in both house.",

  fields: () => ({
    QID: {
      type: GraphQLInt,
      description: "Internal question ID"
    },
    subject: {
      type: GraphQLString,
      description: "Question subject"
    },
    type: {
      type: GraphQLString,
      description: "Question type"
    },
    question: {
      type: GraphQLString,
      description: "Question questions"
    },
    questionBy: {
      type: new GraphQLList(MemberWithoutTermType),
      description: "Question asked by"
    },
    answer: {
      type: GraphQLString,
      description: "Question answer"
    },
    house: {
      type: GraphQLString,
      description: "Question house"
    },
    ministry: {
      type: GraphQLString,
      description: "Question ministry"
    },
    date: {
      type: GraphQLString,
      description: "Question asked date"
    }
  })
});
