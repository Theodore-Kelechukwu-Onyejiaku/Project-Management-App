import { GET_PROJECTS } from '../queries/projectQueries'
import { useQuery } from '@apollo/client'
import ProjectCard from './ProjectCard';
import { ProjectInterface } from '../assets/interfaces';
import { VscSearchStop } from "react-icons/vsc"
import Loading from './Loading';

export default function Projects() {
    const { data, error, loading } = useQuery(GET_PROJECTS);
    if (loading) return <Loading />
    if (error) return <div>Error... {error.message}</div>
    return (
        <div className='my-10'>
            <h1 className="my-5 mx-5 font-bold text-3xl">Projects</h1>
            <div className='mx-5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10'>
                {data.projects.length ? data.projects.map((project: ProjectInterface) => (
                    <ProjectCard key={project.id} project={project} />))
                    :
                    <div className="w-full bg-slate-100 border absolute left-0  h-40 text-center flex flex-col justify-center items-center">
                        <VscSearchStop className="text-red-700" size={30} />
                        <span>Projects not available at the  moment!</span>
                    </div>
                }
            </div>
        </div>
    )
}
