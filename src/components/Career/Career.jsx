"use client";
import React, { useEffect, useState } from "react";
import { CreateCareerJobForm } from "./CreateCareer";
import { CareerJobCard } from "./AllCareer";

export const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // 🔥 FETCH JOBS FROM API
  // -------------------------------
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://backend.ghardekhoapna.com/api/jobs/all", {
        method: "GET",
      });

      const data = await res.json();
      console.log("Fetched Jobs:", data?.jobs);

      setJobs(data?.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // -------------------------------
  // 🟢 Add New Job After Create
  // -------------------------------
  const addNewJob = (newJob) => {
    setJobs([...jobs, newJob]);
    setIsModalOpen(false);
  };

  // -------------------------------
  // 🔥 DELETE JOB API
  // -------------------------------
  const deleteJob = async (job) => {
 
    if (!job?._id) return alert("Invalid Job ID");

    try {
      const res = await fetch(
        `https://backend.ghardekhoapna.com/api/jointeam/delete/${job._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      if (!res.ok) {
        return alert("Delete failed!");
      }

      alert("Job Deleted!");

      // remove deleted job from UI
      setJobs((prev) => prev.filter((item) => item._id !== job._id));

    } catch (error) {
      console.error("Delete Error:", error);
      alert("Error deleting job");
    }
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

      {/* -------- LOADING INDICATOR -------- */}
      {loading && <p className="mt-5 text-gray-600">Loading jobs...</p>}

      {/* -------- JOBS LIST -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <CareerJobCard
              key={index}
              job={job}
              onSave={(updated) => console.log("Updated", updated)}
              onDelete={deleteJob} // 🔥 REAL DELETE FUNCTION HERE
            />
          ))
        ) : (
          !loading && <p className="text-gray-500">No jobs available.</p>
        )}
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
