import { GraphQLList } from 'graphql';

// import the user type we created
import ConstituencyType from '../types/constituency';

// import the user resolver we created
import ConstituencyResolver from '../resolvers/constituency';

export function ConstituencyIndex() {
	return {
		type: new GraphQLList(ConstituencyType),
		description: 'This will return all the constituency present in the database',
		resolve(parent, args, context, info) {
			return ConstituencyResolver.index({});
		}
	}
}
