import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    picture: { type: String, required: true },
    street: { type: String },
    country: { type: String },
    age: { type: String },
    random: { type: String }
})

const ClientModel = mongoose.model("Client", ClientSchema)
export default ClientModel;
