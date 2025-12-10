"use client";
import React, { useState } from "react";
import { CreateCareerJobForm } from "./CreateCareer";
import { CareerJobCard } from "./AllCareer";

export const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewJob = (newJob) => {
    setJobs([...jobs, newJob]);
    setIsModalOpen(false); // close modal after submit
  };

  return (
    <div className="relative w-full p-10">

      {/* -------- CREATE JOB BUTTON -------- */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Create Job
      </button>

      {/* -------- JOB CARD -------- */}
      <div className="mt-10">
        <CareerJobCard
          job={{
            type: "Remote / Full Time",
            title: "Senior React Developer",
            description: "Build complex UI systems using React and Next.js.",
          }}
          onSave={(updatedJob) => console.log("Updated Job:", updatedJob)}
          onDelete={(deletedJob) => console.log("Deleted →", deletedJob)}
        />
      </div>

      {/* -------- YOUR ADDED JOBS LIST -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {jobs.map((job, index) => (
          <CareerJobCard key={index} job={job} />
        ))}
      </div>

      {/* -------- MODAL -------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-xl p-6 relative shadow-lg">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold mb-4">Create New Job</h2>

            {/* FORM COMPONENT */}
            <CreateCareerJobForm onCreateJob={addNewJob} />
          </div>
        </div>
      )}

    </div>
  );
};
