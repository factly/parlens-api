import { ObjectID } from 'mongodb';

export function	index(context) {
    return context().then(db => db.collection('members').find({}).toArray());
}

export function single(context, { id }) {
    return context().then(db => db.collection('members').findOne({ _id: new ObjectID(id) }));
}
