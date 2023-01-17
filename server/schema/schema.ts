import { buildSchema, GraphQLEnumType } from "graphql"
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



}

// for mutations 
export const mutation = {
    // add client
    addClient: async ({ name, email, phone }: { name: string, email: string, phone: string }) => {
        const client = new ClientModel({
            name, email, phone
        })
        await client.save()
        console.log("The client".cyan, client)
        return client
    },
    // delete client
    deleteClient: async ({ id }: { id: string }) => {
        return await ClientModel.findByIdAndRemove(id)
    },
    // add project
    addProject: async ({ name, description, status, clientId }: { name: string, description: string, status: string, clientId: string }) => {
        const project = new ProjectModel({
            name, description, status, clientId
        })
        await project.save();
        console.log("The project".cyan, project)
        return project;
    },
    // delete project
    deleteProject: async ({ id }: { id: string }) => {
        return await ProjectModel.findByIdAndRemove(id)
    },
    updateProject: async ({ id, name, description, status }: { id: string, name: string, description: string, status: string }) => {
        return await ProjectModel.findByIdAndUpdate(id, { $set: { name, description, status } }, { new: true })
    }
}

var RGBType = new GraphQLEnumType({
    name: 'RGB',
    values: {
        RED: { value: 0 },
        GREEN: { value: 1 },
        BLUE: { value: 2 }
    }
});


// creating Schemas
export const schema = buildSchema(`
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
`)

