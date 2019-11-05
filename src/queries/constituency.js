import { GraphQLList, GraphQLString } from 'graphql';

// import the constituency type
import ConstituencyType from '../types/constituency';

// import the constituency resolver
import { index, single } from '../resolvers/constituency';

export function ConstituencyIndex() {
	return {
		type: new GraphQLList(ConstituencyType),
		description: 'This will return all the constituency present in the database',
		resolve(parent, args, context, info) {
			return index(context);
		}
	}
}

export function ConstituencySingle() {
	return {
		type: ConstituencyType,
		description: 'This will constituency party details by ID',
		args: {
			id: {
				type: GraphQLString,
				description: 'Constituency ID',
			}
		},
		resolve(parent, args, context, info) {
			return single(context, args);
		}
	}
}
