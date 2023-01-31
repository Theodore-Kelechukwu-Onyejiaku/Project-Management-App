import React, { useState, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { ProjectI } from '../assets/interfaces'
import { UPDATE_PROJECT } from '../mutations/projectMutations'
import { GET_SINGLE_PROJECT } from '../queries/projectQueries'
import { toast } from "react-toastify"

interface UpdateProps {
    project: ProjectI,
    handleUpdate: (event: React.FormEvent) => void
    id: string,
    name: string,
    description: string,
    status: string,
}

export default function UpdateProject({ project }: { project: ProjectI }) {

    const [formData, setFormData] = useState<ProjectI>({ name: project.name, description: project.description, status: project.status })

    const [updateProject, { data, error, loading }] = useMutation(UPDATE_PROJECT);
    const selectRef = useRef<HTMLSelectElement | null>(null)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        updateProject({
            variables: { id: project.id, name: formData.name, description: formData.description, status: formData.status },
            refetchQueries: [{ query: GET_SINGLE_PROJECT, variables: { id: project.id } }],
            onCompleted: () => { toast.success("Update Successful ", {position: "top-center"}) },
            onError: (error) =>{ toast.error(error.message, {position:'top-center'})}
        })

    }
    const handleSelect = () => {
        setFormData((prev) => ({ ...prev, status: selectRef.current?.value }))
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev: ProjectI) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    if (loading) return <div>Loading....</div>


    return (
        <div className='my-10 sm:my-0'>
            <div className='px-5'>
                <form className="relative z-50  rounded-md" onSubmit={handleSubmit}>
                    <h1 className="text-2xl  mb-5 font-bold">Update Project Details</h1>
                    <div className="input-box">
                        <input onChange={handleChange} name="name" value={formData.name} className="input" placeholder="Project Name" />
                        <label className="label">Project Name</label>
                    </div>
                    <div className="input-box">
                        <label className="">Project Description</label>

                        <textarea onChange={handleChange} name="description" className="h-36 w-full my-3 p-2" placeholder="Enter Project Description">
                            {project.description}
                        </textarea>
                        <p className="absolute text-xs right-0 bottom-0"><span className={`${formData.description.length >= 200 ? "text-red-500" : ""}`}>{formData.description.length}/200</span></p>
                    </div>

                    <div className="flex flex-col relative mb-5">
                        <label>Status</label>
                        <select defaultValue={project.status} ref={selectRef} onChange={handleSelect} name="status" className="p-2 my-3">
                            <option value="completed">completed</option>
                            <option value="notStarted">notStarted</option>
                            <option value="inProgress">inProgress</option>
                        </select>
                    </div>
                    <button className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md mt-5">Update</button>
                </form>
            </div>
        </div>
    )
}
