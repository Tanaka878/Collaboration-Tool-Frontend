"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  projectName: string;
  description: string;
  startDate: string;    // Will be converted from LocalDate
  finishDate: string;   // Will be converted from LocalDate
  status: string;
  tasks?: any[];        // Optional since it might not always be included
  teamMembers?: any[];  // Optional since it might not always be included
}

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter()

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;


  function CreateProject(){
    router.push("/Views/CreateProject")

  }

  useEffect(() => {
    fetchProjects(email || "");
  }, []);

  async function fetchProjects(userEmail: string) {
    try {
      const res = await fetch("http://localhost:8080/api/projects/getMyProjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProjectForEdit(projectId: string) {
    try {
      const res = await fetch(`http://localhost:8080/api/projects/project/${projectId}`);
      if (!res.ok) throw new Error("Failed to fetch project details");
      const data = await res.json();
      setEditingProject(data);
      console.log("My project data", data);
    } catch (err) {
      alert((err as Error).message);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpdateSubmit() {
    if (!editingProject) return;

    try {
      const res = await fetch(`http://localhost:8080/api/projects/update/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (!res.ok) throw new Error("Failed to update project");

      alert("Project updated successfully");
      setEditingProject(null);
      fetchProjects(email || "");
    } catch (err) {
      alert((err as Error).message);
    }
  }

  async function deleteProject(projectId: string) {
    try {
      const res = await fetch(`http://localhost:8080/api/projects/delete/${projectId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");

      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err) {
      alert((err as Error).message);
    }
  }

  // Helper function to format date for display
  function formatDateForDisplay(dateString: string): string {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  }

  // Helper function to format date for input field
  function formatDateForInput(dateString: string): string {
    if (!dateString) return "";
    return dateString.split("T")[0]; // Handle both LocalDate and DateTime formats
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Projects</h1>

      {loading && <p className="text-center text-blue-500">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-600">{project.projectName}</h2>
              <p className="text-gray-700 mt-2">{project.description}</p>

              <div className="mt-2 text-sm text-gray-600">
                <p><span className="font-medium">Start Date:</span> {formatDateForDisplay(project.startDate)}</p>
                <p><span className="font-medium">Finish Date:</span> {formatDateForDisplay(project.finishDate)}</p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className={`inline-block px-2 py-0.5 rounded text-white 
                    ${project.status === "Completed" ? "bg-green-600" :
                      project.status === "In Progress" ? "bg-yellow-600" :
                      project.status === "Pending" ? "bg-red-500" : "bg-gray-500"
                    }`}>
                    {project.status}
                  </span>
                </p>
              </div>
            </div>



            <div className="space-x-2">
              <button
                onClick={() => fetchProjectForEdit(project.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => deleteProject(project.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={CreateProject}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition duration-150"
      >
        Create Project
      </button>

      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Project: {editingProject.projectName}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  name="projectName"  // ✅ Fixed: was "name", now "projectName"
                  value={editingProject.projectName || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                  placeholder="Project Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editingProject.description || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Description"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formatDateForInput(editingProject.startDate)}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Finish Date</label>
                <input
                  type="date"
                  name="finishDate"
                  value={formatDateForInput(editingProject.finishDate)}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={editingProject.status || ""}
                  onChange={(e) => handleInputChange(e as any)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}