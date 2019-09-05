import { Members } from "./models/Members";
import { Parties } from "./models/parties";
import { Constituencies } from "./models/Constituencies";
import { Questions } from "./models/Questions";

export const resolvers = {
  Query: {
    members: () => Members.find().populate('wins.party').populate('wins.from'),
    member: (_, { name, gender, dob, marital_status, sons, daughters, education, profession, term, party, from, house, session }) => {
      let filterList = {}
      if(name) filterList['name'] = { $regex: name, $options: 'i' }
      if(gender) filterList['gender'] = gender
      if(dob) filterList['dob'] = dob
      if(marital_status) filterList['marital_status'] = marital_status
      if(sons) filterList['sons'] = sons
      if(daughters) filterList['daughters'] = daughters
      if(education) filterList['education'] = education
      if(profession) filterList['profession'] = { $in : [profession] }
      if(term) filterList['wins'] = { $size: term }
      if(party) filterList['wins.party'] = party
      if(from) filterList['wins.from'] = from
      if(house) filterList['wins.house'] = house
      if(session) filterList['wins.session'] = session
      return Members.find(filterList).populate('wins.party').populate('wins.from');
    },
    parties: () => Parties.find(),
    constituencies: () => Constituencies.find(),
    questions: () => Questions.find().populate({path: 'asked', populate: {
        path: 'wins.party wins.from',
      }
    }),
    question: (_, { subject, type, que, answer, asked, ministry, name, gender, dob, marital_status, sons, daughters, education, profession, term, party, from, house, session}) => {
      
      if(name || gender || dob || marital_status || sons || daughters || education || profession || term || party || from || house || session) {
        let filterList = {}
        if(name) filterList['name'] = { $regex: name, $options: 'i' }
        if(gender) filterList['gender'] = gender
        if(dob) filterList['dob'] = dob
        if(marital_status) filterList['marital_status'] = marital_status
        if(sons) filterList['sons'] = sons
        if(daughters) filterList['daughters'] = daughters
        if(education) filterList['education'] = education
        if(profession) filterList['profession'] = { $in : [profession] }
        if(term) filterList['wins'] = { $size: term }
        if(party) filterList['wins.party'] = party
        if(from) filterList['wins.from'] = from
        if(house) filterList['wins.house'] = house
        if(session) filterList['wins.session'] = session

        return Members.find(filterList, '_id').then((members) => {
          var askList = []
          for(var i in members){
            askList.push(members[i]._id)
          }
          var filterList = {}
          if(subject) filterList['subject'] = { $regex: subject, $options: 'i' }
          if(type) filterList['type'] = type
          if(que) filterList['question'] = { $regex: que, $options: 'i' }
          if(answer) filterList['answer'] = { $regex: answer, $options: 'i' }
          if(ministry) filterList['ministry'] = { $regex: ministry, $options: 'i' }
          if(askList.length > 0) filterList['asked'] = { $in : askList }
          return Questions.find(filterList).populate({path: 'asked', populate: {
            path: 'wins.party wins.from',
          }})
        }) 
      } else {
        let filterList = {}
    
        if(subject) filterList['subject'] = { $regex: subject, $options: 'i' }
        if(type) filterList['type'] = type
        if(que) filterList['question'] = { $regex: que, $options: 'i' }
        if(answer) filterList['answer'] = { $regex: answer, $options: 'i' }
        if(ministry) filterList['ministry'] = { $regex: ministry, $options: 'i' }
        if(asked) filterList['asked'] = { $in : [asked] }
        return Questions.find(filterList).populate({path: 'asked', populate: {
          path: 'wins.party wins.from',
        }})
      }
    }
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
    createMember: async (_, {name, gender, dob, birth_place, marital_status, sons, daughters, education, profession, party, from, house, session}) => {
      const temp = []
      temp.push(profession)
      const temp2 = []
      temp2.push({
        party, 
        from,
        house,
        session
      })
      const member = new Members({name, gender, dob, birth_place, marital_status, sons, daughters, education, profession: temp, wins: temp2})
      await member.save();
      return member;
    },
    createQuestion: async (_, {subject, type, question, asked, answer, ministry, date}) => {
      const questions = new Questions({ subject, type, question, asked: [asked], answer, ministry, date });
      await questions.save();
      return questions
    }
  }
};