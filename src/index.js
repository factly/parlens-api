import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import { MongoClient } from 'mongodb';

const context = () => MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }).then(client => client.db('test'));

import GraphQLSchema from './graphql';

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/graphql', expressGraphQL(req => ({
    schema: GraphQLSchema,
    context,
    graphiql: true
})
));

app.listen(3000, function () {
    console.log('🚀 Server ready at 3000');
});

export default app;