"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const client_1 = require("@apollo/client");
const projectQueries_1 = require("../queries/projectQueries");
const ai_1 = require("react-icons/ai");
const fa_1 = require("react-icons/fa");
const io_1 = require("react-icons/io");
const UpdateProject_1 = __importDefault(require("../components/UpdateProject"));
const ci_1 = require("react-icons/ci");
const projectMutations_1 = require("../mutations/projectMutations");
const react_1 = __importDefault(require("react"));
const react_toastify_1 = require("react-toastify");
function Project() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const { data, error, loading } = (0, client_1.useQuery)(projectQueries_1.GET_SINGLE_PROJECT, { variables: { id } });
    const [deleteProject, { data: deleteProjectData, loading: deleteProjectLoading, error: deleteProjectError }] = (0, client_1.useMutation)(projectMutations_1.DELETE_PROJECT);
    if (loading)
        return <div>Loading...</div>;
    if (error)
        return <div>Error... {error.message}</div>;
    const handleDelete = (event) => {
        deleteProject({
            variables: { "id": id },
            update(cache, { data }) {
                const { projects } = cache.readQuery({
                    query: projectQueries_1.GET_PROJECTS
                });
                console.log(deleteProject);
                cache.writeQuery({
                    query: projectQueries_1.GET_PROJECTS,
                    data: {
                        projects: projects.filter((project) => project.id !== data.deleteProject.id)
                    }
                });
            },
            onCompleted: () => { navigate("/"); react_toastify_1.toast.success("Project Deleted Successfully! ", { position: "top-center" }); },
            onError: (error) => { react_toastify_1.toast.error(error.message, { position: 'top-center' }); }
        });
    };
    return (<div className="my-10">
            {data.project ?
            <div className="flex flex-col justify-evenly sm:flex-row space-x-0 sm:space-x-10 sm:justify-center">
                    <div className="flex flex-col justify-center items-center">

                        <div className="circle-bg w-96 mx-5 p-5 shadow-md border">
                            <div className="flex justify-end">
                                <react_router_dom_1.Link to="/" className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md flex items-center">
                                    <io_1.IoIosArrowRoundBack />
                                    <span>Back</span>
                                </react_router_dom_1.Link>
                            </div>
                            <div className="my-3">
                                <span className="text-2xl font-bold">{data === null || data === void 0 ? void 0 : data.project.name}</span>
                                <p className='text-xlg h-36 text-slate-600 capitalize my-3'>{data.project.description}</p>
                            </div>
                            <div className="flex flex-col my-3">
                                <span className="text-slate-400 text-sm">status</span>
                                <span className="text-slate-600">{data.project.status}</span>
                            </div>
                            <div className="">
                                <span className="text-slate-400 text-sm font-bold">Client Information</span>
                                <div className="flex flex-col my-3">
                                    <div>
                                        <img src={(_b = (_a = data.project) === null || _a === void 0 ? void 0 : _a.client) === null || _b === void 0 ? void 0 : _b.picture} className="h-20 w-auto rounded-full" alt="avatar"/>
                                    </div>
                                    <div className="my-3">
                                        <p className="text-slate-600 mb-3">{(_d = (_c = data.project) === null || _c === void 0 ? void 0 : _c.client) === null || _d === void 0 ? void 0 : _d.name}<span className="text-orange-400">{" ("}{(_e = data.project.client) === null || _e === void 0 ? void 0 : _e.country}{")"}</span></p>
                                        <ul>
                                            <li className="text-slate-600 flex items-center"><ai_1.AiOutlineMail /><span className="ml-2">{(_f = data.project.client) === null || _f === void 0 ? void 0 : _f.email}</span></li>
                                            <li className="text-slate-600 flex items-center"><ai_1.AiOutlinePhone /><span className="ml-2">{(_g = data.project.client) === null || _g === void 0 ? void 0 : _g.phone}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400 flex items-center"><fa_1.FaMapMarkerAlt /><span>{(_j = (_h = data.project) === null || _h === void 0 ? void 0 : _h.client) === null || _j === void 0 ? void 0 : _j.street}</span></p>

                            </div>
                            <button onClick={handleDelete} className="border p-2 w-32 bg-red-400 text-white rounded-md shadow-md mt-5 bottom-0 flex items-center justify-between"><span>Delete</span> <ci_1.CiTrash /></button>

                        </div>
                    </div>
                    <UpdateProject_1.default project={data.project}/>
                </div> : <div><react_router_dom_1.Navigate to="/404"></react_router_dom_1.Navigate></div>}
        </div>);
}
exports.default = Project;
