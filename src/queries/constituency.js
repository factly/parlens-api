import {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from "graphql";
// import the resolver
import { index, single } from "../resolvers/constituency";
// import the type
import ConstituencyType from "../types/constituency";

export function ConstituencyIndex() {
  return {
    type: new GraphQLObjectType({
      name: "ConstituencyPaging",
      description: "",

      fields: () => ({
        nodes: {
          type: new GraphQLList(ConstituencyType),
          description: "List of constituency"
        },
        total: {
          type: GraphQLInt,
          description: "total constituency"
        }
      })
    }),
    description:
      "This will return all the constituency present in the database",
    args: {
      limit: {
        type: GraphQLInt,
        description: "limit of paging"
      },
      page: {
        type: GraphQLInt,
        description: "page no"
      },
      q: {
        type: GraphQLString,
        description: "Constituency search keyword"
      }
    },
    resolve(parent, args, context, info) {
      return index(context, args);
    }
  };
}

export function ConstituencySingle() {
  return {
    type: ConstituencyType,
    description: "This will constituency party details by ID",
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: "Constituency ID"
      }
    },
    resolve(parent, args, context, info) {
      return single(context, args);
    }
  };
}
