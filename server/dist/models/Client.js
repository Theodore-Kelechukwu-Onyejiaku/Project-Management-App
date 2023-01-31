"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClientSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    picture: { type: String, required: true },
    street: { type: String },
    country: { type: String },
    age: { type: String },
    random: { type: String }
});
const ClientModel = mongoose_1.default.model("Client", ClientSchema);
exports.default = ClientModel;
