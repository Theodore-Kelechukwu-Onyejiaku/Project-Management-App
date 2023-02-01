import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ClientInterface, ProjectI } from "../assets/interfaces";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries"
import { GET_PROJECTS } from "../queries/projectQueries";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";


export default function CreateProject({ client }: { client: any }) {
    const navigate = useNavigate();
    const [addProject, { data: addedProject, loading: addProjectLoading, error: addProjectError }] = useMutation(ADD_PROJECT);
    const { data: clients, loading: clientsLoading, error: clientError } = useQuery(GET_CLIENTS);
    const { data: projects, loading: projectsLoading, error: projectError } = useQuery(GET_PROJECTS)
    const selectRef = useRef<HTMLSelectElement | null>(null)



    const [formData, setFormData] = useState<ProjectI>({ name: "", description: "", client: "" })
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!formData.name || !formData.description || !formData.client) {
            return toast.error("Please fill all form fields", { position: 'top-center' })
        }
        addProject({
            variables: { "name": formData.name, "description": formData.description, "client": formData.client },
            onCompleted: (data) => {
                navigate("/");
                toast.success("Project Successfully Added! ", { position: "top-center", autoClose: 1000 })
                setTimeout(() => {
                    toast.info("Please save the code below, you will need it if perhaps you want to delete this newly created project. Thanks \n Code: " + data.addProject.random, {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }, 5000)
            },
            onError: (error) => { toast.error(error.message, { position: 'top-center' }) },
            update(cache, { data: { addProject } }) {
                const { projects }: any = cache.readQuery({
                    query: GET_PROJECTS
                });
                console.log("the projects gotten", projects)

                cache.writeQuery({
                    query: GET_PROJECTS,

                    data: {
                        projects: [...projects, addProject]
                    }
                })
            }
        })
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev: ProjectI) => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, client: selectRef.current?.value }))
    }

    if (addProjectLoading) return <Loading />
    if (clientsLoading) return <div>Loading Clients...</div>
    if (clientError) return <div>Error loading clients.</div>
    if (projectsLoading) return <div>Loading Project...</div>
    if (projectError) return <div>Error loading project.</div>

    return (
        <div className="add-client h-screen overflow-hidden">
            <div className="mx-5 flex justify-center items-center">
                <form className="w-96 my-5 relative z-40 mt-20 bg-slate-50 p-10 shadow-lg rounded-md" onSubmit={handleSubmit}>
                    <h1 className="text-2xl  mb-5 text-center">Create a Project</h1>
                    <div className="input-box">
                        <input onChange={handleChange} name="name" value={formData.name} className="input" placeholder="Project Name" />
                        <label className="label">Project Name</label>
                    </div>
                    <div className="input-box">
                        <label className="">Project Description</label>

                        <textarea onChange={handleChange} name="description" maxLength={200} className="h-36 w-full my-3 p-2" placeholder="Enter Project Description">

                        </textarea>
                        <p className="absolute text-xs right-0 bottom-0"><span className={`${formData.description.length >= 200 ? "text-red-500" : ""}`}>{formData.description.length}/200</span></p>
                    </div>

                    <div className="flex flex-col relative mb-5">
                        <label>Client</label>
                        <select ref={selectRef} onChange={handleSelect} name="client" className="p-2 my-1">
                            <option>_Select Client_</option>
                            {clients.clients.map((client: ClientInterface) => (
                                <option value={client.id}>{client.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md">Add</button>
                </form>

            </div>
        </div>
    )
}