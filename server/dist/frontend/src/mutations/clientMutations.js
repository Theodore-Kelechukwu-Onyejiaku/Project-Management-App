"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_CLIENT = exports.DELETE_CLIENT = void 0;
const client_1 = require("@apollo/client");
exports.DELETE_CLIENT = (0, client_1.gql) `
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
        }
    }
`;
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (Gender = {}));
exports.ADD_CLIENT = (0, client_1.gql) `
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
        }
    }
`;
