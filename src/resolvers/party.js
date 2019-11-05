import { ObjectID } from 'mongodb';

export function index(context) {
    return context().then(db => db.collection('parties').find().toArray());
}

export function single(context, { id }) {
    return context().then(db => db.collection('parties').findOne({ _id: new ObjectID(id) }));
}

export function search(context, { q }){
    return context().then(db => db.collection('parties').find({ $or: [{ 'name': { $regex: q, $options: 'i' } }, { 'abbr': { $regex: q, $options: 'i' } }]  }).toArray());
}