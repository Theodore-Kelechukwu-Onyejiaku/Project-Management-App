import { ClientInterface } from "../assets/interfaces";
import { CiTrash } from "react-icons/ci";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function ClientRow({ client }: { client: ClientInterface }) {
    const [deleteClient, { data, loading, error }] = useMutation(DELETE_CLIENT,)
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        deleteClient({
            variables: { "id": client.id },
            update(cache, { data }) {
                const { clients }: any = cache.readQuery({
                    query: GET_CLIENTS
                });
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: {
                        clients: clients.filter((client: ClientInterface) => client.id !== data.deleteClient.id)
                    }
                })
                console.log(clients)
            }
        })
    }
    return (
        <tr key={client.id}>
            <td className="border-b border-slate-300 px-4 py-2 font-thin border-r">
                <img className="rounded-full w-14 h-14" src={client?.picture} />
            </td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.name}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.age}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.gender}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.email}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.phone}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin">{client.country}</td>
            <td className="border-b border-r border-slate-300 px-4 font-thin"><button onClick={handleDelete}><CiTrash /></button></td>
        </tr>
    )
}
