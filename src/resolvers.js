import { Members } from "./models/Members";
import { Parties } from "./models/parties";
import { Constituencies } from "./models/Constituencies";

export const resolvers = {
  Query: {
    members: () => Members.find().populate('wins.party').populate('wins.from'),
    parties: () => Parties.find(),
    constituencies: () => Constituencies.find()
  },
  Mutation: {
    createParty: async (_, { name, abbr }) => {
      const party = new Parties({ name, abbr });
      await party.save();
      return party;
    },
    createConstituency: async (_, { name, state, from, to }) => {
      const constituency = new Constituencies({ name, state, from, to });
      await constituency.save();
      return constituency;
    },
    createMember: async (_, {name, gender, dob, birth_place, marital_status, sons, daughters, education, profession, party, from, type, session}) => {
      const temp = []
      temp.push(profession)
      const temp2 = []
      temp2.push({
        party, 
        from,
        type,
        session
      })
      const member = new Members({name, gender, dob, birth_place, marital_status, sons, daughters, education, profession: temp, wins: temp2})
      await member.save();
      return member;
    }
  }
};