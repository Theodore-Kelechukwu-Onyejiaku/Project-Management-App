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
const clientMutations_1 = require("../mutations/clientMutations");
const clientQueries_1 = require("../queries/clientQueries");
const react_toastify_1 = require("react-toastify");
const react_router_dom_1 = require("react-router-dom");
function CreateClient() {
    let Gender;
    (function (Gender) {
        Gender[Gender["male"] = 0] = "male";
        Gender[Gender["female"] = 1] = "female";
    })(Gender || (Gender = {}));
    const [formData, setFormData] = (0, react_1.useState)({ name: "", email: "", phone: "", gender: null });
    const [addClient, { data, error, loading }] = (0, client_1.useMutation)(clientMutations_1.ADD_CLIENT);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.gender) {
            return react_toastify_1.toast.error("Please fill all form fields", { position: 'top-center' });
        }
        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formData.email)) {
            react_toastify_1.toast.error("Email is incorrect. Please enter an email that is valid.", { position: 'top-center' });
            return;
        }
        addClient({
            variables: { "name": formData.name.trim(), "email": formData.email.trim(), "phone": formData.phone.trim(), "gender": formData.gender },
            onCompleted: (data) => { navigate("/"); react_toastify_1.toast.success("Client added Successfully ", { position: "top-center" }); },
            onError: (error) => { react_toastify_1.toast.error(error.message, { position: 'top-center' }); },
            update(cache, { data: { addClient } }) {
                const { clients } = cache.readQuery({
                    query: clientQueries_1.GET_CLIENTS
                });
                cache.writeQuery({
                    query: clientQueries_1.GET_CLIENTS,
                    data: {
                        clients: [...clients, addClient]
                    }
                });
            },
        });
    };
    const handleChange = (event) => {
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [event.target.name]: event.target.value })));
    };
    const handleSelect = (event) => {
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [event.target.name]: event.target.value })));
    };
    if (loading)
        return <div>Loading...</div>;
    return (<div className="add-client h-screen overflow-hidden">
            <div className="mx-5 flex justify-center items-center">

                <form className="w-96 my-5 relative z-50 mt-20 bg-slate-50 p-10 shadow-lg rounded-md" onSubmit={handleSubmit}>
                    <h1 className="text-2xl  mb-5 text-center">Create a client</h1>

                    <div className="input-box">
                        <input onChange={handleChange} name="name" value={formData.name} className="input" placeholder="Name"/>
                        <label className="label">Name</label>
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="email" value={formData.email} className="input" placeholder="Email"/>
                        <label className="label">Email</label>
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="phone" value={formData.phone} className="input" placeholder="Phone"/>
                        <label className="label">Phone</label>
                    </div>
                    <div className="flex flex-col relative border mb-5">
                        <select onChange={handleSelect} name="gender" value={formData.gender} className="p-2">
                            <option>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md">Add</button>
                </form>
            </div>
        </div>);
}
exports.default = CreateClient;
