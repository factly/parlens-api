import { GraphQLList, GraphQLString } from 'graphql';

// import the type 
import MemberType from '../types/member';

// import the resolver
import { index, single } from '../resolvers/member';

export function	MemberIndex() {
    return {
        type: new GraphQLList(MemberType),
        description: 'This will return all the member present in the database',
        resolve(parent, args, context, info) {
            return index(context);
        }
    };
}

export function	MemberSingle(){
    return {
        type: MemberType,
        description: 'This will return member details by ID',
        args: {
            id: {
                type: GraphQLString,
                description: 'Member ID'
            }
        },
        resolve(parent, args, context, info) {
            return single(context, args);
        }
    };
}