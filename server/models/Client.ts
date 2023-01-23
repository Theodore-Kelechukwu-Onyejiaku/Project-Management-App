import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    email: { type: String },
    phone: { type: String },
    picture: { type: String },
    street: { type: String },
    country: { type: String },
    age: { type: String },
})

const ClientModel = mongoose.model("Client", ClientSchema)
export default ClientModel;
