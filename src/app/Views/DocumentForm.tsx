'use client';
import { useState } from 'react';

const DocumentForm = () => {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('document', file);

    try {
      const res = await fetch('http://localhost:8080/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('Document uploaded successfully!');
        setEmail('');
        setFile(null);
      } else {
        setMessage('Failed to upload document');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error uploading document');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md w-full space-y-4">
      <h2 className="text-xl font-semibold">Upload Document</h2>

      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded w-full"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload
      </button>

      {message && <p className="text-green-600">{message}</p>}
    </form>
  );
};

export default DocumentForm;
