import React from 'react'
import { VscSearchStop } from "react-icons/vsc"
import { ImUserPlus } from "react-icons/im"
import { GoProject } from "react-icons/go"


export default function ErrorComponent({ message, error, type }: { message: string, error: Error, type: string }) {
    return (
        <div>
            <div className='flex flex-col justify-center items-center my-20'>
                <div className="h-40">
                    <div className="w-full bg-slate-100 absolute left-0  h-40 text-center flex flex-col justify-center items-center">
                        <span className='text-slate-400 text-5xl my-3'>Ooops</span>
                        <div className='flex items-center text-red-700'>
                            <VscSearchStop size={50} />
                            {type === "client" ? <ImUserPlus size={40}/> : <GoProject size={40}/>}
                        </div>
                        <span className='text-red-500 text-lg my-3 font-bold'>
                            {message}
                        </span>
                        <span className='text-red-500 text-sm'>
                            {error.message}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}