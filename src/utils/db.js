import { MongoClient } from 'mongodb';

async function connectDB(){
    let client = await MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db();
}
const db = connectDB();
export default db;

