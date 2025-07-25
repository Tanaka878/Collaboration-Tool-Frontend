import React, { useState, useEffect } from "react";
import {
  BarChart3,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Target,
  AlertCircle,
} from "lucide-react";

interface Task {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  status: string;
}

interface UserData {
  username: string;
  tasks: Task[];
  activeProjects: number;
  members: number;
  recentProjects: Project[];
}

export default function WelcomeScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;

      const response = await fetch("http://localhost:8080/api/projects/myData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data: UserData = await response.json();
        setUserData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  if (!userData) return <div className="p-4">Loading...</div>;

  const { username, tasks, activeProjects, members, recentProjects } = userData;

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#EBF2FA" }}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="p-4 rounded-lg flex justify-between items-center" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center space-x-3">
            <img
              src="\Images\no profile.png"
              alt="Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="text-lg font-semibold text-[#064789]">
                Welcome, {username}
              </div>
              <div className="text-sm text-[#427AA1]">Team Member</div>
            </div>
          </div>
          <div className="text-right text-sm text-[#427AA1]">
            <div>
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div>
              {currentTime.toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "#ffffff" }}>
            <Target className="mx-auto w-5 h-5 mb-2 text-[#427AA1]" />
            <div className="text-xl font-bold text-[#064789]">{activeProjects}</div>
            <div className="text-sm text-[#427AA1]">Active Projects</div>
          </div>
          <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "#ffffff" }}>
            <CheckCircle className="mx-auto w-5 h-5 mb-2 text-[#427AA1]" />
            <div className="text-xl font-bold text-[#064789]">
              {
                tasks.filter((task) => task.status?.toLowerCase() === "completed").length
              }
            </div>
            <div className="text-sm text-[#427AA1]">Completed Tasks</div>
          </div>
          <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "#ffffff" }}>
            <Clock className="mx-auto w-5 h-5 mb-2 text-[#427AA1]" />
            <div className="text-xl font-bold text-[#064789]">
              {
                tasks.filter((task) => task.status?.toLowerCase() === "pending").length
              }
            </div>
            <div className="text-sm text-[#427AA1]">Pending Tasks</div>
          </div>
          <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "#ffffff" }}>
            <Users className="mx-auto w-5 h-5 mb-2 text-[#427AA1]" />
            <div className="text-xl font-bold text-[#064789]">{members}</div>
            <div className="text-sm text-[#427AA1]">Team Members</div>
          </div>
        </div>

        {/* Recent Projects */}
        {recentProjects?.length > 0 && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: "#ffffff" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-1 text-[#064789]">
                <BarChart3 className="w-4 h-4" /> Recent Projects
              </h2>
            </div>
            <ul className="space-y-2">
              {recentProjects.map((project) => (
                <li key={project.id} className="border-b pb-2 last:border-b-0">
                  <div className="flex justify-between text-sm text-[#064789]">
                    <span className="font-medium">{project.name}</span>
                    <span>{project.status}</span>
                  </div>
                  <div className="text-xs text-[#427AA1]">
                    Due {project.finishDate}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Today's Tasks */}
        {tasks?.length > 0 && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: "#ffffff" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-1 text-[#064789]">
                <Clock className="w-4 h-4" /> Today's Tasks
              </h2>
              <span className="text-sm text-[#427AA1]">{tasks.length} tasks</span>
            </div>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.name} className="text-sm border-b pb-2 last:border-b-0">
                  <div className="flex justify-between text-[#064789]">
                    <span className="font-medium">{task.name}</span>
                    <span>{task.endDate}</span>
                  </div>
                  <div className="text-xs text-[#427AA1]">{task.description}</div>
                  {task.status?.toLowerCase() === "high" && (
                    <div className={`flex items-center gap-1 text-xs mt-1 ${getPriorityColor("high")}`}>
                      <AlertCircle className="w-3 h-3" />
                      High Priority
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
