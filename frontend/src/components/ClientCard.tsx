import React, { useState, useRef, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ClientInterface } from "../assets/interfaces";
import { SlOptionsVertical } from "react-icons/sl";
import { CiTrash } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { toast } from "react-toastify";


export default function ClientCard({ client }: { client: ClientInterface }) {
    const [deleteClient, { data, loading, error }] = useMutation(DELETE_CLIENT)
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        let answer: string;
        answer = prompt("Please enter the code to delete this user") as string
        if (!answer) return
        if (answer !== client.random) {
            toast.error("This project cannot be deleted as the code provided is incorrect!",
                { position: "top-center" })
            return
        }
        deleteClient({
            variables: { "id": client.id },
            refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
        })
    }

    const [showOptions, setShowOptions] = useState<boolean>(false);
    const card = useRef<HTMLDivElement | null>(null);
    const optionButton = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleClick = (event: any) => {
            if (optionButton.current?.contains(event.target as Node)) {
                return null
            }
            else if (document.contains(event.target as Node)) {
                setShowOptions(false)
            }
        }
        document.body.addEventListener("click", handleClick)

        return () => {
            document.body.removeEventListener("click", handleClick)
        }
    })

    return (
        <div key={client.id} ref={card} className="w-full h-80 overflow-hidden border rounded-md p-5 shadow-md flex flex-col bg-white wave-bg relative">
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
                <div className="relative">
                    <button ref={optionButton}>
                        <SlOptionsVertical color="grey" className=" cursor-pointer" onClick={() => { setShowOptions(!showOptions) }} />
                    </button>
                    <div className={`${showOptions ? " opacity-100 " : " opacity-0 invisible absolute  "} flex flex-col border absolute bg-white right-3  my-2 w-24 font-thin z-40 transition-all duration-500`}>
                        <button className="p-2 border-b flex items-center justify-between text-green-600 cursor-pointer hover:bg-slate-100">
                            <span>view</span>
                            <FaRegEye />
                        </button>
                        <button onClick={handleDelete} className="p-2 flex items-center justify-between text-red-600 cursor-pointer hover:bg-slate-100">
                            <span >delete</span>
                            <CiTrash />
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
        </div>
    )
}
