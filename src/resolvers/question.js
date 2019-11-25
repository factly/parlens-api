import { ObjectID } from 'mongodb';

export function index({ db }, { q, house, type, ministry, questionBy, gender, dob, marital_status, sons, daughters, education, profession, expertise, term, party, constituency }) {
    let filter = {}; 
    if(q) filter.subject = { $regex: q, $options: 'i' };
    if(house) filter.house = house;
    if(type) filter.type = type;
    if(ministry) filter.ministry = ministry;
    if(questionBy) filter['questionBy._id'] = { $in: questionBy.map(id => new ObjectID(id)) };
    if(gender) filter['questionBy.gender'] = gender;
    if(dob) filter['questionBy.dob'] = dob;
    if(marital_status) filter['questionBy.marital_status'] = { $in: marital_status };
    if(education) filter['questionBy.education'] = { $in: education };
    if(profession) filter['questionBy.profession'] = { $in : profession };
    if(expertise) filter['questionBy.expertise'] = { $in : expertise };
    if(sons) filter['questionBy.sons'] = { $in: sons };
    if(daughters) filter['questionBy.daughters'] = { $in: daughters };
    if(term) filter['questionBy.terms'] = { $size: term };
    if(party) filter['questionBy.terms.party._id'] = { $in: party.map(id => new ObjectID(id)) }; 
    if(constituency) filter['questionBy.terms.constituency._id'] = { $in: constituency.map(id => new ObjectID(id)) }; 
    
    return db.collection('questions').aggregate([
        {
            $lookup: {
                from: 'members',
                let: { questionBy: '$questionBy' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$_id', '$$questionBy'] }
                        } 
                    },
                    {
                        $unwind: { path: '$terms', preserveNullAndEmptyArrays: true }
                    },
                    {
                        $lookup: {
                            'from': 'parties', 
                            'localField': 'terms.party',
                            'foreignField': '_id',
                            'as': 'terms.party'
                        }
                    }, 
                    {
                        $lookup: {
                            'from': 'constituencies', 
                            'localField': 'terms.constituency',
                            'foreignField': '_id',
                            'as': 'terms.constituency'
                        }
                    }, 
                    { 
                        $unwind: '$terms.constituency' 
                    }, 
                    {
                        $unwind: '$terms.party' 
                    }, 
                    {
                        $group: {
                            '_id': '$_id', 
                            'terms': { '$push': '$terms' }, 
                            'gender': { '$first': '$gender' },
                            'name': { '$first': '$name' },
                            'dob': { '$first': '$dob' },
                            'birth_place': { '$first': '$birth_place' },
                            'marital_status': { '$first': '$marital_status' },
                            'sons': { '$first': '$sons' },
                            'daughters': { '$first': '$daughters' },
                            'email': { '$first': '$email' },
                            'phone': { '$first': '$phone' },
                            'education': { '$first': '$education' },
                            'expertise': { '$first': '$expertise' },
                            'profession': { '$first': '$profession' }
                        }
                    },
                ],
                as: 'questionBy'
            }
        },
        {
            $match: filter
        },
    ]).toArray();
}

export function single({ db }, { id }) {
    return db.collection('questions').findOne({ _id: new ObjectID(id) });
}