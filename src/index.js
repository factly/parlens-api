import { ApolloServer  } from 'apollo-server';
import mongoose from "mongoose";
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect("mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});