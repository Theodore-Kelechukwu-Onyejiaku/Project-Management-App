import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./components/Header";
import Clients from "./components/Clients";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="text text-lg overflow-hidden">
        <Clients/>
      </div>
    </ApolloProvider>
  );
}

export default App;