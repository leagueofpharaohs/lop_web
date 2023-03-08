import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"
import Cookies from "js-cookie"

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include",
})

const authLink = setContext((_, {headers}) => {
  const accessToken = Cookies.get("_at")
  const refreshToken = Cookies.get("_rt")

  return {
    headers: {
      ...headers,

      cookie: `_at=${accessToken}`,
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
})

export default client
