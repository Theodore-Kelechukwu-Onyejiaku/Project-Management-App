import { useState, useRef, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./components/Header";
import Clients from "./components/Clients";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"
import CreateClient from "./pages/CreateClient";
import { Link, Routes, Route } from "react-router-dom"
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import Context from "./assets/context/context";

function nullable() {
  // Create a generic field policy that allows any field to be null by default:
  return {
    read(existing = null) {
      return existing;
    },
  };
}


// merge incoming and existing query 
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // for clients
        clients: {
          merge(existing, incoming) {
            return incoming
          },

        },
        // for projects
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        },
      }
    },
  }
})

const client = new ApolloClient({
  uri: "/graphql",
  // uri: "http://localhost:5000/graphql",
  cache // add the created cache here
})

function App() {
  const [bodyClicked, setBodyClicked] = useState<boolean>(false)

  return (
    <ApolloProvider client={client}>
      <Context.Provider value={{ bodyClicked, setBodyClicked }}>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/create-client" element={<CreateClient />} />
            <Route path="/create-project" element={<CreateProject client={client} />} />
            <Route path="/404" element={<NotFound />} />
          </Route>
        </Routes>
      </Context.Provider>
    </ApolloProvider>
  );
}

export default App;