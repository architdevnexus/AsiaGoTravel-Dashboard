import React, { useEffect, useState } from "react";
import { BlogsCard } from "./PackageCard";
import { getAllPackages } from "../services/getAllPackage";
import { Link } from "react-router-dom";   // <-- Add Link

export const PackageEdit = ({ slug }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await getAllPackages();
    setPackages(res?.data || []);
  };

  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirmDelete) return;

    try {
 const token = typeof window !== "undefined" && localStorage.getItem("token");

if (!token) {
  console.error("No token found in localStorage");
  return;
}

const response = await fetch(
  `https://www.backend.ghardekhoapna.com/api/package/delete/${item._id}`,
  {
    method: "DELETE", 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setPackages((prev) => prev.filter((pkg) => pkg._id !== item._id));
      alert("Package deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting package");
    }
  };

  return (
    <div className="p-10 pt-30">

      {/* ---------------------- ADD PACKAGE BUTTON ---------------------- */}
      <div className="flex justify-end mb-6">
        <Link
          to="/dashboard/add-package" 
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Package
        </Link>
      </div>
      {/* ---------------------------------------------------------------- */}

      <BlogsCard
        grid="grid-cols-1 md:grid-cols-2 gap-9"
        packages={packages}
        slug={slug}
        onEdit={(item) => console.log("Edit blog", item)}
        onDelete={handleDelete}
      />
    </div>
  );
};
