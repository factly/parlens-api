import { ObjectID } from 'mongodb';

//Promise way of data filter
export function index(context) {
    return context()
        .then(db => 
            db.collection('constituencies').find({}).toArray()
        ).then( final => { 
            return { nodes: final, edges: { next: 'next', prev: 'prev', hasNext: true, hasPrev: true } };
        });
}

export function single(context, { id }) {
    return context().then(db => db.collection('constituencies').findOne({ _id: new ObjectID(id) }));
}