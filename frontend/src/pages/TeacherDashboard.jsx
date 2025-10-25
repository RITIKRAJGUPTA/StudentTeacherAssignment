import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function TeacherDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    deadline: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch all assignments
  const fetchAssignments = async () => {
    try {
      const res = await API.get("/assignments");
      setAssignments(res.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  // ✅ Add new assignment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/assignments", form);
      setForm({ title: "", description: "", subject: "", deadline: "" });
      fetchAssignments();
    } catch (error) {
      alert("Failed to add assignment");
      console.error(error);
    }
  };

  // ✅ Delete assignment
  const handleDelete = async (id) => {
    try {
      await API.delete(`/assignments/${id}`);
      fetchAssignments();
    } catch (error) {
      alert("Failed to delete assignment");
      console.error(error);
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Teacher Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Assignment Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-4 rounded shadow"
      >
        <input
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Subject"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition">
          Add Assignment
        </button>
      </form>

      {/* Display Assignments */}
      <ul>
        {assignments.map((a) => (
          <li
            key={a._id}
            className="p-3 bg-white rounded shadow mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-gray-500">{a.subject}</p>
            </div>
            <button
              onClick={() => handleDelete(a._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
