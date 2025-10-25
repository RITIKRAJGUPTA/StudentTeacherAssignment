import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // load .env
const app = express();

// ✅ Read frontend URL from .env
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ✅ CORS configuration
app.use(
  cors({
    origin: FRONTEND_URL, // allow only this URL
    credentials: true,    // allow cookies if needed
  })
);

app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignmentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
