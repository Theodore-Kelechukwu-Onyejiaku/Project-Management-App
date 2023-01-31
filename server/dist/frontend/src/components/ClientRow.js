"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ci_1 = require("react-icons/ci");
const client_1 = require("@apollo/client");
const clientMutations_1 = require("../mutations/clientMutations");
const clientQueries_1 = require("../queries/clientQueries");
function ClientRow({ client }) {
    const [deleteClient, { data, loading, error }] = (0, client_1.useMutation)(clientMutations_1.DELETE_CLIENT);
    const handleDelete = (event) => {
        deleteClient({
            variables: { "id": client.id },
            update(cache, { data }) {
                const { clients } = cache.readQuery({
                    query: clientQueries_1.GET_CLIENTS
                });
                cache.writeQuery({
                    query: clientQueries_1.GET_CLIENTS,
                    data: {
                        clients: clients.filter((client) => client.id !== data.deleteClient.id)
                    }
                });
                console.log(clients);
            }
        });
    };
    return (<tr key={client.id}>
            <td className="border-b border-slate-300 px-4 py-2 font-thin border-r">
                <img className="rounded-full w-14 h-14" src={client === null || client === void 0 ? void 0 : client.picture}/>
            </td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.name}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.age}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.gender}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.email}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.phone}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.country}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin"><button onClick={handleDelete}><ci_1.CiTrash /></button></td>
        </tr>);
}
exports.default = ClientRow;
