import { defineApolloClient } from "@nuxtjs/apollo";

export default defineApolloClient({
  httpEndpoint:
    process.env.EVENT_GRAPH_URL ||
    "https://honest-impala-91.hasura.app/v1/graphql",
  browserHttpEndpoint: process.env.EVENT_GRAPH_URL,
});
