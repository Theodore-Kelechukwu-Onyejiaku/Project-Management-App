import { useEffect, useState } from "react"
import { ClientInterface } from "../assets/interfaces"
import ClientCard from "./ClientCard"
import ClientRow from "./ClientRow"

import { VscSearchStop } from "react-icons/vsc"

interface componentPropsI {
    data: any,
    type: string,
    keyword: string,
    sortStyle: string
}
export default function Display({ type, data, keyword, sortStyle }: componentPropsI) {

    return (<>
        {data.clients.find((client: ClientInterface) => client.name.toLowerCase().includes(keyword.trim().toLowerCase())) ?
            data.clients.
                filter((client: ClientInterface) => {
                    if (keyword.trim()) {
                        if (client.name.toLowerCase().includes(keyword.toLowerCase())) {
                            return client
                        }
                        else {
                            return null
                        }
                    } else {
                        return client
                    }
                })
                .sort((a: ClientInterface, b: ClientInterface) => {
                    switch (sortStyle) {
                        case "a-z": return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                        case "z-a": return (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0);
                        case "age": return parseInt(b.age) - parseInt(a.age);
                        default: return null
                    }
                })
                .map((client: ClientInterface, arr: ClientInterface | null) => (
                    type === "list" ? <ClientRow key={client.id} client={client} /> : <ClientCard key={client.id} client={client} />
                ))
            : type === "list" ? <tr className=" h-40">
                <td className="w-full bg-slate-100 border absolute left-0 h-40 text-center flex flex-col justify-center items-center">
                    <VscSearchStop className="text-red-700" size={30} />
                    <span>No User Found!</span>
                </td>
            </tr> :
                <div className="h-40">
                    <div className="w-full bg-slate-100 border absolute left-0  h-40 text-center flex flex-col justify-center items-center">
                        <VscSearchStop className="text-red-700" size={30} />
                        <span>No User Found!</span>
                    </div>
                </div>
        }
    </>)
}