import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = 'mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test'
const PORT = process.env.PORT || 4000;

const mongo = MongoClient.connect(encodeURI(MONGO_URI), { useNewUrlParser: true, useUnifiedTopology: true }).then(client => client.db('test'));

import GraphQLSchema from './graphql';

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/graphql', expressGraphQL( async () => ({
    schema: GraphQLSchema,
    context: {
        db: await mongo
    },
    graphiql: true
})
));

app.listen(PORT, function () {
    console.log(`🚀 Server ready at ${PORT}`);
});

export default app;