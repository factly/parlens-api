import { GraphQLList } from 'graphql';

// import the user type we created
import PartyType from '../types/party';

// import the user resolver we created
import PartyResolver from '../resolvers/party';

export default {
	index: () => {
		return {
			type: new GraphQLList(PartyType),
			description: 'This will return all the party present in the database',
			resolve(parent, args, context, info) {
				return PartyResolver.index({});
			}
		}
	}
};