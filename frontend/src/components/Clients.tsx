import { useState, } from "react"
import { useQuery, gql } from "@apollo/client"
import { GET_CLIENTS } from "../queries/clientQueries"

import { BiSort } from "react-icons/bi"
import { BsList } from "react-icons/bs"
import { MdGridView } from "react-icons/md"
import { RxCaretDown, RxCaretUp } from "react-icons/rx"
import { CiSearch } from "react-icons/ci"
import Display from "./Display"

export default function Clients() {
    const { data, loading, error } = useQuery(GET_CLIENTS);
    const randomUsers: any[] = []

    const [listStyle, setListStyle] = useState<string>("grid");
    const [sort, setSort] = useState<boolean>(false)
    const [sortStyle, setSortStyle] = useState<string>("z-a")
    const [keyword, setKeyword] = useState<string>("")

    const toList = () => {
        setListStyle("list");
    }
    const toGrid = () => {
        setListStyle("grid")
    }


    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    return (
        <div className="">
            <div className="rounded-t-xl bg-slate-100 p-3 sm:p-10">
                <div className="flex sm:flex-row flex-col items-center text-slate-400 text-sm my-10 bg-white py-5">
                    <div className="flex items-center sm:w-72 w-full relative">
                        <input onChange={(e) => { setKeyword(e.target?.value) }} className="border w-full h-10  rounded p-2 px-5 pl-10" placeholder="search for client" />
                        <CiSearch size={20} className="absolute left-2" />
                    </div>
                    <div className="flex justify-between w-full my-1 sm:my-0 p-0">
                        <div className="">
                            <div className="flex items-center justify-between border p-1 w-40 h-10 mx-0 sm:mx-5 rounded-md relative z-50 ">
                                <div className="flex items-center relative"><BiSort style={{ fontWeight: "lighter" }} /><span className="ml-3">Sort By</span></div>
                                <button onClick={() => { setSort(!sort) }}>
                                    <RxCaretDown size={20} className={`${sort ? " rotate-180" : "rotate-0"} transition-all duration-700`} />
                                </button>
                                <div className={`${sort ? "visible h-fit " : "invisible h-0 "} flex flex-col absolute z-50 top-10 overflow-hidden h-0 w-full bg-white right-0 border p-3 `}>
                                    <span onClick={() => { setSortStyle("a-z"); setSort(!sort) }} className="border-b cursor-pointer my-2 p-1">A - Z</span>
                                    <span onClick={() => { setSortStyle("z-a"); setSort(!sort) }} className="border-b cursor-pointer my-2 p-1">Z - A</span>
                                    <span onClick={() => { setSortStyle("age"); setSort(!sort) }} className="border-b cursor-pointer my-2 p-1">By Age</span>
                                    <span onClick={() => { setSortStyle("random"); setSort(!sort) }} className="border-b cursor-pointer my-2 p-1">Random</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <div className={`${listStyle === "list" ? "border-black " : " "}flex items-center justify-between  w-28 h-10 font-bold border p-1 px-5 mx-0 sm:mx-5 rounded-md transition-all duration-700`}>
                                <span>LIST</span>
                                <button onClick={toList}>
                                    <BsList color="black" />
                                </button>
                            </div>
                            <div className={`${listStyle === "grid" ? "border-black " : " "}flex items-center justify-between my-1 sm:my-0  w-28 h-10 font-bold border p-1 px-5 mx-0 sm:mx-5 rounded-md transition-all duration-700`}>
                                <span>GRID</span>
                                <button onClick={toGrid}>
                                    <MdGridView />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${listStyle === "list" ? "visible opacity-100 bg-white" : "hidden opacity-0"} overflow-scroll my-5 opacity-100 transition-all duration-1000"`}>
                    <table className="table-auto w-full overflow-x-scroll">
                        <thead>
                            <tr className="">
                                <th className="text-left px-4 py-2 text-orange-400 font-bold">Avatar</th>
                                <th className="text-left px-4 py-2 text-orange-400 font-bold">Name</th>
                                <th className="text-left px-4 py-2 text-orange-400 font-bold">Email</th>
                                <th className="text-left px-4 py-2 text-orange-400 font-bold">Gender</th>
                                <th className="text-left px-4 py-2 text-orange-400 font-bold">Phone</th>
                                <th className="text-left px-4 py-2 text-orange-400 font-bold">Age</th>
                                <th className="text-left px-4 py-2 text-orange-400 font-bold">Country</th>
                                <th className="text-left px-4 py-2 text-orange-400 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Display sortStyle={sortStyle} data={data} keyword={keyword} type="list" />
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className={`${listStyle === "grid" ? "visible opacity-100" : "invisible opacity-0 "}  gap-y-10 gap-x-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 opacity-100 bg-slate-50 p-5 w-full`}>
                        <Display sortStyle={sortStyle} data={data} keyword={keyword} type="grid" />
                    </div>
                </div>

            </div>

        </div>
    )
}
