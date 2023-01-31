import express, { Response, Request } from "express";
import { graphqlHTTP } from "express-graphql";
import path from "path";
import { schema, root, mutation } from "./schema/schema"
import dotenv from "dotenv"
import connectDB from "./config/db"
import colors from "colors"
import cors from "cors"

dotenv.config();
colors.enable()
// connect Database
connectDB().catch((error: Error) => { console.log(error) });
console.log(path.join(__dirname, 'frontend', 'build', "index.html"))
const app = express();
app.use(cors())
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: { ...root, ...mutation },
    graphiql: process.env.NODE_ENV === "development"
}))
app.get("*", async (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', "index.html"))
})


export default app;