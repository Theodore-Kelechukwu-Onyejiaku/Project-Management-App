"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
colors_1.default.enable();
// connect Database
(0, db_1.default)().catch((error) => { console.log(error); });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    rootValue: Object.assign(Object.assign({}, schema_1.root), schema_1.mutation),
    graphiql: process.env.NODE_ENV === "development"
}));
app.use("/", (req, res) => {
    res.send("hello");
});
exports.default = app;
