import { gql } from "@apollo/client"

export const GET_CLIENTS = gql`
query getClients {
    clients {
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
`

export const GET_SINGLE_CLIENT = gql`
    query getSingleClient($id: String!) {
        client (id: $id) {
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
`