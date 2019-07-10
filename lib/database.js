const dotenv = require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const Q = require('q');
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