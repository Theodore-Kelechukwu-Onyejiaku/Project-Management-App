import { buildSchema } from "graphql"
import ProjectModel from "../models/Project"
import ClientModel from "../models/Client"


// root Query
export const root = {
    client: ({ id }: { id: string }) => {
        return ClientModel.findById(id)
    },
    clients: () => {
        return ClientModel.find()
    },
    project: ({ id }: { id: string }) => {
        // let result;
        // let project = projects.find(project => project.id === id)
        // let client = clients.find(client => client.id === id)
        // console.log(client)
        // result = { ...project, "client": client }
        // console.log(result)
        // return result
        const project = ProjectModel.findById(id);
        const client = ClientModel.findById(id);
        return {...project, "client": client}
    },

    projects: () => {
       return ProjectModel.find()
    }
}

export const schema = buildSchema(`
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
`)

