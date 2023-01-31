import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQueries"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

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

    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.gender) {
            return toast.error("Please fill all form fields", { position: 'top-center' })
        }
        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formData.email)) {
            toast.error("Email is incorrect. Please enter an email that is valid.", { position: 'top-center' })
            return
        }
        addClient({
            variables: { "name": formData.name.trim(), "email": formData.email.trim(), "phone": formData.phone.trim(), "gender": formData.gender },
            onCompleted: (data) => {
                navigate("/");
                toast.success("Client added Successfully ", { position: "top-center" });
                setTimeout(() => {
                    alert("Please save this code, you will need it incase you want to delete this user. Thanks \n Code: " + data.addClient.random)
                }, 2000)
            },
            onError: (error) => { toast.error(error.message, { position: 'top-center' }) },
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
            },
        })

    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev: UserI) => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev: UserI) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    if (loading) return <Loading />

    return (
        <div className="add-client  overflow-hidden">
            <div className="mx-5 flex justify-center items-center">

                <form className="w-96 my-5 relative z-40 mt-20 bg-slate-50 p-10 shadow-lg rounded-md" onSubmit={handleSubmit}>
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
