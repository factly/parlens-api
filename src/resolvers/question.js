import { ObjectID } from 'mongodb';

export function index({ db }, { q }) {
    let filter = {}
    if(q) filter.$or = [
        { 'subject': { $regex: q, $options: 'i' } }, 
        { 'question': { $in : { $regex: q, $options: 'i' } } }, 
        { 'answer': { $regex: q, $options: 'i' } },
    ]
    return db.collection('questions').find(filter).toArray();
}

export function single({ db }, { id }) {
    return db.collection('questions').findOne({ _id: new ObjectID(id) });
}