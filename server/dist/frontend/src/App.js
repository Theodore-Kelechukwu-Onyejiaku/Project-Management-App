"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("@apollo/client");
const Layout_1 = __importDefault(require("./pages/Layout"));
const Home_1 = __importDefault(require("./pages/Home"));
const NotFound_1 = __importDefault(require("./pages/NotFound"));
const CreateClient_1 = __importDefault(require("./pages/CreateClient"));
const react_router_dom_1 = require("react-router-dom");
const Project_1 = __importDefault(require("./pages/Project"));
const CreateProject_1 = __importDefault(require("./pages/CreateProject"));
const context_1 = __importDefault(require("./assets/context/context"));
function nullable() {
    // Create a generic field policy that allows any field to be null by default:
    return {
        read(existing = null) {
            return existing;
        },
    };
}
// merge incoming and existing query 
const cache = new client_1.InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // for clients
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
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
function App() {
    const [bodyClicked, setBodyClicked] = (0, react_1.useState)(false);
    return (<client_1.ApolloProvider client={client}>
      <context_1.default.Provider value={{ bodyClicked, setBodyClicked }}>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path='/' element={<Layout_1.default />}>
            <react_router_dom_1.Route index element={<Home_1.default />}/>
            <react_router_dom_1.Route path="/project/:id" element={<Project_1.default />}/>
            <react_router_dom_1.Route path="/create-client" element={<CreateClient_1.default />}/>
            <react_router_dom_1.Route path="/create-project" element={<CreateProject_1.default client={client}/>}/>
            <react_router_dom_1.Route path="/404" element={<NotFound_1.default />}/>
          </react_router_dom_1.Route>
        </react_router_dom_1.Routes>
      </context_1.default.Provider>
    </client_1.ApolloProvider>);
}
exports.default = App;
