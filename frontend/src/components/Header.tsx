import { GrProjects } from "react-icons/gr"

export default function Header() {
    return (
        <div className="bg-slate-100 p-5">
            <div className="">
                <a href="/" className="text-3xl text-orange-400 flex items-center">
                    <GrProjects color="blue" className="text-white"/> 
                    <span className="ml-3">Project Mgt</span> 
                </a>
            </div>
        </div>
    )
}
