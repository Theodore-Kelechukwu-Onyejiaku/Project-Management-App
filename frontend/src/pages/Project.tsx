import { Link, Navigate, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROJECT } from "../queries/projectQueries";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { FaMapMarkerAlt } from "react-icons/fa"
import { IoIosArrowRoundBack } from "react-icons/io"
import UpdateProject from "../components/UpdateProject";
export default function Project() {
    const { id } = useParams();
    const { data, error, loading } = useQuery(GET_SINGLE_PROJECT, { variables: { id } })
    console.log(data, error, loading)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error... {error.message}</div>

    return (
        <div className="my-10">
            {data.project ?
                <div className="flex flex-col justify-evenly sm:flex-row space-x-0 sm:space-x-10 sm:justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <div className="circle-bg w-96 mx-5 p-5 shadow-md border">
                            <div className="flex justify-end">
                                <Link to="/" className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md flex items-center">
                                    <IoIosArrowRoundBack />
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className="my-3">
                                <span className="text-2xl font-bold">{data?.project.name}</span>
                                <p className='text-xlg h-36 text-slate-600 capitalize my-3'>{data.project.description}</p>
                            </div>
                            <div className="flex flex-col my-3">
                                <span className="text-slate-400 text-sm">status</span>
                                <span className="text-slate-600">{data.project.status}</span>
                            </div>
                            <div className="">
                                <span className="text-slate-400 text-sm font-bold">Client Information</span>
                                <div className="flex flex-col my-3">
                                    <div>
                                        <img src={data.project.client.picture} className="h-20 w-auto rounded-full" alt="avatar" />

                                    </div>
                                    <div className="my-3">
                                        <p className="text-slate-600 mb-3">{data.project.client.name}<span className="text-orange-400">{" ("}{data.project.client.country}{")"}</span></p>
                                        <ul>
                                            <li className="text-slate-600 flex items-center"><AiOutlineMail /><span className="ml-2">{data.project.client.email}</span></li>
                                            <li className="text-slate-600 flex items-center"><AiOutlinePhone /><span className="ml-2">{data.project.client.phone}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400 flex items-center"><FaMapMarkerAlt /><span>{data.project.client.street}</span></p>
                            </div>
                        </div>
                    </div>
                    <UpdateProject project={data.project} />
                </div> : <div><Navigate to="/404"></Navigate></div>}
        </div>
    )
}
