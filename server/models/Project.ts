import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["notStarted", "inProgress", "completed"], default: "notStarted", required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }
})

const ProjectModel = mongoose.model("Project", ProjectSchema)
export default ProjectModel;