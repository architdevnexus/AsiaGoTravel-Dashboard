"use client";
import React, { useState } from "react";
import { FaLongArrowAltRight, FaTrash } from "react-icons/fa";

export const CareerJobCard = ({ job, onDelete }) => {
  const [editableJob, setEditableJob] = useState(job);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setEditableJob((prev) => ({ ...prev, [field]: value }));
  };

  // ============================ UPDATE API ============================
  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://backend.asiagotravels.com/api/jobs/update/${editableJob._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editableJob.title,
            description: editableJob.description,
            employmentTypes: editableJob.type, // ✅ send as string
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update job");

      alert("Job updated successfully!");
      setShowEditModal(false);
      window.location.reload(); // reload job list
    } catch (error) {
      console.error("Update Error:", error);
      alert("Error updating job");
    }

    setLoading(false);
  };

  // ============================ DELETE CONFIRM ============================
  const confirmDelete = () => {
    onDelete?.(job);
    setShowDeleteModal(false);
  };

  return (
    <>
      {/* CARD */}
      <div className="w-[300px] bg-white rounded-2xl px-6 mt-20 ml-10 py-10 border shadow-md border-blue-400 space-y-3">

        {/* type badge */}
        <div className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mb-3">
          {editableJob.employmentTypes}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">{editableJob.title}</h2>

        <p className="text-sm text-gray-500 mb-5">{editableJob.description}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Edit <FaLongArrowAltRight size={14} />
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
          >
            <FaTrash size={14} /> Delete
          </button>
        </div>
      </div>

      {/* ============================ EDIT MODAL ============================ */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white w-[350px] rounded-xl shadow-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Edit Job</h2>

            <select
              value={editableJob.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full border p-2 rounded text-sm"
            >
              <option value="">Select Type</option>
              <option value="full time">Full Time</option>
              <option value="part time">Part Time</option>
              <option value="remote full time">Remote / Full Time</option>
              <option value="internship">Internship</option>
            </select>

            <input
              type="text"
              value={editableJob.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border p-2 rounded text-sm"
              placeholder="Job Title"
            />

            <textarea
              value={editableJob.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border p-2 rounded text-sm"
              rows={3}
              placeholder="Description"
            />

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-full border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================ DELETE MODAL ============================ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white w-[320px] rounded-xl shadow-xl p-6 space-y-5">

            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure you want to delete this job?
            </h2>

            <p className="text-sm text-gray-500">This action cannot be undone.</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-full border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
