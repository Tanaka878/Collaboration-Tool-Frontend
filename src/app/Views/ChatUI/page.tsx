"use client";
import { useEffect, useState } from "react";

interface Message {
  _id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const res = await fetch("/api/message");
    const data = await res.json();
    setMessages(data);
  }

  async function handleSend() {
    if (!text.trim()) return;
    const newMsg = { text, sender: "user" };
    await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMsg),
    });
    setText("");
    fetchMessages();
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Chat</h1>
      <div className="border p-4 rounded h-96 overflow-y-scroll bg-gray-100 space-y-2">
        {messages.map((msg) => (
          <div key={msg._id} className={`p-2 rounded ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-300"}`}>
            <p>{msg.text}</p>
            <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded w-full p-2"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
