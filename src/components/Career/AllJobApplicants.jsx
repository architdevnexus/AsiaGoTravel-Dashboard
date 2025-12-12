"use client";
import React, { useEffect, useState } from "react";

export const AllJobApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 Added modal state
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const itemsPerPage = 5;

  const fetchApplicants = async () => {
    try {
      const response = await fetch("https://backend.ghardekhoapna.com/api/jointeam/all", {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
        },
      });

      const data = await response.json();
      setApplicants(data?.records || []);
    } catch (error) {
      console.error("Error loading applicants:", error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const deleteApplicant = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(
        `https://backend.ghardekhoapna.com/api/jointeam/delete/${deleteId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setApplicants(applicants.filter((item) => item._id !== deleteId));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }

    setShowModal(false);
    setDeleteId(null);
  };

  const filteredApplicants = applicants.filter((item) => {
    const text = search.toLowerCase();
    return (
      item.Name?.toLowerCase().includes(text) ||
      item.Email?.toLowerCase().includes(text) ||
      item.Position?.toLowerCase().includes(text)
    );
  });

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

  const paginatedData = filteredApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () =>
    setCurrentPage((p) => (p < totalPages ? p + 1 : p));

  const prevPage = () =>
    setCurrentPage((p) => (p > 1 ? p - 1 : p));

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold mb-4 mt-10">All Job Applicants</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, position..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Position</th>
              <th className="px-4 py-2 border">CV</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 border text-gray-500">
                  No applicants found
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={item._id} className="text-center">
                  <td className="px-4 py-2 border">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  <td className="px-4 py-2 border capitalize">{item.Name}</td>
                  <td className="px-4 py-2 border">{item.Email}</td>
                  <td className="px-4 py-2 border">{item.Position}</td>

                  <td className="px-4 py-2 border">
                    {item.cv_SecureUrl ? (
                      <a
                        href={item.cv_SecureUrl}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        View CV
                      </a>
                    ) : (
                      <span className="text-gray-500">No CV</span>
                    )}
                  </td>

                  <td className="px-4 py-2 border">{item.Message}</td>

                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => {
                        setDeleteId(item._id);
                        setShowModal(true);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Previous
        </button>

        <p>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </p>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* 🔥 DELETE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">Are you sure?</h2>
            <p className="text-gray-600 mb-5">
              Do you really want to delete this applicant?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={deleteApplicant}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
