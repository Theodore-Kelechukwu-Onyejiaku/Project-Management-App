"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectQueries_1 = require("../queries/projectQueries");
const client_1 = require("@apollo/client");
const ProjectCard_1 = __importDefault(require("./ProjectCard"));
function Projects() {
    const { data, error, loading } = (0, client_1.useQuery)(projectQueries_1.GET_PROJECTS);
    if (loading)
        return <div>Loading...</div>;
    if (error)
        return <div>Error... {error.message}</div>;
    return (<div className='my-10'>
            <h1 className="my-5 mx-5 font-bold text-3xl">Projects</h1>
            <div className='mx-5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10'>
                {data.projects.length ? data.projects.map((project) => (<ProjectCard_1.default key={project.id} project={project}/>))
            :
                <p>No projects</p>}
            </div>
        </div>);
}
exports.default = Projects;
