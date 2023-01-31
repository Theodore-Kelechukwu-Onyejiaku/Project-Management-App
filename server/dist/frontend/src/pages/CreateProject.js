"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const client_1 = require("@apollo/client");
const projectMutations_1 = require("../mutations/projectMutations");
const clientQueries_1 = require("../queries/clientQueries");
const projectQueries_1 = require("../queries/projectQueries");
const react_toastify_1 = require("react-toastify");
const react_router_dom_1 = require("react-router-dom");
function CreateProject({ client }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [addProject, { data: addedProject, loading: addProjectLoading, error: addProjectError }] = (0, client_1.useMutation)(projectMutations_1.ADD_PROJECT);
    const { data: clients, loading: clientsLoading, error: clientError } = (0, client_1.useQuery)(clientQueries_1.GET_CLIENTS);
    const { data: projects, loading: projectsLoading, error: projectError } = (0, client_1.useQuery)(projectQueries_1.GET_PROJECTS);
    const selectRef = (0, react_1.useRef)(null);
    const [formData, setFormData] = (0, react_1.useState)({ name: "", description: "", client: "" });
    const handleSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        if (!formData.name || !formData.description || !formData.client) {
            return react_toastify_1.toast.error("Please fill all form fields", { position: 'top-center' });
        }
        addProject({
            variables: { "name": formData.name, "description": formData.description, "client": formData.client },
            onCompleted: (data) => { navigate("/"); react_toastify_1.toast.success("Project Successfully Added! ", { position: "top-center" }); },
            onError: (error) => { react_toastify_1.toast.error(error.message, { position: 'top-center' }); },
            update(cache, { data: { addProject } }) {
                const { projects } = cache.readQuery({
                    query: projectQueries_1.GET_PROJECTS
                });
                console.log("the projects gotten", projects);
                cache.writeQuery({
                    query: projectQueries_1.GET_PROJECTS,
                    data: {
                        projects: [...projects, addProject]
                    }
                });
            }
        });
    });
    const handleChange = (event) => {
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [event.target.name]: event.target.value })));
    };
    const handleSelect = (event) => {
        setFormData((prev) => { var _a; return (Object.assign(Object.assign({}, prev), { client: (_a = selectRef.current) === null || _a === void 0 ? void 0 : _a.value })); });
    };
    if (addProjectLoading)
        return <div>Loading...</div>;
    if (clientsLoading)
        return <div>Loading Clients...</div>;
    if (clientError)
        return <div>Error loading clients.</div>;
    if (projectsLoading)
        return <div>Loading Clients...</div>;
    if (projectError)
        return <div>Error loading clients.</div>;
    return (<div className="add-client h-screen overflow-hidden">
            <div className="mx-5 flex justify-center items-center">
                <form className="w-96 my-5 relative z-50 mt-20 bg-slate-50 p-10 shadow-lg rounded-md" onSubmit={handleSubmit}>
                    <h1 className="text-2xl  mb-5 text-center">Create a Project</h1>
                    <div className="input-box">
                        <input onChange={handleChange} name="name" value={formData.name} className="input" placeholder="Project Name"/>
                        <label className="label">Project Name</label>
                    </div>
                    <div className="input-box">
                        <label className="">Project Description</label>

                        <textarea onChange={handleChange} name="description" maxLength={200} className="h-36 w-full my-3 p-2" placeholder="Enter Project Description">

                        </textarea>
                        <p className="absolute text-xs right-0 bottom-0"><span className={`${formData.description.length >= 200 ? "text-red-500" : ""}`}>{formData.description.length}/200</span></p>
                    </div>

                    <div className="flex flex-col relative mb-5">
                        <label>Client</label>
                        <select ref={selectRef} onChange={handleSelect} name="client" className="p-2 my-1">
                            <option>_Select Client_</option>
                            {clients.clients.map((client) => (<option value={client.id}>{client.name}</option>))}
                        </select>
                    </div>
                    <button className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md">Add</button>
                </form>

            </div>
        </div>);
}
exports.default = CreateProject;
