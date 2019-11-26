import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

import GraphQLSchema from './graphql';

const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

const mongo = MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => client.db('test'));

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/graphql', expressGraphQL( async () => ({
    schema: GraphQLSchema,
    context: {
        db: await mongo
    },
    graphiql: process.env.NODE_ENV === 'development'
})
));

app.listen(PORT, function () {
    console.log(`🚀 Server ready at ${PORT}`);
});

export default app;