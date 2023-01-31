import { ProjectInterface } from '../assets/interfaces';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }: { project: ProjectInterface }) {
    return (
        <div className='border h-40 p-4 shadow-md bg-white circle-bg'>
            <div className='flex justify-between items-center'>
                <div>
                    <span className=' text-xlg font-bold'>{project.name}</span>
                </div>
                <Link to={`/project/${project.id}`} className='border p-2 w-32 bg-orange-400 text-white rounded-md shadow-md'>view</Link>
            </div>
            <div>
                <span className='text-sm text-slate-400'>Status:</span>
                <span>{"   "}{project.status || "nothing"}</span>
            </div>
        </div>
    )
}
