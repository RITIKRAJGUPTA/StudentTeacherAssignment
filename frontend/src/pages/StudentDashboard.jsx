import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await API.get("/assignments");
        setAssignments(res.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-600">Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {assignments.length === 0 ? (
        <p className="text-gray-500">No assignments available.</p>
      ) : (
        assignments.map((a) => (
          <div
            key={a._id}
            className="p-3 bg-white rounded shadow mb-3 border border-gray-200"
          >
            <h3 className="font-semibold text-lg text-gray-800">{a.title}</h3>
            <p className="text-gray-600 mt-1">{a.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              <strong>Subject:</strong> {a.subject}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Deadline:</strong>{" "}
              {new Date(a.deadline).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
