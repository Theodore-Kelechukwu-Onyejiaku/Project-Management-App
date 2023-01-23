import { ClientInterface } from "../assets/interfaces";
import { CiTrash } from "react-icons/ci"
export default function ClientRow({ client }: { client: ClientInterface }) {
    return (
        <tr key={client.id} className="">
            <td className="border-b border-slate-300 px-4 py-2 font-thin">
                <img className="rounded-full" src={client?.picture}/>
            </td>
            <td className="border-b border-slate-300 px-4 font-thin">{client.name}</td>
            <td className="border-b border-slate-300 px-4 font-thin">{client.email}</td>
            <td className="border-b border-slate-300 px-4 font-thin">{client.gender}</td>
            <td className="border-b border-slate-300 px-4 font-thin">{client.phone}</td>
            <td className="border-b border-slate-300 px-4 font-thin">{client.age}</td>
            <td className="border-b border-slate-300 px-4 font-thin">{client.country}</td>
            <td className="border-b border-slate-300 px-4 font-thin"><button><CiTrash /></button></td>
        </tr>
    )
}
