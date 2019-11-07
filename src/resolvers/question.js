import { ObjectID } from 'mongodb';

export function index({db}) {
    return db.collection('questions').find({}).toArray();
}

export function single({db}, { id }) {
    return db.collection('questions').findOne({ _id: new ObjectID(id) });
}

export function search({db}, { q }){
    return db.collection('parties').find({ $or: [
        { 'subject': { $regex: q, $options: 'i' } }, 
        { 'question': { $in : { $regex: q, $options: 'i' } } }, 
        { 'answer': { $regex: q, $options: 'i' } }
    ] }).toArray();
}