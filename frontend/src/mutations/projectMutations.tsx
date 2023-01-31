import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
    mutation AddProject ($name: String!, $description: String!, $client: String!){
        addProject(name: $name, description: $description, client: $client){
            id
            name
            description
            status
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
            }
        }
    }
`