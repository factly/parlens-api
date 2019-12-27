import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} from 'graphql';

import MemberType from './member';
import MinistryType from './ministry';
import HouseType from "./house";

export default new GraphQLObjectType({
    name: 'question',
    description: 'All questions which has been asked in both house.',

    fields: () => ({
        QID: {
            type: GraphQLInt,
            description: 'Internal question ID'
        },
        subject: {
            type: GraphQLString,
            description: 'Question subject'
        },
        type: {
            type: GraphQLString,
            description: 'Question type'
        },
        question: {
            type: GraphQLString,
            description: 'Question questions'
        },
        questionBy: {
            type: new GraphQLList(MemberType),
            description: 'Question asked by',
            resolve(parent, args, context, info) {
                return context.loaders.members.loadMany(parent.questionBy);
            }
        },
        answer: {
            type: GraphQLString,
            description: 'Question answer'
        },
        house: {
            type: HouseType,
            description: 'Question house',
            resolve(parent, args, context, info) {
                return context.loaders.houses.load(parent.house);
            }
        },
        ministry: {
            type: MinistryType,
            description: 'Question ministry',
            resolve(parent, args, context, info) {
                return context.loaders.ministries.load(parent.ministry);
            }
        },
        date: {
            type: GraphQLString,
            description: 'Question asked date'
        }
    })
});
