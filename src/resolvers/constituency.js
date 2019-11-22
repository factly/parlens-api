import { ObjectID } from 'mongodb';

export function index({ db }, { q }) {
    let filter = {};
    if(q) filter.name = { $regex: q, $options: 'i' };
    
    return db.collection('constituencies').find(filter).toArray();
}

export function single({ db }, { id }) {
    return db.collection('constituencies').findOne({ _id: new ObjectID(id) });
}