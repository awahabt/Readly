import React from "react";
import { X } from "lucide-react";

export default function NotificationToast({ title, description, status, onClose }) {
  // Function to get the background color based on status
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-white border-gray-300";
    }
  };

  // Function to get the text color based on status
  const getTextColor = () => {
    switch (status) {
      case "success":
        return "text-green-700";
      case "error":
        return "text-red-700";
      case "warning":
        return "text-yellow-700";
      case "info":
        return "text-blue-700";
      default:
        return "text-black";
    }
  };

  return (
    <div
      className={`w-full max-w-md p-4 border rounded-lg ${getStatusColor()} ${getTextColor()} flex items-center justify-between`}
    >
      <div>
        <h3 className={`font-semibold text-xl ${getTextColor()}`}>{title}</h3>
        <p className={`text-sm ${getTextColor()}`}>{description}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 p-2 bg-transparent border-0 text-black hover:text-gray-600"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}