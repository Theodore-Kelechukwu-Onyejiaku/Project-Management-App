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
const projectQueries_1 = require("../queries/projectQueries");
const react_toastify_1 = require("react-toastify");
function UpdateProject({ project }) {
    const [formData, setFormData] = (0, react_1.useState)({ name: project.name, description: project.description, status: project.status });
    const [updateProject, { data, error, loading }] = (0, client_1.useMutation)(projectMutations_1.UPDATE_PROJECT);
    const selectRef = (0, react_1.useRef)(null);
    const handleSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        updateProject({
            variables: { id: project.id, name: formData.name, description: formData.description, status: formData.status },
            refetchQueries: [{ query: projectQueries_1.GET_SINGLE_PROJECT, variables: { id: project.id } }],
            onCompleted: () => { react_toastify_1.toast.success("Update Successful ", { position: "top-center" }); },
            onError: (error) => { react_toastify_1.toast.error(error.message, { position: 'top-center' }); }
        });
    });
    const handleSelect = () => {
        setFormData((prev) => { var _a; return (Object.assign(Object.assign({}, prev), { status: (_a = selectRef.current) === null || _a === void 0 ? void 0 : _a.value })); });
    };
    const handleChange = (event) => {
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [event.target.name]: event.target.value })));
    };
    if (loading)
        return <div>Loading....</div>;
    return (<div className='my-10 sm:my-0'>
            <div className='px-5'>
                <form className="relative z-50  rounded-md" onSubmit={handleSubmit}>
                    <h1 className="text-2xl  mb-5 font-bold">Update Project Details</h1>
                    <div className="input-box">
                        <input onChange={handleChange} name="name" value={formData.name} className="input" placeholder="Project Name"/>
                        <label className="label">Project Name</label>
                    </div>
                    <div className="input-box">
                        <label className="">Project Description</label>

                        <textarea onChange={handleChange} name="description" className="h-36 w-full my-3 p-2" placeholder="Enter Project Description">
                            {project.description}
                        </textarea>
                        <p className="absolute text-xs right-0 bottom-0"><span className={`${formData.description.length >= 200 ? "text-red-500" : ""}`}>{formData.description.length}/200</span></p>
                    </div>

                    <div className="flex flex-col relative mb-5">
                        <label>Status</label>
                        <select defaultValue={project.status} ref={selectRef} onChange={handleSelect} name="status" className="p-2 my-3">
                            <option value="completed">completed</option>
                            <option value="notStarted">notStarted</option>
                            <option value="inProgress">inProgress</option>
                        </select>
                    </div>
                    <button className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md mt-5">Update</button>
                </form>
            </div>
        </div>);
}
exports.default = UpdateProject;
