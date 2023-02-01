
export default function LoadingClient() {
    return (
        <div className='animate-pulse'>
            <div className='flex px-5 sm:px-0 flex-col items-center justify-center'>
                <div className="w-full sm:w-1/2 border rounded-md p-10 shadow-md flex flex-col bg-white wave-bg relative">
                    <div className="flex justify-end">
                        <span className="block w-28 h-10 bg-white"></span>
                    </div>
                    <div className="flex  justify-between">
                        <div className="mb-5">
                            <div className='w-20 h-20 border bg-white my-3 animate-pulse rounded-full'></div>
                            <span className="block w-44 h-10 bg-white">

                            </span>
                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex flex-col">
                            <span className="block w-44 h-10 bg-white">
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="block w-28 h-10 bg-white">
                            </span>
                        </div>
                    </div>
                    <div className="my-10 flex flex-col text-base">
                        <div className='flex flex-col'>
                            
                            <span className="block w-28 h-5 bg-white"></span>
                        </div>
                        <div className='flex flex-col'>
                            
                            <span className="block w-28 h-5 bg-white"></span>
                        </div>

                    </div>

                    <div className="absolute bottom-0 mb-3 flex flex-col">
                        <span className="block w-20 border h-10 bg-white"></span>
                        <span className="block w-44 border h-10 bg-white"></span>
                    </div>

                </div>
            </div>
        </div>
    )
}
