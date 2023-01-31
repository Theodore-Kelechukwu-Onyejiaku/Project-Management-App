"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CLIENTS = void 0;
const client_1 = require("@apollo/client");
exports.GET_CLIENTS = (0, client_1.gql) `
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
    }
}
`;
