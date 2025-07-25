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
      const response = await fetch(
        `http://localhost:8080/api/notifications/unread?email=${encodeURIComponent(userEmail)}`
      );
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
      const response = await fetch(
        `http://localhost:8080/api/notifications/${id}?status=READ`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update notification status");
      }
      fetchNotifications(email);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#EBF2FA" }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#064789] mb-6 border-b pb-2 border-[#427AA1]">
          Unread Notifications
        </h1>

        {email ? (
          loading ? (
            <p className="text-[#427AA1]">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-[#427AA1]">No unread notifications.</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start border-l-4 border-[#427AA1]"
                >
                  <div>
                    <p className="text-lg font-semibold text-[#064789]">
                      {notification.task}
                    </p>
                    <p className="text-sm text-[#427AA1]">
                      Project: {notification.projectName}
                    </p>
                    <p className="text-sm text-[#427AA1]">
                      Status: {notification.status}
                    </p>
                  </div>
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="bg-[#064789] hover:bg-[#05315e] text-white px-4 py-2 rounded"
                  >
                    Mark as Read
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-red-600">No email found in local storage.</p>
        )}
      </div>
    </div>
  );
}
