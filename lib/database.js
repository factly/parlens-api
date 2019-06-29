const dotenv = require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const Q = require('Q');
const winston = require('winston');
const utils = require('../lib/utils');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});
const dbUri = process.env.MONGODB_URI;
const dbName = process.env.DB;

class Database {
    constructor() {
        this.client = null;
    }

    getDb(name) {
        if(!name) {
            name = dbName;
        }
        return this.client.db(name);
    }

    getConnection(uri, logger) {
        return Q(mongoClient.connect(uri, { useNewUrlParser: true }))
            .then((ret, err) => {
                if (err) {
                    const msg = (err) ? err.stack : err;
                    logger.error(`Error connecting to MongoDB uri: ${uri} error: ${msg}`);
                    throw Error(err);
                }
                this.client = ret;
            });
    }

    config(logger) {
        return utils.retry(5, 20000, (() => this.getConnection(dbUri)), logger);
    }

    closeConnection() {
        return Q(this.client.close());
    }

}

const db = new Database();

module.exports = db;



// var _db;

// module.exports = {
//     'connectToServer': function (callback) {
//         mongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
//             _db = client.db(db);
//             return callback(err);
//         });
//     },

//     'getDb': function () {
//         while(!_db) {

//         }
//         logger.info("Database connection established");
//         return _db;
//     },

//     'closeDB': function (callback) {
//         _db.close();
//         return callback(err);
//     }
// };

// class Database {
//     constructor() {
//         this.client = null;
//         this.db = null;
//     }

//     getConnection() {
//         if (!this.client) {
//             var uri = process.env.MONGODB_URI;
//             Q(mongoClient.connect(uri, { useNewUrlParser: true }))
//                 .then((ret, err) => {
//                     if (err) {
//                         const msg = (err) ? err.stack : err;
//                         console.log(`Error connecting to MongoDB, error: ${msg}`);
//                         throw Error(err);
//                     }
//                     console.log("Connection Successful");
//                     return ret;
//                 });
//         }
//         console.log(uri);
//         return
//     }

//     getDb(name) {
//         if (!this.client) {
//             Q(this.getConnection())
//                 .then((ret, err) => {
//                     if (err) {
//                         console.log(err);
//                         throw Error(err);
//                     }
//                     this.client = ret;
//                 }).then((ret, err) => {
//                     if (err) {
//                         console.log(err);
//                         throw Error(err);
//                     }
//                     this.db = this.client.db(name);
//                     console.log("Database Selection Successful");
//                 });
//         }
//         else {
//             Q(this.client.db(name))
//                 .then((ret, err) => {
//                     if (err) {
//                         console.log(err);
//                         throw Error(err);
//                     }
//                     this.db = ret;
//                     console.log("Database Selection Successful");
//                 });
//         }
//     }
// }
// var db = new Database();
// module.exports = {
//     "connect": function (callback) {
//         if (!db.db) {

//         }
//     }
// }