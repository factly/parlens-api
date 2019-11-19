import { ObjectID } from 'mongodb';

export function index({ db }, { q, questionBy, gender, dob, marital_status, sons, daughters, education, profession, expertise, term }) {
    let filter = {};
    if(q) filter.subject = { $regex: q, $options: 'i' };
    if(questionBy) filter['questionBy._id'] = { $in: questionBy.map(id => new ObjectID(id)) };
    if(gender) filter['questionBy.gender'] = gender;
    if(dob) filter['questionBy.dob'] = dob;
    if(marital_status) filter['questionBy.marital_status'] = { $in: marital_status };
    if(education) filter['questionBy.education'] = { $in: education };
    if(profession) filter['questionBy.profession'] = { $in : profession };
    if(expertise) filter['questionBy.expertise'] = { $in : expertise };
    if(sons) filter['questionBy.sons'] = { $in: sons };
    if(daughters) filter['questionBy.daughters'] = { $in: daughters };
    if(term) filter['questionBy.term'] = { $size: term };
    
    return db.collection('questions').aggregate([
        {
            '$unwind': {
                path: '$questionBy'
            }
        },
        {
            '$lookup': {
                from: 'members',
                localField: 'questionBy',
                foreignField: '_id',
                as: 'questionBy'
            }
        },
        {
            '$unwind': {
                path: '$questionBy'
            }
        },
        {
            '$group': {
                _id: '$_id',
                questionBy: { '$push': '$questionBy' },
                subject: { '$first': '$subject' },
                type: { '$first': '$type' },
                question: { '$first': '$question' },
                answer: { '$first': '$answer' },
                ministry: { '$first': '$ministry' }
            }
        },
        {
            '$match': filter
        },
    ]).toArray();
}

export function single({ db }, { id }) {
    return db.collection('questions').findOne({ _id: new ObjectID(id) });
}