import { defineApolloClient } from "@nuxtjs/apollo";

export default defineApolloClient({
  httpEndpoint: process.env.EVENT_GRAPH_URL,
  browserHttpEndpoint: process.env.EVENT_GRAPH_URL,
  tokenName: "event_management_custom_token",
  httpLinkOptions: {},
  websocketsOnly: false,
  defaultOptions: {},
  inMemoryCacheOptions: {},
});
