import { gql } from "@apollo/client";

export const DELETE_CLIENT = gql`
    mutation DeleteClient ($id: String!){
        deleteClient(id: $id){
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

enum Gender {
    male,
    female
}
export const ADD_CLIENT = gql`
    mutation AddClient ($name: String!, $email: String!, $phone: String!, $gender: Gender! ){
        addClient(name: $name, email: $email, phone: $phone, gender: $gender){
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