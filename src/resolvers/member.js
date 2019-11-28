import { ObjectID } from 'mongodb';

export function	index(
    { db, logger }, 
    { 
        limit, page, 
        name, gender, dob, marital_status, sons, daughters, education, profession, expertise, 
        term, party, constituency, house, session 
    }
) {
    let filter = {};
    if(name) filter.name = { $regex: name, $options: 'i' };
    if(gender) filter.gender = gender;
    if(dob) filter.dob = dob;
    if(marital_status) filter.marital_status = { $in: marital_status };
    if(education) filter.education = { $in: education };
    if(profession) filter.profession = { $in : profession };
    if(expertise) filter.expertise = { $in : expertise };
    if(sons) filter.sons = { $in: sons };
    if(daughters) filter.daughters = { $in: daughters };
    if(term) filter.terms = { $size: term };
    if(party) filter['terms.party'] = { $in: party.map(id => new ObjectID(id)) };
    if(constituency) filter['terms.constituency'] = { $in: constituency.map(id => new ObjectID(id)) };
    if(house) filter['terms.house'] = { $in: house };
    if(session) filter['terms.session'] = { $in: session };

    const pageLimit = limit && limit > 0 && limit < 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;
    
    logger.info('fetching members for query ' + JSON.stringify(filter));

    return db.collection('members').aggregate([
        {
            $match: filter
        },
        {
            $unwind: {
                'path': '$terms'
            }
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
        {
            $sort: { _id: -1 }
        },
        {
            $skip: pageSkip
        },
        {
            $limit: pageLimit
        },
    ]).toArray();
}

export async function single({ db, logger }, { id }) {

    logger.info('fetching member for ' + id);

    const result = await db.collection('members').aggregate([
        {
            '$match': {
                '_id': new ObjectID(id)
            }
        },
        {
            '$unwind': {
                'path': '$terms'
            }
        }, 
        {
            '$lookup': {
                'from': 'parties', 
                'localField': 'terms.party',
                'foreignField': '_id',
                'as': 'terms.party'
            }
        }, 
        {
            '$lookup': {
                'from': 'constituencies', 
                'localField': 'terms.constituency',
                'foreignField': '_id',
                'as': 'terms.constituency'
            }
        }, 
        { '$unwind': '$terms.constituency' }, 
        { '$unwind': '$terms.party' }, 
        {
            '$group': {
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
    ]).toArray();
    if(result.length === 1) return result[0];
}