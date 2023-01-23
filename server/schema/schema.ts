import { buildSchema, GraphQLEnumType } from "graphql"
import axios from "axios"

import ProjectModel from "../models/Project"
import ClientModel from "../models/Client"

// root Query (for queries)
export const root = {
    client: ({ id }: { id: string }) => {
        return ClientModel.findById(id)
    },
    clients: () => {
        return ClientModel.find()
    },
    project: ({ id }: { id: string }) => {
        const project = ProjectModel.findById(id);
        const client = ClientModel.findById(id);
        return { ...project, "client": client }
    },

    projects: () => {
        return ProjectModel.find()
    },
    randomUsers: async ({ num }: { num: string }) => {

    }
}

// Person Interface
interface Person {
    name: string,
    email: string,
    phone: string,
    gender: string,
    picture?: String,
    street?: String,
    country?: String,
    age?: String,
}

// Project Interface
interface Project {
    id?: string
    name: string,
    description: string,
    status: string,
    clientId?: string
}

// for mutations 
export const mutation = {
    // add client
    addClient: async ({ name, email, phone, gender }: Person) => {
        const randomUser = await axios.get(`https://randomuser.me/api/?gender=${gender}`)
        const { data: { results } } = await randomUser
        console.log(results[0])
        const client = new ClientModel({
            name, email, phone, gender,
            picture: results[0].picture.medium,
            street: results[0].location.street.number + " " + results[0].location.street.name,
            country: results[0].location.country,
            age: results[0].dob.age,
        })

        return await client.save()
    },
    // delete client
    deleteClient: async ({ id }: { id: string }) => {
        return await ClientModel.findByIdAndRemove(id)
    },
    // add project
    addProject: async ({ name, description, status, clientId }: Project) => {
        const project = new ProjectModel({
            name, description, status, clientId
        })
        await project.save();
        return project;
    },
    // delete project
    deleteProject: async ({ id }: { id: string }) => {
        return await ProjectModel.findByIdAndRemove(id)
    },
    updateProject: async ({ id, name, description, status }: Project) => {
        return await ProjectModel.findByIdAndUpdate(id, { $set: { name, description, status } }, { new: true })
    },
}


// creating Schemas
export const schema = buildSchema(`
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
        addClient(name: String!, email: String!, phone: String!, gender: Gender!) : Client
        deleteClient(id:String!): Client
        addProject(name: String!, description: String!, status: Status, clientId: String) : Project
        deleteProject(id: String!): Project
        updateProject(id: String!, name: String, description: String, status: Status) : Project
    }
`)

