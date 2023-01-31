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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const client_1 = require("@apollo/client");
const sl_1 = require("react-icons/sl");
const ci_1 = require("react-icons/ci");
const fa_1 = require("react-icons/fa");
const clientMutations_1 = require("../mutations/clientMutations");
const clientQueries_1 = require("../queries/clientQueries");
const projectQueries_1 = require("../queries/projectQueries");
function ClientCard({ client }) {
    var _a, _b;
    const [deleteClient, { data, loading, error }] = (0, client_1.useMutation)(clientMutations_1.DELETE_CLIENT);
    const handleDelete = (event) => {
        deleteClient({
            variables: { "id": client.id },
            refetchQueries: [{ query: clientQueries_1.GET_CLIENTS }, { query: projectQueries_1.GET_PROJECTS }],
        });
    };
    const [showOptions, setShowOptions] = (0, react_1.useState)(false);
    const card = (0, react_1.useRef)(null);
    const optionButton = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const handleClick = (event) => {
            var _a;
            if ((_a = optionButton.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)) {
                return null;
            }
            else if (document.contains(event.target)) {
                setShowOptions(false);
            }
        };
        document.body.addEventListener("click", handleClick);
        return () => {
            document.body.removeEventListener("click", handleClick);
        };
    });
    return (<div key={client.id} ref={card} className="w-full h-80 overflow-hidden border rounded-md p-5 shadow-md flex flex-col bg-white wave-bg relative">
            <div className="flex  justify-between">
                <div className="mb-5">
                    <img className="rounded-full w-14 h-14" src={client.picture} alt="avatar"/>
                    <span className="text-lg font-bold break-words">
                        {client.name.split(" ")[0] + " "}
                        {client.name.split(" ")[1] ? ((_a = client.name.split(" ")[1]) === null || _a === void 0 ? void 0 : _a.split("")[0]) + "." : ""}
                        {client.name.split(" ")[2] ? ((_b = client.name.split(" ")[2]) === null || _b === void 0 ? void 0 : _b.split("")[0]) + "." : ""}
                    </span>
                    <span>{"("}{client.country}{")"}</span>
                </div>
                <div className="relative">
                    <button ref={optionButton}>
                        <sl_1.SlOptionsVertical color="grey" className=" cursor-pointer" onClick={() => { setShowOptions(!showOptions); }}/>
                    </button>
                    <div className={`${showOptions ? " opacity-100 " : " opacity-0 invisible absolute  "} flex flex-col border absolute bg-white right-3  my-2 w-24 font-thin z-40 transition-all duration-500`}>
                        <button className="p-2 border-b flex items-center justify-between text-green-600 cursor-pointer hover:bg-slate-100">
                            <span>view</span>
                            <fa_1.FaRegEye />
                        </button>
                        <button onClick={handleDelete} className="p-2 flex items-center justify-between text-red-600 cursor-pointer hover:bg-slate-100">
                            <span>delete</span>
                            <ci_1.CiTrash />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400">
                        Age
                    </span>
                    <span className="text-sm text-slate-500">{client.age}yrs</span>
                </div>
                <div className="flex flex-col ml-10">
                    <span className="text-xs text-slate-400">
                        Gender
                    </span>
                    <span className="text-sm text-slate-500">{client.gender}</span>
                </div>
            </div>
            <div className="my-10 flex flex-col text-base">
                <span className="text-xs text-slate-400">
                    Email
                </span>
                <span className="text-smn text-slate-500">{client.email}</span>
            </div>
            <div className="absolute bottom-0 mb-3 flex flex-col">
                <span className="text-xs text-slate-400">Street</span>
                <span className="text-sm text-slate-500">{client.street}</span>
            </div>
        </div>);
}
exports.default = ClientCard;
