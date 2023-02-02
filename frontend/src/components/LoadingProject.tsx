export default function LoadingProject() {
    return (
        <div className="my-10 animate-pulse h-screen overflow-hidden">

            <div className="flex flex-col justify-evenly sm:flex-row space-x-0 sm:space-x-10 sm:justify-center">
                <div className="flex flex-col mx-5 justify-center items-center">

                    <div className="circle-bg w-full mx-5 p-5">
                        <div className="flex justify-end">
                            <span className='h-10 w-28 block bg-white animate-pulse'></span>
                        </div>
                        <div className="my-3">
                            <span className="text-2xl block w-32 h-10 bg-white font-bold"></span>
                            <p className='text-xlg h-36 text-slate-600 capitalize my-3'></p>
                        </div>
                        <div className="flex flex-col my-3">
                            <span className="text-slate-400 text-sm h-5 w-20 bg-white block"></span>
                            <span className="text-slate-600 h-5 w-28 bg-white block"></span>
                        </div>
                        <div className="">
                            <span className="text-slate-400 text-sm font-bold w-40 h-10 bg-white block"></span>
                            <div className="flex flex-col my-3">
                                <div>
                                    <div className='w-20 h-20  rounded-full'></div>
                                </div>
                                <div className="my-3">
                                    <p className="text-slate-600 mb-3"><span className="text-orange-400"></span></p>
                                    <div className='bg-white w-80 h-14 block'>
                                    </div>
                                    <span className="text-slate-600 items-center block bg-white w-32 h-10"><span className="ml-2"></span></span>

                                </div>
                            </div>
                            <p className="text-sm text-slate-400 flex items-center"><span></span></p>

                        </div>
                        <button className=" p-2 w-32 bg-white animate-pulse text-white rounded-md mt-5 bottom-0 flex items-center justify-between"><span>Delete</span></button>
                    </div>
                </div>
                <div className='my-10 sm:my-0'>
                    <div className='px-5'>
                        <form className="relative  rounded-md" >
                            <h1 className="text-2xl  mb-5 font-bold w-3/4 h-10 bg-white"></h1>
                            <div className="input-box">
                                <div className='w-2/3 h-5 bg-white'></div>
                                <div className='w-fu;l h-5 bg-white'></div>
                            </div>
                            <div className="">
                                <span className="h-10 w-96 bg-white block"></span>
                                <div  className="h-36 bg-white w-full my-3 p-2" >
                                </div>
                                <p className="absolute text-xs right-0 bottom-0"><span ></span></p>
                            </div>

                            <div className="flex flex-col relative mb-5">
                                <span className='h-10 w-28 bg-white'></span>
                                <div></div>
                            </div>
                            <span className="p-2 w-32 bg-white text-white rounded-md  mt-5 block">Update</span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
