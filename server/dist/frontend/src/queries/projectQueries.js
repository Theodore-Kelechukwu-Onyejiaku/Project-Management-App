"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_SINGLE_PROJECT = exports.GET_PROJECTS = void 0;
const client_1 = require("@apollo/client");
exports.GET_PROJECTS = (0, client_1.gql) `
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
`;
exports.GET_SINGLE_PROJECT = (0, client_1.gql) `
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
`;
