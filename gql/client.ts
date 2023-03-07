import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"
import Cookies from "js-cookie"

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include",
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

export default client
