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

  const handleTaskChange = (index: number, field: string, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { name: '', description: '', startDate: '', finishDate: '', status: 'Pending' }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '', role: '' }]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
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
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="input" required />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input" required />
          <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" required />
          <input type="date" placeholder="Finish Date" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} className="input" required />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="input" required>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Tasks Section */}
        <div>
          <h2 className="text-lg font-semibold">Tasks</h2>
          {tasks.map((task, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4 border p-4 rounded-md">
              <input type="text" placeholder="Task Name" value={task.name} onChange={(e) => handleTaskChange(index, 'name', e.target.value)} className="input" required />
              <input type="text" placeholder="Description" value={task.description} onChange={(e) => handleTaskChange(index, 'description', e.target.value)} className="input" required />
              <input type="date" placeholder="Start Date" value={task.startDate} onChange={(e) => handleTaskChange(index, 'startDate', e.target.value)} className="input" required />
              <input type="date" placeholder="Finish Date" value={task.finishDate} onChange={(e) => handleTaskChange(index, 'finishDate', e.target.value)} className="input" required />
              <select value={task.status} onChange={(e) => handleTaskChange(index, 'status', e.target.value)} className="input" required>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button type="button" onClick={() => removeTask(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addTask} className="btn">Add Task</button>
        </div>

        {/* Team Members Section */}
        <div>
          <h2 className="text-lg font-semibold">Team Members</h2>
          {teamMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4 border p-4 rounded-md">
              <input type="text" placeholder="Name" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)} className="input" required />
              <input type="email" placeholder="Email" value={member.email} onChange={(e) => handleMemberChange(index, 'email', e.target.value)} className="input" required />
              <input type="text" placeholder="Role" value={member.role} onChange={(e) => handleMemberChange(index, 'role', e.target.value)} className="input" required />
              <button type="button" onClick={() => removeTeamMember(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addTeamMember} className="btn">Add Team Member</button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
          Create Project
        </button>
      </form>
    </div>
  );
}
