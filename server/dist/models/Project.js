"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["notStarted", "inProgress", "completed"], default: "notStarted", required: true },
    client: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Client", required: true },
    random: { type: String }
});
const ProjectModel = mongoose_1.default.model("Project", ProjectSchema);
exports.default = ProjectModel;
