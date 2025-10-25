import React from "react";

const AssignmentCard = ({ assignment, role, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800">{assignment.title}</h2>
      <p className="text-gray-600 mt-2">{assignment.description}</p>
      
      <div className="mt-3 text-sm text-gray-500">
        <p><span className="font-medium">Subject:</span> {assignment.subject}</p>
        <p><span className="font-medium">Deadline:</span> {new Date(assignment.deadline).toLocaleDateString()}</p>
      </div>

      {role === "teacher" && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onDelete(assignment._id)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
