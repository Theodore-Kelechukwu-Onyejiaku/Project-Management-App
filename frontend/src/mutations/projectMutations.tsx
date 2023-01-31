import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
    mutation AddProject ($name: String!, $description: String!, $client: String!){
        addProject(name: $name, description: $description, client: $client){
            id
            name
            description
            status
            random
            client{
                id
                name
                email
                phone
                picture
                gender
                street
                country
                age
                random
            }
        }
    }
`
enum Status {
    notStarted,
    inProgress,
    completed
}

export const UPDATE_PROJECT = gql`
    mutation UpdateProject ( $id: String!, $name: String, $description: String, $status: Status ){
        updateProject(id: $id, name: $name, description: $description, status: $status){
            id
            name
            description
            status
            random
            client{
                id
                name
                email
                phone
                picture
                gender
                street
                country
                age
                random
            }
        }
    }
`

export const DELETE_PROJECT = gql`
    mutation DeleteProject ($id: String!){
        deleteProject(id: $id){
            id
            name
            description
            status
            random
            client{
                id
                name
                email
                phone
                picture
                gender
                street
                country
                age
                random
            }
        }
    }
`