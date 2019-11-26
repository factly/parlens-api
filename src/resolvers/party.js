import { ObjectID } from 'mongodb';

export function index({ db }, { limit, page, q }) {
    let filter = {};
    if(q) filter.$or = [{ 'name': { $regex: q, $options: 'i' } }, { 'abbr': { $regex: q, $options: 'i' } }];
    
    const pageLimit = limit && limit > 0 && limit < 20 ? limit : 10;
    const pageSkip = page ? (page - 1) * pageLimit : 0;

    return db.collection('parties').find(filter).sort({ _id: -1 }).limit(pageLimit).skip(pageSkip).toArray();
}

export function single({ db }, { id }) {
    return db.collection('parties').findOne({ _id: new ObjectID(id) });
}