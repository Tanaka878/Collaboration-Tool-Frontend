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
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const res = await fetch("/api/message");
    const data = await res.json();
    setMessages(data);
  }

  async function handleSend() {
    if (!text.trim()) return;
    const newMsg = {
      text,
      sender: email || "Anonymous",
      timestamp: new Date().toISOString(),
    };
    await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMsg),
    });
    setText("");
    fetchMessages();
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Cicosy Devs
        </h1>

        <div className="h-96 overflow-y-auto space-y-4 mb-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
          {messages.map((msg) => {
            const isOwnMessage = msg.sender === email;
            return (
              <div
                key={msg._id}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[75%] ${
                    isOwnMessage
                      ? "bg-green-200 text-right rounded-br-none"
                      : "bg-gray-300 text-left rounded-bl-none"
                  }`}
                >
                  <p className="font-semibold text-xs text-gray-700 mb-1">
                    {isOwnMessage ? "You" : msg.sender}
                  </p>
                  <p className="text-sm text-gray-800">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
