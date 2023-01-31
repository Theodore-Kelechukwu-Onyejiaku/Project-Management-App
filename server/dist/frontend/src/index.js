"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("@apollo/client");
const client_2 = __importDefault(require("react-dom/client"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const react_router_dom_1 = require("react-router-dom");
// merge incoming and existing query 
const cache = new client_1.InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // for clients
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
                // for projects
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
            }
        },
    }
});
const client = new client_1.ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache // add the created cache here
});
const root = client_2.default.createRoot(document.getElementById('root'));
root.render(<react_1.default.StrictMode>
    <react_router_dom_1.BrowserRouter>
      <App_1.default />
    </react_router_dom_1.BrowserRouter>
  </react_1.default.StrictMode>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
