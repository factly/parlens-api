import { ObjectID } from 'mongodb';

export function	index({db}) {
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
                        '$match': { '$expr': { '$eq': [ '$_id', '$$party_id' ]}}
                    }   
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
                        '$match': { '$expr': { '$eq': [ '$_id', '$$constituency_id' ]}}
                    }
                ], 
                'as': 'terms.constituency'
            }
        }, 
        { '$unwind': '$terms.constituency'}, 
        { '$unwind': '$terms.party'}, 
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
                'profession': { '$first': '$profession' },
            }
        }
    ]).toArray()
}

export function single({db}, { id }) {
    return db.collection('members').findOne({ _id: new ObjectID(id) });
}

export function search({db}, { q }){
    return db.collection('members').find({ 'name': { $regex: q, $options: 'i' } }).toArray();
}