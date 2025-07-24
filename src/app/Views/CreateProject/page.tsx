'use client';

import { useState } from 'react';

export default function CreateProjectForm() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [status, setStatus] = useState('In Progress');

  const [tasks, setTasks] = useState([
    {
      name: '',
      description: '',
      startDate: '',
      finishDate: '',
      status: 'Pending',
      teamMembers: [{ email: '' }], // Only email field as per TeamMember entity
    },
  ]);


  const NavigateBack = () => {
    window.history.back();
  };

  const handleTaskChange = (index: number, field: string, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        name: '',
        description: '',
        startDate: '',
        finishDate: '',
        status: 'Pending',
        teamMembers: [{ email: '' }], // Only email field
      },
    ]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleMemberChange = (taskIndex: number, memberIndex: number, field: string, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].teamMembers[memberIndex][field] = value;
    setTasks(updatedTasks);
  };

  const addTeamMember = (taskIndex: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].teamMembers.push({ email: '' }); // Only email field
    setTasks(updatedTasks);
  };

  const removeTeamMember = (taskIndex: number, memberIndex: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].teamMembers = updatedTasks[taskIndex].teamMembers.filter((_, i) => i !== memberIndex);
    setTasks(updatedTasks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      projectName,
      description,
      startDate,
      finishDate,
      status,
      tasks,
    };

    try {
      const response = await fetch('http://localhost:8080/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log("Payload sent:", payload);

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const result = await response.json();
      alert('Project created successfully!');
      console.log(result);
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Error creating project.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-2">
            Create New Project
          </h1>
          <p className="text-slate-300 text-lg">Build something amazing with your team</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Project Details Section */}
            <div className="p-6 md:p-8 border-b border-slate-700/50">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-white">Project Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Description</label>
                  <input
                    type="text"
                    placeholder="Project description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Finish Date</label>
                  <input
                    type="date"
                    value={finishDate}
                    onChange={(e) => setFinishDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70"
                    required
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-white">Tasks</h2>
                </div>
                <span className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                  {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-6">
                {tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="relative bg-slate-700/30 border border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-300"
                  >
                    {/* Task Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {taskIndex + 1}
                        </span>
                        Task {taskIndex + 1}
                      </h3>
                      {tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTask(taskIndex)}
                          className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-200 font-medium text-sm"
                        >
                          Remove Task
                        </button>
                      )}
                    </div>

                    {/* Task Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Task Name</label>
                        <input
                          type="text"
                          placeholder="Enter task name"
                          value={task.name}
                          onChange={(e) => handleTaskChange(taskIndex, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Description</label>
                        <input
                          type="text"
                          placeholder="Task description"
                          value={task.description}
                          onChange={(e) => handleTaskChange(taskIndex, 'description', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Start Date</label>
                        <input
                          type="date"
                          value={task.startDate}
                          onChange={(e) => handleTaskChange(taskIndex, 'startDate', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Finish Date</label>
                        <input
                          type="date"
                          value={task.finishDate}
                          onChange={(e) => handleTaskChange(taskIndex, 'finishDate', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300">Status</label>
                        <select
                          value={task.status}
                          onChange={(e) => handleTaskChange(taskIndex, 'status', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div className="bg-slate-600/20 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                          </svg>
                          Team Members
                        </h4>
                        <span className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
                          {task.teamMembers.length} member{task.teamMembers.length !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {task.teamMembers.map((member, memberIndex) => (
                          <div key={memberIndex} className="bg-slate-500/20 rounded-lg p-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">Email</label>
                                <input
                                  type="email"
                                  placeholder="member@email.com"
                                  value={member.email}
                                  onChange={(e) =>
                                    handleMemberChange(taskIndex, memberIndex, 'email', e.target.value)
                                  }
                                  className="w-full px-3 py-2 bg-slate-500/50 border border-slate-400 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                  required
                                />
                              </div>
                            </div>

                            {task.teamMembers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeTeamMember(taskIndex, memberIndex)}
                                className="mt-3 w-full px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-200 font-medium text-sm"
                              >
                                Remove Member
                              </button>
                            )}
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => addTeamMember(taskIndex)}
                          className="w-full px-4 py-3 bg-gradient-to-r from-green-600/20 to-teal-600/20 text-green-400 border border-green-500/30 rounded-lg hover:from-green-600/30 hover:to-teal-600/30 transition-all duration-200 font-medium"
                        >
                          + Add Team Member
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTask}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30 rounded-xl hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 font-medium text-lg"
                >
                  + Add New Task
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-6 md:p-8 bg-slate-700/20 border-t border-slate-700/50">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                🚀 Create Project
              </button>

                <button
                type="button"
                onClick={NavigateBack}
                className="mt-4 w-full px-8 py-3 bg-gradient-to-r from-slate-600 via-blue-700 to-slate-600 text-white rounded-xl hover:from-slate-700 hover:via-blue-800 hover:to-slate-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                ← Back
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}