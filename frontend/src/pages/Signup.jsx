import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed! Try again.");
      console.error(error);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          name="name"
          onChange={handleChange}
          value={form.name}
          placeholder="Full Name"
          className="w-full mb-2 p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Role:
          </label>
          <select
            name="role"
            onChange={handleChange}
            value={form.role}
            className="w-full border p-2 rounded"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
        >
          Signup
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={goToLogin}
            className="text-green-500 hover:underline"
          >
            Go to Login
          </button>
        </p>
      </form>
    </div>
  );
}
