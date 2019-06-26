const dotenv = require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const Q = require('Q');


class Database {
    constructor() {
        this.client = null;
        this.db = null;
        this.getDb(process.env.DB);
    }

    getConnection() {
        var uri = process.env.MONGODB_URI;
        console.log(uri);
        return Q(mongoClient.connect(uri, { useNewUrlParser: true }))
            .then((ret, err) => {
                if (err) {
                    const msg = (err) ? err.stack : err;
                    // logger.error(`Error connecting to MongoDB uri: ${uri} error: ${msg}`);
                    console.log(`Error connecting to MongoDB uri: ${uri} error: ${msg}`);
                    throw Error(err);
                }
                console.log("Connection Successful");
                return ret;
            });
    }

    getDb(name) {
        if (!this.client) {
            Q(this.getConnection())
                .then((ret, err) => {
                    if (err) {
                        console.log(err);
                        throw Error(err);
                    }
                    this.client = ret;
                }).then((ret,err) => {
                    if (err)
                    {
                        console.log(err);
                        throw Error(err);
                    }
                    this.db = this.client.db(name);
                    console.log("Database Selection Successful");
                });
        }
        else {
            Q(this.client.db(name))
                .then((ret, err) => {
                    if (err)
                    {
                        console.log(err);
                        throw Error(err);
                    }
                    this.db = ret;
                    console.log("Database Selection Successful");
                });
        }
    }
}
const db = new Database();
module.exports = db;