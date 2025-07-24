"use client";

import { useEffect, useState } from "react";

interface Notification {
  id: string;
  projectName: string;
  task: string;
  email: string;
  status: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load email from localStorage and fetch notifications
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchNotifications(storedEmail);
    }
  }, []);

  const fetchNotifications = async (userEmail: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/notifications/unread?email=${encodeURIComponent(userEmail)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/notifications/${id}?status=READ`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to update notification status");
      }

      // Refresh the list
      fetchNotifications(email);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Unread Notifications</h1>

      {email ? (
        loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">No unread notifications.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white shadow-md rounded p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{notification.task}</p>
                  <p className="text-sm text-gray-600">
                    Project: {notification.projectName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {notification.status}
                  </p>
                </div>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Mark as Read
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="text-red-500">No email found in local storage.</p>
      )}
    </div>
  );
}
