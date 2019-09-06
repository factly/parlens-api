import { Members } from './models/Members';
import { Parties } from './models/parties';
import { Constituencies } from './models/Constituencies';
import { Questions } from './models/Questions';

export const resolvers = {
  Query: {
    members: () => Members.find().populate('terms.party terms.constituency'),
    member: (_, {
      name, gender, dob, marital_status, sons, daughters, education, profession, term, party, constituency, house, session,
    }) => {
      const filterList = {};
      if (name) filterList.name = { $regex: name, $options: 'i' };
      if (gender) filterList.gender = gender;
      if (dob) filterList.dob = dob;
      if (marital_status) filterList.marital_status = marital_status;
      if (sons) filterList.sons = sons;
      if (daughters) filterList.daughters = daughters;
      if (education) filterList.education = education;
      if (profession) filterList.profession = { $in: [profession] };
      if (term) filterList.terms = { $size: term };
      if (party) filterList['terms.party'] = party;
      if (constituency) filterList['terms.constituency'] = constituency;
      if (house) filterList['terms.house'] = house;
      if (session) filterList['terms.session'] = session;
      return Members.find(filterList).populate('terms.party terms.constituency');
    },
    parties: () => Parties.find(),
    constituencies: () => Constituencies.find(),
    questions: () => Questions.find().populate({
      path: 'askedBy',
      populate: {
        path: 'terms.party terms.constituency',
      },
    }),
    question: (_, {
      subject, type, question, answer, askedBy, ministry, name, gender, dob, marital_status, sons, daughters, education, profession, term, party, constituency, house, session,
    }) => {
      const filterMemberList = {};
      const filterList = {};

      if (name) filterMemberList.name = { $regex: name, $options: 'i' };
      if (gender) filterMemberList.gender = gender;
      if (dob) filterMemberList.dob = dob;
      if (marital_status) filterMemberList.marital_status = marital_status;
      if (sons) filterMemberList.sons = sons;
      if (daughters) filterMemberList.daughters = daughters;
      if (education) filterMemberList.education = education;
      if (profession) filterMemberList.profession = { $in: [profession] };
      if (term) filterMemberList.terms = { $size: term };
      if (party) filterMemberList['terms.party'] = party;
      if (constituency) filterMemberList['terms.constituency'] = constituency;
      if (house) filterMemberList['terms.house'] = house;
      if (session) filterMemberList['terms.session'] = session;

      if (subject) filterList.subject = { $regex: subject, $options: 'i' };
      if (type) filterList.type = type;
      if (question) filterList.question = { $regex: question, $options: 'i' };
      if (answer) filterList.answer = { $regex: answer, $options: 'i' };
      if (ministry) filterList.ministry = { $regex: ministry, $options: 'i' };
      if (askedBy) filterList.askedBy = { $in: [askedBy] };

      if (Object.keys(filterMemberList).length > 0) {
        return Members.find(filterMemberList, '_id')
          .then(members => members.map(member => member._id))
          .then((askList) => {
            filterList.askedBy = { $in: askList.concat(askedBy || []) };
            return Questions.find(filterList).populate({
              path: 'askedBy',
              populate: {
                path: 'terms.party terms.constituency',
              },
            });
          });
      }

      return Questions.find(filterList).populate({
        path: 'askedBy',
        populate: {
          path: 'terms.party terms.constituency',
        },
      });
    },
  },
  Mutation: {
    createParty: async (_, { name, abbr }) => {
      const party = new Parties({ name, abbr });
      await party.save();
      return party;
    },
    createConstituency: async (_, {
      name, state, from, to,
    }) => {
      const constituency = new Constituencies({
        name, state, from, to,
      });
      await constituency.save();
      return constituency;
    },
    createMember: async (_, {
      name, gender, dob, birth_place, marital_status, sons, daughters, education, profession, party, constituency, house, session,
    }) => {
      const temp = [];
      temp.push(profession);
      const temp2 = [];
      temp2.push({
        party,
        constituency,
        house,
        session,
      });
      const member = new Members({
        name, gender, dob, birth_place, marital_status, sons, daughters, education, profession: temp, terms: temp2,
      });
      await member.save();
      return member;
    },
    createQuestion: async (_, {
      subject, type, question, askedBy, answer, ministry, date,
    }) => {
      const questions = new Questions({
        subject, type, question, askedBy: [askedBy], answer, ministry, date,
      });
      await questions.save();
      return questions;
    },
  },
};
