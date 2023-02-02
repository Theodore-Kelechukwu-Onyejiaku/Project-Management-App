import { useEffect, useState, useRef } from "react"
import { useQuery, gql } from "@apollo/client"
import { GET_CLIENTS } from "../queries/clientQueries"

import { BiSort } from "react-icons/bi"
import { BsList } from "react-icons/bs"
import { MdGridView } from "react-icons/md"
import { RxCaretDown, RxCaretUp } from "react-icons/rx"
import { CiSearch } from "react-icons/ci"
import Display from "./Display"
import Loading from "./Loading"
import ErrorComponent from "./ErrorComponent"

export default function Clients() {
    const { data, loading, error } = useQuery(GET_CLIENTS);

    const sortButton = useRef<HTMLButtonElement | null>(null)

    const [listStyle, setListStyle] = useState<string>("grid");
    const [sort, setSort] = useState<boolean>(false)
    const [sortStyle, setSortStyle] = useState<string>("default")
    const [keyword, setKeyword] = useState<string>("")

    const toList = () => {
        setListStyle("list");
    }
    const toGrid = () => {
        setListStyle("grid")
    }

    useEffect(() => {
        const handleClick = (event: any) => {
            if (sortButton.current?.contains(event.target as Node)) {
                return null
            }
            else if (document.contains(event.target as Node)) {
                setSort(false)
            }
        }
        document.body.addEventListener("click", handleClick)

        return () => {
            document.body.removeEventListener("click", handleClick)
        }
    }, [])

    if (loading) return <Loading />
    if (error) return <ErrorComponent type="client" message="Error Loading Clients" error={error}/>
    return (
        <>
            <div className="">
                <div className="rounded-t-xl bg-slate-100 h-full ">
                    <div className="flex sm:flex-row flex-col items-center text-slate-400 text-sm bg-white py-5 sm:mx-0">
                        <div className="flex items-center sm:w-72 w-full relative px-5 ">
                            <input onChange={(e) => { setKeyword(e.target?.value) }} className="border w-full h-10  rounded p-2 px-5 pl-10" placeholder="search for client" />
                            <CiSearch size={20} className="absolute left-7" />
                        </div>
                        <div className="flex justify-between w-full my-1 sm:my-0 px-5 sm:px-0">
                            <div className="">
                                <div className="flex items-center justify-between border p-1 w-40 h-10 mx-0 sm:mx-5 rounded-md  ">
                                    <div className="flex items-center relative"><BiSort style={{ fontWeight: "lighter" }} /><span className="ml-3">Sort By</span></div>
                                    <button ref={sortButton} onClick={() => { setSort(!sort) }}>
                                        <RxCaretDown size={20} className={`${sort ? " rotate-180" : "rotate-0"} transition-all duration-700`} />
                                    </button>
                                    <div className="relative">
                                        <div className={`${sort ? " opacity-100 " : "opacity-0 invisible "} flex flex-col absolute top-4 z-50 w-28 bg-white right-0 border transition-all duration-1000`}>
                                            <span onClick={() => { setSortStyle("a-z"); setSort(!sort) }} className={`${sortStyle === "a-z" ? "bg-slate-100 " : "bg-white "} border-b  cursor-pointer  p-2 hover:bg-slate-100 `}>A - Z</span>
                                            <span onClick={() => { setSortStyle("z-a"); setSort(!sort) }} className={`${sortStyle === "z-a" ? "bg-slate-100 " : "bg-white "} border-b  cursor-pointer  p-2 hover:bg-slate-100 `}>Z - A</span>
                                            <span onClick={() => { setSortStyle("age"); setSort(!sort) }} className={`${sortStyle === "age" ? "bg-slate-100 " : "bg-white "} border-b  cursor-pointer  p-2 hover:bg-slate-100 `}>By Age</span>
                                            <span onClick={() => { setSortStyle("default"); setSort(!sort) }} className={`${sortStyle === "default" ? "bg-slate-100 " : "bg-white "} border-b  cursor-pointer  p-2 hover:bg-slate-100 `}>Default</span>
                                        </div>
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
                    <div className="relative mx-5 ">
                        <h1 className="my-5 font-bold text-3xl">Clients</h1>
                        <div className={`${listStyle === "grid" ? " block opacity-100 " : " opacity-0 hidden absolute  "} bg-white gap-y-10  gap-x-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-5 w-full transition-all duration-1000`}>
                            <Display sortStyle={sortStyle} data={data} keyword={keyword} type="grid" />
                        </div>
                        <div className={`${listStyle === "list" ? " block opacity-100 " : " opacity-0 hidden absolute "}  overflow-scroll   w-full transition-all duration-1000"`}>
                            <table className="table-auto border w-full overflow-x-scroll">
                                <thead>
                                    <tr className="border">
                                        <th className="text-left px-4 py-5 text-orange-400 border-r font-bold">Avatar</th>
                                        <th className="text-left px-4 py-2 text-orange-400 border-r font-bold">Name</th>
                                        <th className="text-left px-4 py-2 text-orange-400 border-r font-bold">Age</th>
                                        <th className="text-left px-4 py-2 text-orange-400 border-r font-bold">Gender</th>
                                        <th className="text-left px-4 py-2 text-orange-400 border-r font-bold">Email</th>
                                        <th className="text-left px-4 py-2 text-orange-400 border-r font-bold">Phone</th>
                                        <th className="text-left px-4 py-2 text-orange-400 border-r font-bold">Country</th>
                                        <th className="text-left px-4 py-2 text-orange-400 border-r font-bold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Display sortStyle={sortStyle} data={data} keyword={keyword} type="list" />
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
