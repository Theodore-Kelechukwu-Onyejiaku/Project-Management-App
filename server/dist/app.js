"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const path_1 = __importDefault(require("path"));
const schema_1 = require("./schema/schema");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
colors_1.default.enable();
// connect Database
(0, db_1.default)().catch((error) => { console.log(error); });
console.log(path_1.default.join(__dirname, "../../frontend/build", "index.html"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    rootValue: Object.assign(Object.assign({}, schema_1.root), schema_1.mutation),
    graphiql: process.env.NODE_ENV === "development"
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/build")));
app.get("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/build", "index.html"));
}));
exports.default = app;
