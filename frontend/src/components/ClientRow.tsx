import { ClientInterface } from "../assets/interfaces";
import { CiTrash } from "react-icons/ci";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { toast } from "react-toastify"
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ClientRow({ client }: { client: ClientInterface }) {
    const [deleteClient, { data, loading, error }] = useMutation(DELETE_CLIENT,)
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        let answer: string;
        answer = prompt("Please enter the code to delete this user") as string
        if (!answer) return
        if (answer !== client.random) {
            toast.error("This user cannot be deleted as the code provided is incorrect or you were not the creator!",
                { position: "top-center" })
            return
        }
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
            },
            onCompleted: () => {
                toast.success("User Deleted Successfully! ", { position: "top-center" })
            },
            onError: (error) => { toast.error(error.message, { position: 'top-center' }) },
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
            <td className="border-b border-r border-slate-300 px-4 font-thin tex-center"><button onClick={handleDelete}><CiTrash /></button><Link to={`/client/${client.id}`} className="ml-3 inline-block"><FaRegEye /></Link></td>
        </tr>
    )
}
