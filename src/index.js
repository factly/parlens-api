import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";

const app = express();

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true
});
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/graphql', expressGraphQL(req => ({
    schema: GraphQLSchema,
    context: req.context,
    graphiql: process.env.NODE_ENV === 'development',
  })
));

app.listen(process.env.PORT, function () {
  console.log(`🚀 Server ready at ${process.env.PORT}`);
});

module.exports = app;