import { GrProjects } from "react-icons/gr"
import { Link, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"

export default function Header() {
    return (
        <div className="bg-slate-100 p-5 flex justify-between">
            <div>
                <Link to="/" className="flex items-center text-3xl text-orange-400"><GrProjects /><span className="ml-3">Project MGT</span></Link>
            </div>
            <div>
                <Link to="/create-client">Add Client</Link>
                <Link to="/create-project">Add Project</Link>
            </div>
        </div>
    )
}
