// src/apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  //uri: ' http://localhost:4000/graphql', // Replace with your GraphQL server URL
  uri:"https://jobswomen.com/graphql",
  cache: new InMemoryCache(),
   
});

export default client;
