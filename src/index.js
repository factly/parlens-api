import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';

import GraphQLSchema from './graphql';

const app = express();

/*mongoose.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});*/

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/graphql', expressGraphQL(req => ({
    schema: GraphQLSchema,
    context: req.context,
    graphiql: true,
  })
));

app.listen(3000, function () {
  console.log(`🚀 Server ready at 3000`);
});

module.exports = app;