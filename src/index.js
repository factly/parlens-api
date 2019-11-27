import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import { MongoClient } from 'mongodb';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import fs from 'fs';
import 'dotenv/config';

import GraphQLSchema from './graphql';

const env = process.env.NODE_ENV || 'development';
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

/* DB connection starts */

const mongo = MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => client.db('test'));

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

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/graphql', expressGraphQL( async () => ({
    schema: GraphQLSchema,
    context: {
        db: await mongo,
        logger
    },
    graphiql: env === 'development'
})
));

app.listen(PORT, function () {
    logger.info(`🚀 Server ready at ${PORT}`);
});

export default app;