import React, { useState, useRef } from 'react'
import { ProjectI } from '../assets/interfaces'

export default function UpdateProject({ project }: { project: ProjectI }) {
    const [formData, setFormData] = useState<ProjectI>({ name: project.name, description: project.description })

    const selectRef = useRef<HTMLSelectElement | null>(null)


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
    }
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, client: selectRef.current?.value }))
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev: ProjectI) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    return (

        <div className='my-10 sm:my-0'>
            <div className='px-5'>
                <form className="relative z-50  rounded-md" onSubmit={handleSubmit}>
                    <h1 className="text-2xl  mb-5">Update Project Details</h1>
                    <div className="input-box">
                        <input onChange={handleChange} name="name" value={formData.name} className="input" placeholder="Project Name" />
                        <label className="label">Project Name</label>
                    </div>
                    <div className="input-box">
                        <label className="">Project Description</label>

                        <textarea onChange={handleChange} name="description" className="h-36 w-full my-3 p-2" placeholder="Enter Project Description">
                            {project.description}
                        </textarea>
                    </div>

                    <div className="flex flex-col relative mb-5">
                        <label>Status</label>
                        <select value={project.status} ref={selectRef} onChange={handleSelect} name="client" className="p-2 my-3">
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
