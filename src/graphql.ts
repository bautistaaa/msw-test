import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://main--hack-the-e-commerce.apollographos.net/graphql",
});
export const makeClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([httpLink]),
    connectToDevTools: true,
  });

export const client = makeClient();
