import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  deadline: String,
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
