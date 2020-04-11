import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressGraphQL from 'express-graphql';
import { GraphQLError } from 'graphql';
import { MongoClient } from 'mongodb';
import uuidv1 from 'uuid/v1';
import 'dotenv/config';

import GraphQLSchema from './graphql';
import logger from './logger';
import config from './config';
import loader from './loaders';

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

app.use(
    '/graphql',
    expressGraphQL(async req => { 
        const context = {
            logger: (level, msg) => logger.log(level, `[IP:${req.ip}] [request-id:${req.headers['request-id']}] ${msg}`),
            config,
            db: await mongo
        };
        return{
            schema: GraphQLSchema,
            context: {
                ...context,
                loaders: new loader(context).get()
            },
            graphiql: env === 'development',
            customFormatErrorFn: error => ({
                message: error.message
            })
        };
    })
);

app.listen(PORT, function() {
    logger.info(`🚀 Server ready at ${PORT}`);
});