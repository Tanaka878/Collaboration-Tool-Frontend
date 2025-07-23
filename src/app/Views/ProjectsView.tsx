import React from 'react'
import MyProjects from './MyProjects'
import { useRouter } from 'next/navigation';

const ProjectsView = () => {

    const router = useRouter();

    function handleRoute(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        router.push("/Views/CreateProject")
        
    }
  return (
    <div>

        <MyProjects />
        <button onClick={handleRoute}>Create Project</button>
      
    </div>
  )
}

export default ProjectsView
