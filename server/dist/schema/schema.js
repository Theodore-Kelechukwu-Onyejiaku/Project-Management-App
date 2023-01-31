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
const axios_1 = __importDefault(require("axios"));
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
    project: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield Project_1.default.findById(id).populate("client");
        return project;
    }),
    projects: () => __awaiter(void 0, void 0, void 0, function* () {
        let projects = yield Project_1.default.find().populate("client");
        return projects;
    }),
};
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
// for mutations 
exports.mutation = {
    // add client
    addClient: ({ name, email, phone, gender }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const randomUser = yield axios_1.default.get(`https://randomuser.me/api/?gender=${gender}`);
            const { data: { results } } = yield randomUser;
            const random = generateString(5);
            const client = new Client_1.default({
                name, email, phone, gender,
                picture: results[0].picture.medium,
                street: results[0].location.street.number + " " + results[0].location.street.name,
                country: results[0].location.country,
                age: results[0].dob.age,
                random
            });
            return yield client.save();
        }
        catch (error) {
            throw error;
        }
    }),
    // delete client
    deleteClient: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
        Project_1.default.find({ client: id }).then(projects => {
            projects.forEach(project => {
                project.remove();
            });
        });
        return yield Client_1.default.findByIdAndRemove(id);
    }),
    // add project
    addProject: ({ name, description, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const theClient = yield Client_1.default.findById(client);
        const random = generateString(5);
        const project = new Project_1.default({
            name, description, client, random
        });
        yield project.save();
        yield project.populate("client");
        return project;
    }),
    // delete project
    deleteProject: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedProject = yield Project_1.default.findByIdAndRemove(id);
        yield (deletedProject === null || deletedProject === void 0 ? void 0 : deletedProject.populate("client"));
        return deletedProject;
    }),
    updateProject: ({ id, name, description, status }) => __awaiter(void 0, void 0, void 0, function* () {
        let updatedProject = yield Project_1.default.findByIdAndUpdate(id, { $set: { name, description, status } }, { new: true });
        yield (updatedProject === null || updatedProject === void 0 ? void 0 : updatedProject.populate("client"));
        return updatedProject;
    }),
};
// creating Schemas
exports.schema = (0, graphql_1.buildSchema)(`
    enum Status {
          notStarted
          inProgress
          completed
    }
    enum Gender {
        male
        female
    }

    type Client {
         id: ID
         name: String
         email: String
         gender: String
         phone: String
         picture: String
         street: String
         country: String
         age: String
         random: String
    }
    type Project {
        id: ID
        name: String
        description: String
        status: String
        random: String
        client: Client
    }

    type Query{
        client(id : String): Client
        clients: [Client]
        project(id: String): Project
        projects: [Project]
    }
    
    type Mutation {
        addClient(name: String!, email: String!, phone: String!, gender: Gender!) : Client
        deleteClient(id:String!): Client
        addProject(name: String!, description: String!, client: String!) : Project
        deleteProject(id: String!): Project
        updateProject(id: String!, name: String, description: String, status: Status) : Project
    }
`);
