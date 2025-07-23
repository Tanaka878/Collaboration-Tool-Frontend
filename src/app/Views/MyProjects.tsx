"use client";

import { useEffect, useState } from "react";

interface Project {
  name: string;
  description: string;
}

export default function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  useEffect(() => {
    if (email) {
      fetchProjects(email);
    } else {
     fetchProjects("")
    }
  }, [email]);

  async function fetchProjects(userEmail: string) {
    try {
      const res = await fetch("http://localhost:8080/api/projects/getMyProjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();
      console.log("Fetched projects:", data);
      setProjects(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Projects</h1>

      {loading && <p className="text-center text-blue-500">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-600">{project.name}</h2>
            <p className="text-gray-700 mt-2">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
