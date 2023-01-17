"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.mutation = exports.root = void 0;
const graphql_1 = require("graphql");
const Project_1 = __importDefault(require("../models/Project"));
const Client_1 = __importDefault(require("../models/Client"));
// root Query (for queries)
exports.root = {
    client: ({ id }) => {
        return Client_1.default.findById(id);
    },
    clients: () => {
        return Client_1.default.find();
    },
    project: ({ id }) => {
        const project = Project_1.default.findById(id);
        const client = Client_1.default.findById(id);
        return Object.assign(Object.assign({}, project), { "client": client });
    },
    projects: () => {
        return Project_1.default.find();
    },
};
// for mutations 
exports.mutation = {
    // add client
    addClient: ({ name, email, phone }) => __awaiter(void 0, void 0, void 0, function* () {
        const client = new Client_1.default({
            name, email, phone
        });
        yield client.save();
        console.log("The client".cyan, client);
        return client;
    }),
    // delete client
    deleteClient: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Client_1.default.findByIdAndRemove(id);
    }),
    // add project
    addProject: ({ name, description, status, clientId }) => __awaiter(void 0, void 0, void 0, function* () {
        const project = new Project_1.default({
            name, description, status, clientId
        });
        yield project.save();
        console.log("The project".cyan, project);
        return project;
    }),
    // delete project
    deleteProject: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Project_1.default.findByIdAndRemove(id);
    }),
    updateProject: ({ id, name, description, status }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Project_1.default.findByIdAndUpdate(id, { $set: { name, description, status } }, { new: true });
    })
};
var RGBType = new graphql_1.GraphQLEnumType({
    name: 'RGB',
    values: {
        RED: { value: 0 },
        GREEN: { value: 1 },
        BLUE: { value: 2 }
    }
});
// creating Schemas
exports.schema = (0, graphql_1.buildSchema)(`
    enum Status {
          notStarted
          inProgress
          completed
    }

    type Client {
         id: ID
         name: String
         email: String
         phone: String
    }
    type Project {
        id: ID
        name: String
        description: String
        status: String
        clientId: String
    }

    type Query{
        client(id : String): Client
        clients: [Client]
        project(id: String): Project
        projects: [Project]
    }
    
    type Mutation {
        addClient(name: String!, email: String!, phone: String!) : Client
        deleteClient(id:String!): Client
        addProject(name: String!, description: String!, status: Status, clientId: String) : Project
        deleteProject(id: String!): Project
        updateProject(id: String!, name: String, description: String, status: Status) : Project
    }
`);
