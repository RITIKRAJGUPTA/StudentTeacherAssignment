import express from "express";
import { createAssignment, getAssignments, deleteAssignment } from "../controllers/assignmentController.js";
import { protect, teacherOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, teacherOnly, createAssignment);
router.get("/", protect, getAssignments);
router.delete("/:id", protect, teacherOnly, deleteAssignment);

export default router;
