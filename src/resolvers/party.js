import { ObjectID } from 'mongodb';

export function index({ db }, { q }) {
    let filter = {};
    if(q) filter.$or = [{ 'name': { $regex: q, $options: 'i' } }, { 'abbr': { $regex: q, $options: 'i' } }];
    
    return db.collection('parties').find(filter).toArray();
}

export function single({ db }, { id }) {
    return db.collection('parties').findOne({ _id: new ObjectID(id) });
}