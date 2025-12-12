"use client";
import React, { useState } from "react";

export const CreateCareerJobForm = ({ onCreateJob, onClose }) => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload

    if (!formData.type || !formData.title || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://backend.asiagotravels.com/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            employmentTypes: formData.type.toLowerCase(), // string
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + (data?.message || "Something went wrong"));
        return;
      }

      alert("Job Created Successfully!");

      onCreateJob && onCreateJob(data);

      setFormData({ type: "", title: "", description: "" });

      // ✅ CLOSE MODAL AFTER SUCCESS
      onClose && onClose();

    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to create job");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg border border-blue-400 space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-700">Create New Job</h2>

      {/* Type */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-600">Job Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote / Full Time">Remote / Full Time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-600">Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Senior React Developer"
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-600">Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Write short job description..."
          className="border rounded-lg px-3 py-2"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-full text-sm transition"
      >
        {loading ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
};
