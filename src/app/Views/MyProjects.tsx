"use client";

import { useEffect, useState } from "react";

interface Project {
  projectName: string;
  description: string;
  startDate: string;  // ISO string
  finishDate: string; // ISO string
  status: string;
  // optionally tasks and teamMembers if you want to edit them too
}

export default function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

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

  async function fetchProjectForEdit(projectName: string) {
    try {
      const res = await fetch(`http://localhost:8080/api/projects/project/${encodeURIComponent(projectName)}`);
      if (!res.ok) throw new Error("Failed to fetch project details");
      const data = await res.json();
      setEditingProject(data);
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
      const res = await fetch(`http://localhost:8080/api/projects/update/${encodeURIComponent(editingProject.projectName)}`, {
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

  async function deleteProject(projectName: string) {
    try {
      const res = await fetch(`http://localhost:8080/api/projects/delete/${encodeURIComponent(projectName)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");

      setProjects(prev => prev.filter(p => p.projectName !== projectName));
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Projects</h1>

      {loading && <p className="text-center text-blue-500">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-600">{project.projectName}</h2>
              <p className="text-gray-700 mt-2">{project.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => fetchProjectForEdit(project.projectName)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => deleteProject(project.projectName)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit form modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Project: {editingProject.projectName}</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="projectName"
                value={editingProject.projectName}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="description"
                value={editingProject.description || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Description"
              />
              <input
                type="date"
                name="startDate"
                value={editingProject.startDate?.split("T")[0] || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="date"
                name="finishDate"
                value={editingProject.finishDate?.split("T")[0] || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="status"
                value={editingProject.status || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Status"
              />
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
