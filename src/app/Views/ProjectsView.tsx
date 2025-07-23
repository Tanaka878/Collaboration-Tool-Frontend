import React from "react";
import MyProjects from "./MyProjects";
import { useRouter } from "next/navigation";

const ProjectsView = () => {
  const router = useRouter();

  function handleRoute(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    router.push("/Views/CreateProject");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">My Projects</h1>
        <MyProjects />
      </div>
      
      <button
        onClick={handleRoute}
        className="bg-blue-600 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
      >
        + Create New Project
      </button>
    </div>
  );
};

export default ProjectsView;
