import express, { Response, Request } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema, root } from "./schema/schema"
import dotenv from "dotenv"
import connectDB from "./config/db"
import colors from "colors"

dotenv.config();
colors.enable()
// connect Database
connectDB().catch((error: Error) =>{console.log(error)});

const app = express();
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV === "development"
}))

export default app;