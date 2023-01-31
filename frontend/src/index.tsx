import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';

// merge incoming and existing query 
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // for clients
        clients: {
          merge(existing, incoming) {
            return incoming
          }
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
  uri: "http://localhost:5000/graphql",
  cache // add the created cache here
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
