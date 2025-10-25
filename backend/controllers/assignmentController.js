import Assignment from "../models/Assignment.js";

export const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAssignments = async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
};

export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
