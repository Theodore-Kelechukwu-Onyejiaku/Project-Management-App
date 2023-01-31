"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
function ProjectCard({ project }) {
    return (<div className='border h-40 p-4 shadow-md bg-white circle-bg'>
            <div className='flex justify-between items-center'>
                <div>
                    <span className=' text-xlg font-bold'>{project.name}</span>
                </div>
                <react_router_dom_1.Link to={`/project/${project.id}`} className='border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md'>view</react_router_dom_1.Link>
            </div>
            <div>
                <span className='text-sm text-slate-400'>Status:</span>
                <span>{"   "}{project.status || "nothing"}</span>
            </div>
        </div>);
}
exports.default = ProjectCard;
