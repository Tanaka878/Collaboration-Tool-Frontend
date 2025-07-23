'use client';

import { useState } from 'react';

export default function CreateProjectForm() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [status, setStatus] = useState('In Progress');

  const [tasks, setTasks] = useState([
    { name: '', description: '', startDate: '', finishDate: '', status: 'Pending' },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { name: '', email: '', role: '' },
  ]);

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { name: '', description: '', startDate: '', finishDate: '', status: 'Pending' }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '', role: '' }]);
  };

  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      projectName,
      description,
      startDate,
      finishDate,
      status,
      tasks,
      teamMembers,
    };

    try {
      const response = await fetch('http://localhost:8080/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-5xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6">Create New Project</h1>
        
        <div className="space-y-6">
          {/* Project Details */}
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Project Name" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              required 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              required 
            />
            <input 
              type="date" 
              placeholder="Start Date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              required 
            />
            <input 
              type="date" 
              placeholder="Finish Date" 
              value={finishDate} 
              onChange={(e) => setFinishDate(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              required 
            />
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              required
            >
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Tasks Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Tasks</h2>
            {tasks.map((task, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4 bg-slate-700/30 border border-slate-600 rounded-lg p-4">
                <input 
                  type="text" 
                  placeholder="Task Name" 
                  value={task.name} 
                  onChange={(e) => handleTaskChange(index, 'name', e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Description" 
                  value={task.description} 
                  onChange={(e) => handleTaskChange(index, 'description', e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  required 
                />
                <input 
                  type="date" 
                  placeholder="Start Date" 
                  value={task.startDate} 
                  onChange={(e) => handleTaskChange(index, 'startDate', e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  required 
                />
                <input 
                  type="date" 
                  placeholder="Finish Date" 
                  value={task.finishDate} 
                  onChange={(e) => handleTaskChange(index, 'finishDate', e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  required 
                />
                <select 
                  value={task.status} 
                  onChange={(e) => handleTaskChange(index, 'status', e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button 
                  type="button" 
                  onClick={() => removeTask(index)} 
                  className="px-4 py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-200 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addTask} 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Add Task
            </button>
          </div>

          {/* Team Members Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Team Members</h2>
            {teamMembers.map((member, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-4 bg-slate-700/30 border border-slate-600 rounded-lg p-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={member.name} 
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={member.email} 
                  onChange={(e) => handleMemberChange(index, 'email', e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Role" 
                  value={member.role} 
                  onChange={(e) => handleMemberChange(index, 'role', e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => removeTeamMember(index)} 
                  className="px-4 py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-200 font-medium col-span-3"
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addTeamMember} 
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 font-medium"
            >
              Add Team Member
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}