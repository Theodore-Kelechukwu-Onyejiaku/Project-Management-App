"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.root = void 0;
const graphql_1 = require("graphql");
const Project_1 = __importDefault(require("../models/Project"));
const Client_1 = __importDefault(require("../models/Client"));
// root Query
exports.root = {
    client: ({ id }) => {
        return Client_1.default.findById(id);
    },
    clients: () => {
        return Client_1.default.find();
    },
    project: ({ id }) => {
        // let result;
        // let project = projects.find(project => project.id === id)
        // let client = clients.find(client => client.id === id)
        // console.log(client)
        // result = { ...project, "client": client }
        // console.log(result)
        // return result
        const project = Project_1.default.findById(id);
        const client = Client_1.default.findById(id);
        return Object.assign(Object.assign({}, project), { "client": client });
    },
    projects: () => {
        return Project_1.default.find();
    }
};
exports.schema = (0, graphql_1.buildSchema)(`
    type Query{
        client(id : String): Client
        clients: [Client]
        project(id: String): Project
        projects: [Project]
    }
    type Client {
         id: ID
         name: String
         email: String
         phone: String
    }
    type Project {
        id: ID,
        name: String,
        description: String,
        status: String
        client: Client
    }
`);
