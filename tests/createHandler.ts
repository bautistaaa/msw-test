import { createHandler } from "@apollo/graphql-testing-library";

// We suggest using @graphql-tools/mock and @graphql-tools/schema
// to create a schema with mock resolvers.
// See https://the-guild.dev/graphql/tools/docs/mocking for more info.
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.graphql";

// Create an executable schema
const schema = makeExecutableSchema({ typeDefs });

// Add mock resolvers
const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers: {
    Query: {
      products: () =>
        Array.from({ length: 5 }, (_element, id) => ({
          id: `product-${id}`,
        })),
    },
  },
});

// `createHandler` returns an object with a `handler` and `replaceSchema`
// function: `handler` is a MSW handler that will intercept all GraphQL
// operations, and `replaceSchema` allows you to replace the mock schema
// the `handler` use to resolve requests against.
const { handler, replaceSchema } = createHandler(schemaWithMocks, {
  // It accepts a config object as the second argument where you can specify a
  // delay min and max, which will add random delays to your tests within the /
  // threshold to simulate a real network connection.
  // Default: delay: { min: 300, max: 300 }
  delay: { min: 200, max: 500 },
});
