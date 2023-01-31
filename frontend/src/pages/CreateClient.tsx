import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { Interface } from "readline"
import { ADD_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQueries"
import { ClientInterface } from "../assets/interfaces";

export default function CreateClient() {
    enum Gender {
        male,
        female
    }
    interface UserI {
        name: string,
        email: string,
        phone: string,
        gender: Gender | null,
    }


    const [formData, setFormData] = useState<UserI>({ name: "", email: "", phone: "", gender: null })
    const [addClient, { data, error, loading }] = useMutation(ADD_CLIENT)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        addClient({
            variables: { "name": formData.name, "email": formData.email, "phone": formData.phone, "gender": formData.gender },
            update(cache, { data: { addClient } }) {
                const { clients }: any = cache.readQuery({
                    query: GET_CLIENTS
                });
                cache.writeQuery({
                    query: GET_CLIENTS,

                    data: {
                        clients: [...clients, addClient]
                    }
                })
            }
        })

    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev: UserI) => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev: UserI) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div><span>error</span></div>

    return (
        <div className="add-client h-screen overflow-hidden">
            <div className="mx-5 flex justify-center items-center">

                <form className="w-96 my-5 relative z-50 mt-20 bg-slate-50 p-10 shadow-lg rounded-md" onSubmit={handleSubmit}>
                    <h1 className="text-2xl  mb-5 text-center">Create a client</h1>

                    <div className="input-box">
                        <input onChange={handleChange} name="name" value={formData.name} className="input" placeholder="Name" />
                        <label className="label">Name</label>
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="email" value={formData.email} className="input" placeholder="Email" />
                        <label className="label">Email</label>
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="phone" value={formData.phone} className="input" placeholder="Phone" />
                        <label className="label">Phone</label>
                    </div>
                    <div className="flex flex-col relative border mb-5">
                        <select onChange={handleSelect} name="gender" value={formData.gender as Gender} className="p-2">
                            <option>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button className="border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md">Add</button>
                </form>
            </div>
        </div>
    )
}
