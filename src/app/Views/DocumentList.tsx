'use client';

import { useEffect, useState } from 'react';
import { DocumentData } from '../interface/DocumentData';

const DocumentList = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/documents')
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching documents:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-10 max-w-2xl w-full">
      <h2 className="text-xl font-semibold mb-4">All Documents</h2>
      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id} className="p-4 border rounded bg-white shadow">
              <p className="text-sm text-gray-600">Email: {doc.userEmail}</p>
              <p className="mt-1">File: {doc.originalFileName}</p>
              <p className="text-xs text-gray-400 mt-2">
                Uploaded at: {new Date(doc.timestamp).toLocaleString()}
              </p>
              <a
                href={`http://localhost:8080/api/documents/download/${doc.id}`}
                className="text-blue-600 hover:underline mt-2 block"
                download
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
