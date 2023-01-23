"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClientSchema = new mongoose_1.default.Schema({
    name: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    email: { type: String },
    phone: { type: String },
    picture: { type: String },
    street: { type: String },
    country: { type: String },
    age: { type: String },
});
const ClientModel = mongoose_1.default.model("Client", ClientSchema);
exports.default = ClientModel;
