"use client";
import React, { useState } from "react";

export const CreateCareerJobForm = ({ onCreateJob }) => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.type || !formData.title || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    onCreateJob(formData); // Send data to parent component
    setFormData({ type: "", title: "", description: "" });
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
          <option value="Remote / Full Time">Remote / Full Time</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full text-sm transition"
      >
        Create Job
      </button>
    </form>
  );
};
