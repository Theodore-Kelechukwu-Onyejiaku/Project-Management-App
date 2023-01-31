import { GrProjects } from "react-icons/gr"
import { Link, Routes, Route, useLocation } from "react-router-dom"
import { ImUserPlus } from "react-icons/im"
import { GoProject } from "react-icons/go"
import projectIcon from "../../src/assets/images/project.png"

export default function Header() {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <div className="bg-slate-100 p-5 flex justify-between">
            <div>
                <Link to="/" className="flex items-center text-2xl text-orange-400"><img width={24} src={projectIcon} alt="banner" /><span className="ml-3">Project MGT</span></Link>
            </div>
            <div className="flex space-x-5">
                <Link to="/create-client" className={`${location.pathname === "/create-client" ? "text-orange-400 " : ""} flex items-center p-3`}><span className="hidden sm:block mr-3">Add Client</span><ImUserPlus size={24} /></Link>
                <Link to="/create-project" className={`${location.pathname === "/create-project" ? "text-orange-400 " : ""} flex items-center p-3`}><span className="hidden sm:block mr-3">Add Project</span><GoProject size={24} /></Link>
            </div>
        </div>
    )
}
