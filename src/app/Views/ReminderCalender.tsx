'use client';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Reminder {
  id?: string;
  date: string;
  title: string;
  description: string;
}

const ReminderCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedReminders, setSelectedReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const email = typeof window !== 'undefined' ? localStorage.getItem('email') : '';

  const fetchReminders = async () => {
    const res = await fetch(`http://localhost:8080/api/projects/reminders/${email}`);
    const data = await res.json();
    setReminders(data);
  };

  useEffect(() => {
    if (email) fetchReminders();
  }, [email]);

  useEffect(() => {
    const selected = reminders.filter(r =>
      new Date(r.date).toDateString() === date.toDateString()
    );
    setSelectedReminders(selected);
  }, [date, reminders]);

  const handleAddReminder = async () => {
    const newReminder = {
      title,
      description,
      date: date.toISOString().split('T')[0], // "yyyy-MM-dd"
      email,
    };

    const res = await fetch('http://localhost:8080/api/projects/create-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReminder),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      fetchReminders();
    } else {
      alert('Failed to create reminder');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Reminders Calendar</h2>
      <Calendar onChange={setDate} value={date} />
      <div className="mt-4">
        <h3 className="font-bold text-blue-600">Reminders for {date.toDateString()}</h3>
        {selectedReminders.length > 0 ? (
          selectedReminders.map((reminder, i) => (
            <div key={i} className="bg-blue-100 p-2 rounded mt-2">
              <strong>{reminder.title}</strong>
              <p>{reminder.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reminders.</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add New Reminder</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddReminder}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Reminder
        </button>
      </div>
    </div>
  );
};

export default ReminderCalendar;
