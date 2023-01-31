import React from 'react'
import { VscSearchStop } from "react-icons/vsc"


export default function NotFound() {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className="h-40">
                <div className="w-full bg-slate-100 absolute left-0  h-40 text-center flex flex-col justify-center items-center">
                    <span className='text-slate-400 text-5xl'>404</span>
                    <VscSearchStop className="text-red-700" size={30} />
                    <span className='text-red-500'>Resource or Data Not Found!</span>
                </div>
            </div>
        </div>
    )
}