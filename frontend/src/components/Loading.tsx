import React from 'react'

function Card() {
    return (
        <div className="w-full h-80 overflow-hidden border rounded-md p-5 shadow-md flex flex-col bg-white text-white wave-bg relative">
            <div className="flex  justify-between">
                <div className="mb-5 text-transparent">
                    <div className='w-20 h-20 border rounded-full'></div>
                    <span className="text-lg w-28 block h-7 relative shadow font-bold break-words">

                    </span>
                    <span className='w-28 bg-white'></span>
                </div>
                <div className="relative">
                    <button></button>

                    <div className="text-transparent opacity-100 invisible   flex flex-col border absolute bg-white right-3  my-2 w-24 font-thin z-40 transition-all duration-500">
                        <button className="p-2 border-b flex items-center justify-between text-green-600 cursor-pointer hover:bg-slate-100">
                            <span>view</span>

                        </button>
                        <button className="p-2 flex items-center justify-between text-red-600 cursor-pointer hover:bg-slate-100">
                            <span >delete</span>

                        </button>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col">
                    <span className="block w-10 h-7 shadow text-xs text-slate-400">
                    </span>
                    <span className="block w-10 h-7 shadow text-xs text-slate-400">
                    </span>
                </div>
                <div className="flex flex-col ml-10">
                    <span className="block w-10 h-7 shadow text-xs text-slate-400">
                    </span>
                </div>
            </div>
            <div className="my-10 flex flex-col text-base">
                <span className="block w-20 h-7 shadow text-xs text-slate-400">
                </span>
                
            </div>
            <div className="absolute bottom-0 mb-3 flex flex-col">
                <span className="block w-20 h-7 shadow text-xs text-slate-400">
                </span>
            </div>
        </div>
    )
}
export default function Loading() {
    return (
        <div className="animate-pulse">
            <div className="rounded-t-xl bg-slate-100 h-full text-white ">
                <div className="flex sm:flex-row flex-col items-center text-slate-400 text-sm bg-white py-5 sm:mx-0">
                    <div className="flex items-center sm:w-72 w-full relative px-5 ">
                        <input className="border text-white placeholder-white w-full h-10  rounded p-2 px-5 pl-10" placeholder="search for client" />
                    </div>
                    <div className="flex justify-between w-full my-1 sm:my-0 px-5 sm:px-0">
                        <div className="">
                            <div className="flex items-center justify-between border p-1 w-40 h-10 mx-0 sm:mx-5 rounded-md  ">
                                <div className="flex text-white items-center relative"><span className="ml-3">Sort By</span></div>
                                <button >
                                </button>
                                <div className="relative">
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <div className=" flex items-center justify-between  w-28 h-10 font-bold border p-1 px-5 mx-0 sm:mx-5 rounded-md transition-all duration-700 text-white">
                                <span>LIST</span>
                                <button >
                                </button>
                            </div>
                            <div className="flex text-white items-center justify-between my-1 sm:my-0  w-28 h-10 font-bold border p-1 px-5 mx-0 sm:mx-5 rounded-md transition-all duration-700">
                                <span>GRID</span>
                                <button >
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-5 grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-10'>
                <Card />
                <Card />
                <Card />
            </div>
        </div>

    )
}
