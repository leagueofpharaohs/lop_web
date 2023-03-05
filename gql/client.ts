import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client"

const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
  credentials: "include",
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
