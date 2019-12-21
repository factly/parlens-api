import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import GeographyType from './geography';
import PartyType from './party';
import HouseType from './house';

const TermType = new GraphQLObjectType({
    name: 'term',
    description: 'All term of MP.',

    fields: () => ({
        party: {
            type: PartyType,
            description: 'Term party',
            resolve(parent, args, context, info) {
                return context.loaders.parties.load(parent.party);
            }
        },
        geography: {
            type: GeographyType,
            description: 'Term geography',
            resolve(parent, args, context, info) {
                return context.loaders.geographies.load(parent.geography);
            }
        },
        house: {
            type: HouseType,
            description: 'Term house type',
            resolve(parent, args, context, info) {
                return context.loaders.houses.load(parent.house);
            }
        },
        session: {
            type: GraphQLInt,
            description: 'Term house session'
        }
    })
});

export default new GraphQLObjectType({
    name: 'member',
    description: 'All MPs of india.',

    fields: () => ({
        MID: {
            type: GraphQLInt,
            description: 'MID'
        },
        name: {
            type: GraphQLString,
            description: 'Member name'
        },
        gender: {
            type: GraphQLString,
            description: 'Member gender',
            resolve(parent, args, context, info) {
                const genderParser = {
                    1: 'Female',
                    2: 'Male',
                    3: 'Other'
                };
                return genderParser[parent.gender];
            }
        },
        dob: {
            type: GraphQLString,
            description: 'Member dob'
        },
        birthPlace: {
            type: GraphQLString,
            description: 'Member birth place'
        },
        maritalStatus: {
            type: GraphQLString,
            description: 'Member marital status',
            resolve(parent, args, context, info) {
                const maritalParser = {
                    1: 'Married',
                    2: 'Widow',
                    3: 'Divorcee',
                    4: 'Unmarried',
                    5: 'Widower'
                };
                return maritalParser[parent.maritalStatus];
            }
        },
        sons: {
            type: GraphQLInt,
            description: 'Member sons'
        },
        daughters: {
            type: GraphQLInt,
            description: 'Member daughters'
        },
        email: {
            type: new GraphQLList(GraphQLString),
            description: 'Member marital status'
        },
        phone: {
            type: new GraphQLList(GraphQLString),
            description: 'Member sons'
        },
        education: {
            type: GraphQLString,
            description: 'Member marital status',
            resolve(parent, args, context, info) {
                const educationParser = {
                    1: 'Doctorate',
                    2: 'Post Graduate',
                    3: 'Graduate',
                    4: 'Intermediate',
                    5: 'High School',
                    6: 'Not Mentioned'
                };
                return educationParser[parent.education];
            }
        },
        expertise: {
            type: new GraphQLList(GraphQLString),
            description: 'Member marital status'
        },
        profession: {
            type: new GraphQLList(GraphQLString),
            description: 'Member profession'
        },
        terms: {
            type: new GraphQLList(TermType),
            description: 'Member term list' 
        }
    })
});
