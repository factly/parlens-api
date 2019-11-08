import { ObjectID } from 'mongodb';

export function	index({ db }, { name, gender, dob, marital_status, sons, daughters, education, profession, expertise, term, party, constituency, house, session }) {
    let filter = {};
    if(name) filter.name = { $regex: name, $options: 'i' };
    if(gender) filter.gender = gender;
    if(dob) filter.gender = dob;
    if(marital_status) filter.marital_status = { $in: marital_status };
    if(education) filter.education = { $in: education };
    if(profession) filter.profession = { $in : profession };
    if(expertise) filter.expertise = { $in : expertise };
    if(sons) filter.sons = { $in: sons };
    if(daughters) filter.daughters = { $in: daughters };
    if(term) filter.terms = { $size: term };
    if(party) filter['terms.party._id'] = { $in: party.map(id => new ObjectID(id)) };
    if(constituency) filter['terms.constituency._id'] = { $in: constituency.map(id => new ObjectID(id)) };
    if(house) filter['terms.house'] = { $in: house };
    if(session) filter['terms.session'] = { $in: session };
    
    return db.collection('members').aggregate([
        {
            '$unwind': {
                'path': '$terms'
            }
        }, 
        {
            '$lookup': {
                'from': 'parties', 
                'let': { 'party_id': '$terms.party' }, 
                'pipeline': [
                    {
                        '$match': { '$expr': { '$eq': [ '$_id', '$$party_id' ] } }
                    },   
                ], 
                'as': 'terms.party'
            }
        }, 
        {
            '$lookup': {
                'from': 'constituencies', 
                'let': { 'constituency_id': '$terms.constituency' }, 
                'pipeline': [
                    {
                        '$match': { '$expr': { '$eq': [ '$_id', '$$constituency_id' ] } }
                    },
                ], 
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
        {
            '$match': filter
        },
    ]).toArray();
}

export async function single({ db }, { id }) {
    const result = await db.collection('members').aggregate([
        {
            '$unwind': {
                'path': '$terms'
            }
        }, 
        {
            '$lookup': {
                'from': 'parties', 
                'let': { 'party_id': '$terms.party' }, 
                'pipeline': [
                    {
                        '$match': { '$expr': { '$eq': [ '$_id', '$$party_id' ] } }
                    },   
                ], 
                'as': 'terms.party'
            }
        }, 
        {
            '$lookup': {
                'from': 'constituencies', 
                'let': { 'constituency_id': '$terms.constituency' }, 
                'pipeline': [
                    {
                        '$match': { '$expr': { '$eq': [ '$_id', '$$constituency_id' ] } }
                    },
                ], 
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
        { 
            '$match': {
                '_id': new ObjectID(id)
            }
        },
    ]).toArray();
    if(result.length === 1) return result[0];
}

export function search({ db }, { q }){
    return db.collection('members').find({ 'name': { $regex: q, $options: 'i' } }).toArray();
}