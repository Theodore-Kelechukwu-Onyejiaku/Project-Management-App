import { buildSchema, GraphQLEnumType } from "graphql"
import axios from "axios"

import ProjectModel from "../models/Project"
import ClientModel from "../models/Client"
import { ObjectId } from "mongoose"

// root Query (for queries)
export const root = {
    client: ({ id }: { id: string }) => {
        return ClientModel.findById(id)
    },
    clients: () => {
        return ClientModel.find()
    },
    project: async ({ id }: { id: string }) => {
        const project = await ProjectModel.findById(id).populate("client");
        return project
    },

    projects: async () => {
        let projects = await ProjectModel.find().populate("client");
        return projects
    },
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
    status?: string,
    client?: ObjectId
}

// for mutations 
export const mutation = {
    // add client
    addClient: async ({ name, email, phone, gender }: Person) => {
        try {
            const randomUser = await axios.get(`https://randomuser.me/api/?gender=${gender}`)
            const { data: { results } } = await randomUser
            const client = new ClientModel({
                name, email, phone, gender,
                picture: results[0].picture.medium,
                street: results[0].location.street.number + " " + results[0].location.street.name,
                country: results[0].location.country,
                age: results[0].dob.age,
            })

            return await client.save()
        } catch (error) {
            throw error
        }

    },
    // delete client
    deleteClient: async ({ id }: { id: string }) => {
        ProjectModel.find({ client: id }).then(projects => {
            projects.forEach(project => {
                project.remove()
            })
        })
        return await ClientModel.findByIdAndRemove(id)
    },
    // add project
    addProject: async ({ name, description, client }: Project) => {
        const theClient = await ClientModel.findById(client)
        const project = new ProjectModel({
            name, description, client
        })
        await project.save();
        await project.populate("client")
        return project;
    },
    // delete project
    deleteProject: async ({ id }: { id: string }) => {
        const deletedProject = await ProjectModel.findByIdAndRemove(id);
        await deletedProject?.populate("client")
        return deletedProject
    },
    updateProject: async ({ id, name, description, status }: Project) => {
        let updatedProject = await ProjectModel.findByIdAndUpdate(id, { $set: { name, description, status } }, { new: true });
        await updatedProject?.populate("client");
        return updatedProject
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
`)

