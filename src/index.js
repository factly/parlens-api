import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressGraphQL from 'express-graphql';
import { MongoClient } from 'mongodb';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import fs from 'fs';
import uuidv1 from 'uuid/v1';
import 'dotenv/config';
import DataLoader from 'dataloader';

import GraphQLSchema from './graphql';
import batchMembers from './loaders/members';
import batchParties from './loaders/parties';
import batchGeographies from './loaders/geographies';
import batchHouses from './loaders/houses';
import batchParents from './loaders/parents';

const env = process.env.NODE_ENV || 'development';
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;
const MONGO_NAME = process.env.MONGODB_NAME || 'factly_parliament_search';

/* DB connection starts */

const mongo = MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(client => client.db(MONGO_NAME));

/*DB connection ends */

/* logging start */
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: 'YYYY-MM-DD'
});

const logger = createLogger({
    level: env === 'development' ? 'verbose' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        dailyRotateFileTransport,
    ]
});
/* logging ends */

const app = express();

app.use(cors());
app.use(
    bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 })
);
app.use(bodyParser.json({ limit: '50mb' }));

/* unique request ID starts */
app.use(function(req, res, next) {
    req.headers['request-id'] = uuidv1();
    next();
});
/* unique request ID ends */

const config = {
    db: {
        houses: 'houses',
        geographies: 'geography',
        parties: 'politicalPartiesUnique',
        members: 'cleanedMembers',
        questions: 'cleanedQuestions'
    }
};

const loaders =  {
    members: new DataLoader(async keys => batchMembers(keys, { db: await mongo, config })),
    parties: new DataLoader(async keys =>{ 
        console.log(keys)
        return batchParties(keys, { db: await mongo, config })
    }),
    geographies: new  DataLoader(async keys => batchGeographies(keys, { db: await mongo, config })),
    houses: new  DataLoader(async keys => batchHouses(keys, { db: await mongo, config })),
    parents: new  DataLoader(async keys => batchParents(keys, { db: await mongo, config })) 
};

app.use(
    '/graphql',
    expressGraphQL(async req => ({
        schema: GraphQLSchema,
        context: {
            db: await mongo,
            logger: (level, msg) =>
                logger.log(level, `${req.ip} ${req.headers['request-id']} ${msg}`),
            config,
            loaders
        },
        graphiql: env === 'development'
    }))
);

app.listen(PORT, function() {
    logger.info(`🚀 Server ready at ${PORT}`);
});

export default app;
