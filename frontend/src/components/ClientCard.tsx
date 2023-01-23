import { useState } from "react";
import { ClientInterface } from "../assets/interfaces";
import { SlOptionsVertical } from "react-icons/sl";

export default function ClientCard({ client }: { client: ClientInterface }) {
    

    return (
        <div className="w-full h-80 overflow-hidden border rounded-md p-5 shadow-md flex flex-col bg-white relative">
            <div className="flex  justify-between">
                <div className="mb-5">
                    <img className="rounded-full w-14 h-14" src={client.picture} alt="avatar" />
                    <span className="text-lg font-bold break-words">
                        {client.name.split(" ")[0] + " "}
                        {client.name.split(" ")[1] ? client.name.split(" ")[1]?.split("")[0] + "." : ""}
                        {client.name.split(" ")[2] ? client.name.split(" ")[2]?.split("")[0] + "." : ""}
                    </span>
                    <span>{"("}{client.country}{")"}</span>
                </div>
                <div>
                    <SlOptionsVertical color="grey" />
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
        </div>
    )
}
