"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const im_1 = require("react-icons/im");
const go_1 = require("react-icons/go");
const project_png_1 = __importDefault(require("../../src/assets/images/project.png"));
function Header() {
    const location = (0, react_router_dom_1.useLocation)();
    console.log(location.pathname);
    return (<div className="bg-slate-100 p-5 flex justify-between">
            <div>
                <react_router_dom_1.Link to="/" className="flex items-center text-2xl text-orange-400"><img width={24} src={project_png_1.default} alt="banner"/><span className="ml-3">Project MGT</span></react_router_dom_1.Link>
            </div>
            <div className="flex space-x-5">
                <react_router_dom_1.Link to="/create-client" className={`${location.pathname === "/create-client" ? "text-orange-400 " : ""} flex items-center p-3`}><span className="hidden sm:block mr-3">Add Client</span><im_1.ImUserPlus size={24}/></react_router_dom_1.Link>
                <react_router_dom_1.Link to="/create-project" className={`${location.pathname === "/create-project" ? "text-orange-400 " : ""} flex items-center p-3`}><span className="hidden sm:block mr-3">Add Project</span><go_1.GoProject size={24}/></react_router_dom_1.Link>
            </div>
        </div>);
}
exports.default = Header;
