import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECTS, GET_SINGLE_PROJECT } from "../queries/projectQueries";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { FaMapMarkerAlt } from "react-icons/fa"
import { IoIosArrowRoundBack } from "react-icons/io"
import UpdateProject from "../components/UpdateProject";
import { CiTrash } from "react-icons/ci";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import React from "react";
import { ProjectInterface } from "../assets/interfaces";
import { toast } from "react-toastify"
import LoadingProject from "../components/LoadingProject";


export default function Project() {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data, error, loading } = useQuery(GET_SINGLE_PROJECT, { variables: { id } })
    const [deleteProject, { data: deleteProjectData, loading: deleteProjectLoading, error: deleteProjectError }] = useMutation(DELETE_PROJECT)

    if (loading) return <LoadingProject/>
    if (error) return <div>Error... {error.message}</div>

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        let answer: string;
        answer = prompt("Please enter the code to delete this user") as string
        if (!answer) return
        if (answer !== data.project.random) {
            toast.error("You can't delete this project as the code you provided is incorrect!", { position: "top-center" })
            return
        }
        deleteProject({
            variables: { "id": id },
            update(cache, { data }) {
                const { projects }: any = cache.readQuery({
                    query: GET_PROJECTS
                });
                console.log(deleteProject)
                cache.writeQuery({
                    query: GET_PROJECTS,
                    data: {
                        projects: projects.filter((project: ProjectInterface) => project.id !== data.deleteProject.id)
                    }
                })
            },
            onCompleted: () => { navigate("/"); toast.success("Project Deleted Successfully! ", { position: "top-center" }) },
            onError: (error) => { toast.error(error.message, { position: 'top-center' }) }

        })
    }

    return (
        <div className="my-10">
            {data.project ?
                <div className="flex flex-col justify-evenly sm:flex-row space-x-0 sm:space-x-10 sm:justify-center">
                    <div className="flex flex-col mx-5 justify-center items-center">

                        <div className="circle-bg w-full mx-5 p-5 shadow-md border">
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
                                        <img src={data.project?.client?.picture} className="h-20 w-auto rounded-full" alt="avatar" />
                                    </div>
                                    <div className="my-3">
                                        <p className="text-slate-600 mb-3">{data.project?.client?.name}<span className="text-orange-400">{" ("}{data.project.client?.country}{")"}</span></p>
                                        <ul>
                                            <li className="text-slate-600 flex items-center"><AiOutlineMail /><span className="ml-2">{data.project.client?.email}</span></li>
                                            <li className="text-slate-600 flex items-center"><AiOutlinePhone /><span className="ml-2">{data.project.client?.phone}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400 flex items-center"><FaMapMarkerAlt /><span>{data.project?.client?.street}</span></p>

                            </div>
                            <button onClick={handleDelete} className="border p-2 w-32 bg-red-400 text-white rounded-md shadow-md mt-5 bottom-0 flex items-center justify-between"><span>Delete</span> <CiTrash /></button>
                        </div>
                    </div>
                    <UpdateProject project={data.project} />
                </div> : <div><Navigate to="/404"></Navigate></div>}
        </div>
    )
}
