"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_PROJECT = exports.UPDATE_PROJECT = exports.ADD_PROJECT = void 0;
const client_1 = require("@apollo/client");
exports.ADD_PROJECT = (0, client_1.gql) `
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
`;
var Status;
(function (Status) {
    Status[Status["notStarted"] = 0] = "notStarted";
    Status[Status["inProgress"] = 1] = "inProgress";
    Status[Status["completed"] = 2] = "completed";
})(Status || (Status = {}));
exports.UPDATE_PROJECT = (0, client_1.gql) `
    mutation UpdateProject ( $id: String!, $name: String, $description: String, $status: Status ){
        updateProject(id: $id, name: $name, description: $description, status: $status){
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
`;
exports.DELETE_PROJECT = (0, client_1.gql) `
    mutation DeleteProject ($id: String!){
        deleteProject(id: $id){
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
`;
