// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://studentteacherassignmentbackend.onrender.com/api", // change if needed
});

// ✅ Automatically add token for protected routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
