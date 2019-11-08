import { ObjectID } from 'mongodb';

export function index({ db }) {
    return db.collection('parties').find().toArray();
}

export function single({ db }, { id }) {
    return db.collection('parties').findOne({ _id: new ObjectID(id) });
}

export function search({ db }, { q }){
    return db.collection('parties').find({ $or: [{ 'name': { $regex: q, $options: 'i' } }, { 'abbr': { $regex: q, $options: 'i' } }]  }).toArray();
}