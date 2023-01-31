import { gql } from "@apollo/client"

export const GET_PROJECTS = gql`
    query getProjects {
        projects{
            id
            name
            status
            description
            client{
                name
            }
        }
    }
`

export const GET_SINGLE_PROJECT = gql`
    query getSingleProject($id: String!) {
        project(id: $id){
            id
            name
            status
            description
            client{
                id
                name
                gender
                email
                phone
                picture
                country
                street
            }
        }
    }
`

