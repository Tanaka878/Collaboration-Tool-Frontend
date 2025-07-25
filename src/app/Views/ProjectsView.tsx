"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TeamMember {
  id: string;
  email: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  status: string;
  teamMembers: TeamMember[];
}

interface Project {
  id: string;
  projectName: string;
  description: string;
  startDate: string;
  finishDate: string;
  status: string;
  tasks?: Task[];
  teamMembers?: TeamMember[];
}

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTeamMemberEmail, setNewTeamMemberEmail] = useState("");
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    name: "",
    description: "",
    startDate: "",
    finishDate: "",
    status: "Pending",
    teamMembers: [],
  });

  const router = useRouter();
  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  function CreateProject() {
    router.push("/Views/CreateProject");
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
      setNewTeamMemberEmail("");
      setNewTask({ name: "", description: "", startDate: "", finishDate: "", status: "Pending", teamMembers: [] });
    } catch (err) {
      alert((err as Error).message);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddTeamMember() {
    if (!editingProject || !newTeamMemberEmail.trim()) return;
    const exists = editingProject.teamMembers?.some(member => member.email === newTeamMemberEmail.trim());
    if (exists) return alert("Team member already exists");

    const updatedProject = {
      ...editingProject,
      teamMembers: [...(editingProject.teamMembers || []), { id: uuidv4(), email: newTeamMemberEmail.trim() }],
    };
    setEditingProject(updatedProject);
    setNewTeamMemberEmail("");
  }

  function handleRemoveTeamMember(emailToRemove: string) {
    if (!editingProject) return;
    const updatedTeam = editingProject.teamMembers?.filter(member => member.email !== emailToRemove);
    setEditingProject({ ...editingProject, teamMembers: updatedTeam });
  }

  function handleAddTask() {
    if (!editingProject || !newTask.name.trim()) return;
    const updatedProject = {
      ...editingProject,
      tasks: [...(editingProject.tasks || []), { ...newTask, id: uuidv4() }],
    };
    setEditingProject(updatedProject);
    setNewTask({ name: "", description: "", startDate: "", finishDate: "", status: "Pending", teamMembers: [] });
  }

  async function handleUpdateSubmit() {
    if (!editingProject) return;

    // Helper to format date strings
    const formatDate = (date: string) => date ? date.split("T")[0] : "";

    // Prepare the payload with formatted dates
    const payload = {
      ...editingProject,
      startDate: formatDate(editingProject.startDate),
      finishDate: formatDate(editingProject.finishDate),
      tasks: editingProject.tasks?.map(task => ({
        ...task,
        startDate: formatDate(task.startDate),
        finishDate: formatDate(task.finishDate),
        teamMembers: task.teamMembers || [],
      })),
      teamMembers: editingProject.teamMembers || [],
    };

    try {
      const res = await fetch(`http://localhost:8080/api/projects/update/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  function formatDateForDisplay(dateString: string): string {
    return dateString ? new Date(dateString).toLocaleDateString() : "";
  }

  function formatDateForInput(dateString: string): string {
    return dateString ? dateString.split("T")[0] : "";
  }

  return (
    <div className="flex-1 bg-[#ebf2fa] min-h-screen overflow-y-auto">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#064789]">My Projects</h1>

        {loading && <p className="text-center text-[#427aa1]">Loading projects...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-[#064789]">{project.projectName}</h2>
                  <p className="text-gray-700 mt-2">{project.description}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>Start:</strong> {formatDateForDisplay(project.startDate)}</p>
                    <p><strong>Finish:</strong> {formatDateForDisplay(project.finishDate)}</p>
                    <p><strong>Status:</strong> {project.status}</p>
                  </div>

                  <div className="mt-2 text-sm">
                    <p className="font-semibold text-[#427aa1] mt-2">Team Members:</p>
                    <ul className="list-disc list-inside">
                      {project.teamMembers?.map(tm => (
                        <li key={tm.id}>{tm.email}</li>
                      ))}
                    </ul>

                    <p className="font-semibold text-[#427aa1] mt-4">Tasks:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {project.tasks?.map(task => (
                        <li key={task.id}><strong>{task.name}</strong> – {task.status} ({formatDateForDisplay(task.startDate)} → {formatDateForDisplay(task.finishDate)})</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <button onClick={() => fetchProjectForEdit(project.id)} className="bg-[#427aa1] hover:bg-[#064789] text-white px-3 py-1 rounded">Update</button>
                  <button onClick={() => deleteProject(project.id)} className="bg-[#ebf2fa] hover:bg-[#064789] text-[#064789] px-3 py-1 rounded border border-[#064789]">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={CreateProject} className="mt-6 bg-[#064789] hover:bg-[#427aa1] text-white font-semibold px-4 py-2 rounded shadow transition duration-150">Create Project</button>

        {editingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-bold mb-4 text-[#064789]">Edit Project</h2>
              <div className="space-y-4">
                <input type="text" name="projectName" value={editingProject.projectName || ""} onChange={handleInputChange} placeholder="Project Name" className="w-full border px-3 py-2 rounded" />
                <textarea name="description" value={editingProject.description || ""} onChange={handleInputChange} rows={3} className="w-full border px-3 py-2 rounded" placeholder="Description" />
                <input type="date" name="startDate" value={formatDateForInput(editingProject.startDate)} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                <input type="date" name="finishDate" value={formatDateForInput(editingProject.finishDate)} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                <select name="status" value={editingProject.status} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <div>
                  <h3 className="font-semibold text-[#427aa1] mt-4">Team Members</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {editingProject.teamMembers?.map(member => (
                      <li key={member.id} className="flex justify-between items-center">
                        {member.email}
                        <button className="ml-2 text-red-500" onClick={() => handleRemoveTeamMember(member.email)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-2 mt-2">
                    <input type="email" placeholder="New Member Email" value={newTeamMemberEmail} onChange={(e) => setNewTeamMemberEmail(e.target.value)} className="w-full border px-2 py-1 rounded" />
                    <button onClick={handleAddTeamMember} className="px-3 py-1 bg-[#427aa1] text-white rounded">Add</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#427aa1] mt-4">Tasks</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {editingProject.tasks?.map(task => (
                      <li key={task.id}><strong>{task.name}</strong> – {task.status}</li>
                    ))}
                  </ul>
                  <div className="mt-2 space-y-2">
                    <input type="text" placeholder="Task Name" value={newTask.name} onChange={e => setNewTask({ ...newTask, name: e.target.value })} className="w-full border px-2 py-1 rounded" />
                    <textarea placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} className="w-full border px-2 py-1 rounded"></textarea>
                    <input type="date" value={newTask.startDate} onChange={e => setNewTask({ ...newTask, startDate: e.target.value })} className="w-full border px-2 py-1 rounded" />
                    <input type="date" value={newTask.finishDate} onChange={e => setNewTask({ ...newTask, finishDate: e.target.value })} className="w-full border px-2 py-1 rounded" />
                    <select value={newTask.status} onChange={e => setNewTask({ ...newTask, status: e.target.value })} className="w-full border px-2 py-1 rounded">
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button onClick={handleAddTask} className="px-3 py-1 bg-[#427aa1] text-white rounded">Add Task</button>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button onClick={() => setEditingProject(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleUpdateSubmit} className="px-4 py-2 bg-[#064789] text-white rounded hover:bg-[#427aa1]">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
