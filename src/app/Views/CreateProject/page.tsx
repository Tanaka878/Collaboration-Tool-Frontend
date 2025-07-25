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
      teamMembers: [{ email: '' }],
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
        teamMembers: [{ email: '' }],
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
    updatedTasks[taskIndex].teamMembers.push({ email: '' });
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log("Payload sent:", payload);

      if (!response.ok) throw new Error(`Server responded with status ${response.status}`);

      const result = await response.json();
      alert('Project created successfully!');
      console.log(result);
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Error creating project.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Create New Project</h1>
          <p className="text-gray-600 text-lg">Build something amazing with your team</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-300">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gray-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-800">Project Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    placeholder="Project description"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Finish Date</label>
                  <input
                    type="date"
                    value={finishDate}
                    onChange={(e) => setFinishDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
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
                  <div className="w-2 h-8 bg-gray-400 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
                </div>
                <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                  {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-6">
                {tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="relative bg-gray-50 border border-gray-300 rounded-2xl p-6 hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        <span className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {taskIndex + 1}
                        </span>
                        Task {taskIndex + 1}
                      </h3>
                      {tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTask(taskIndex)}
                          className="px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-lg hover:bg-red-200 text-sm"
                        >
                          Remove Task
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <input
                        type="text"
                        value={task.name}
                        onChange={(e) => handleTaskChange(taskIndex, 'name', e.target.value)}
                        placeholder="Task name"
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                        required
                      />
                      <input
                        type="text"
                        value={task.description}
                        onChange={(e) => handleTaskChange(taskIndex, 'description', e.target.value)}
                        placeholder="Description"
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                        required
                      />
                      <input
                        type="date"
                        value={task.startDate}
                        onChange={(e) => handleTaskChange(taskIndex, 'startDate', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                        required
                      />
                      <input
                        type="date"
                        value={task.finishDate}
                        onChange={(e) => handleTaskChange(taskIndex, 'finishDate', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                        required
                      />
                      <select
                        value={task.status}
                        onChange={(e) => handleTaskChange(taskIndex, 'status', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all md:col-span-2"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Team Members */}
                    <div className="bg-gray-100 border border-gray-300 rounded-xl p-4">
                      {task.teamMembers.map((member, memberIndex) => (
                        <div key={memberIndex} className="mb-4">
                          <input
                            type="email"
                            value={member.email}
                            onChange={(e) => handleMemberChange(taskIndex, memberIndex, 'email', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                            placeholder="member@email.com"
                            required
                          />
                          {task.teamMembers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTeamMember(taskIndex, memberIndex)}
                              className="mt-2 w-full px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-lg hover:bg-red-200 text-sm"
                            >
                              Remove Member
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addTeamMember(taskIndex)}
                        className="w-full px-4 py-2 bg-gray-500 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300 transition-all"
                      >
                        + Add Team Member
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTask}
                  className="w-full px-6 py-4 bg-gray-200 text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-300 transition-all font-medium text-lg"
                >
                  + Add New Task
                </button>
              </div>
            </div>

            {/* Submit Section */}
            <div className="p-6 md:p-8 bg-gray-100 border-t border-gray-300">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-all font-semibold text-lg shadow"
              >
                🚀 Create Project
              </button>
              <button
                type="button"
                onClick={NavigateBack}
                className="mt-4 w-full px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-semibold text-lg shadow"
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
