import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_SINGLE_CLIENT } from '../queries/clientQueries'
import { IoIosArrowRoundBack } from "react-icons/io"
import LoadingClient from '../components/LoadingClient';

export default function Client() {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_SINGLE_CLIENT, { variables: { id } })

    if (loading) return <LoadingClient/>
    if (error) return <div>Error </div>

    return (
        <div className='my-20'>
            <div className='flex px-5 sm:px-0 flex-col items-center justify-center'>
                <div className="w-full sm:w-1/2 border rounded-md p-10 shadow-md flex flex-col bg-white wave-bg relative">
                    <div className="flex justify-end">
                        <Link to="/" className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md flex items-center">
                            <IoIosArrowRoundBack />
                            <span>Back</span>
                        </Link>
                    </div>
                    <div className="flex  justify-between">
                        <div className="mb-5">
                            <img className="rounded-full w-14 h-14" src={data.client.picture} alt="avatar" />
                            <span className="text-lg font-bold break-words">
                                {data.client.name.split(" ")[0] + " "}
                                {data.client.name.split(" ")[1] ? data.client.name.split(" ")[1]?.split("")[0] + "." : ""}
                                {data.client.name.split(" ")[2] ? data.client.name.split(" ")[2]?.split("")[0] + "." : ""}
                            </span>
                            <span>{"("}{data.client.country}{")"}</span>
                        </div>

                    </div>
                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400">
                                Age
                            </span>
                            <span className="text-sm text-slate-500">{data.client.age}yrs</span>
                        </div>
                        <div className="flex flex-col ml-10">
                            <span className="text-xs text-slate-400">
                                Gender
                            </span>
                            <span className="text-sm text-slate-500">{data.client.gender}</span>
                        </div>
                    </div>
                    <div className="my-10 flex flex-col text-base">
                        <div className='flex flex-col'>
                            <span className="text-xs text-slate-400">
                                Email
                            </span>
                            <span className="text-smn text-slate-500">{data.client.email}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className="text-xs text-slate-400">
                                Phone
                            </span>
                            <span className="text-smn text-slate-500">{data.client.phone}</span>
                        </div>

                    </div>

                    <div className="absolute bottom-0 mb-3 flex flex-col">
                        <span className="text-xs text-slate-400">Street</span>
                        <span className="text-sm text-slate-500">{data.client.street}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
