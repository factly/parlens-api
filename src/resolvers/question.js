import { ObjectID } from 'mongodb';

export function index(
    { db, logger, config }, 
    { 
        limit, page, 
        q, house, type, ministry, questionBy, 
        gender, dob, marital_status, sons, daughters, education, profession, expertise, 
        term, party, constituency 
    }
) {
    let filter = {}; 
    if(q) filter.subject = { $regex: q, $options: 'i' };
    if(house) filter.house = house;
    if(type) filter.type = type;
    if(ministry) filter.ministry = ministry;
    if(questionBy) filter['questionBy.MID'] = { $in: questionBy };
    if(gender) filter['questionBy.gender'] = gender;
    if(dob) filter['questionBy.dob'] = dob;
    if(marital_status) filter['questionBy.marital_status'] = { $in: marital_status };
    if(education) filter['questionBy.education'] = { $in: education };
    if(profession) filter['questionBy.profession'] = { $in : profession };
    if(expertise) filter['questionBy.expertise'] = { $in : expertise };
    if(sons) filter['questionBy.sons'] = { $in: sons };
    if(daughters) filter['questionBy.daughters'] = { $in: daughters };
    if(term) filter['questionBy.terms'] = { $size: term };
    if(party) filter['questionBy.terms.party.PID'] = { $in: party }; 
    if(constituency) filter['questionBy.terms.constituency.CID'] = { $in: constituency }; 
    
    const pageLimit = limit && limit > 0 && limit < 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;

    logger('info', 'fetching questions for query ' + JSON.stringify(filter));

    return db.collection(config.db.questions).aggregate([
        {
            $lookup: {
                from: config.db.members,
                let: { questionBy: '$questionBy' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$MID', '$$questionBy'] }
                        } 
                    },
                    {
                        $unwind: { path: '$terms', preserveNullAndEmptyArrays: true }
                    },
                    {
                        $lookup: {
                            'from': config.db.parties, 
                            'localField': 'terms.party',
                            'foreignField': 'PID',
                            'as': 'terms.party'
                        }
                    }, 
                    {
                        $lookup: {
                            'from': config.db.constituencies, 
                            'localField': 'terms.constituency',
                            'foreignField': 'CID',
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
                            'MID': { '$first': '$MID' },
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
        {
            $sort: { QID: -1 }
        },
        {
            $skip: pageSkip
        },
        {
            $limit: pageLimit  
        },
    ]).toArray();
}

export async function single({ db, logger, config }, { id }) {

    logger('info', 'fetching question for ' + id);
    
    const result = await db.collection(config.db.questions).aggregate([
        {
            $lookup: {
                from: config.db.members,
                let: { questionBy: '$questionBy' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$MID', '$$questionBy'] }
                        } 
                    },
                    {
                        $unwind: { path: '$terms', preserveNullAndEmptyArrays: true }
                    },
                    {
                        $lookup: {
                            'from': config.db.parties, 
                            'localField': 'terms.party',
                            'foreignField': 'PID',
                            'as': 'terms.party'
                        }
                    }, 
                    {
                        $lookup: {
                            'from': config.db.constituencies, 
                            'localField': 'terms.constituency',
                            'foreignField': 'CID',
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
                            'MID': { '$first': '$MID' },
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
            $match: {
                QID: id
            }
        },
    ]).toArray();
    if(result.length === 1) return result[0];
}