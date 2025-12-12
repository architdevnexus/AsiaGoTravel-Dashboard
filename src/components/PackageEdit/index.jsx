import React, { useEffect, useState } from "react";
import { BlogsCard } from "./PackageCard";
import { getAllPackages } from "../services/getAllPackage";
import { Link } from "react-router-dom";

export const PackageEdit = ({ slug }) => {
  const [packagesData, setPackagesData] = useState([]);
  const [activeTab, setActiveTab] = useState("DomesticTrips");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await getAllPackages();
    setPackagesData(res?.data || []);
  };

  const handleDelete = async (item) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) return console.error("Token missing!");

      const response = await fetch(
        `https://backend.ghardekhoapna.com/api/package/delete/${item._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Delete failed");

      // Remove deleted item from UI
      setPackagesData((prev) =>
        prev.map((cat) => ({
          ...cat,
          Packages: cat.Packages.filter((pkg) => pkg._id !== item._id),
        }))
      );

      alert("Package deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting package");
    }
  };

  // ---------------- FILTER PACKAGES BASED ON ACTIVE TAB ----------------
  const filteredPackages =
    packagesData.find((cat) => cat.tripCategory === activeTab)?.Packages || [];
  // ----------------------------------------------------------------------

  return (
    <div className="p-10 pt-10">

      {/* ---------- Add Package Button ---------- */}
      <div className="flex justify-end mb-6">
        <Link
          to="/dashboard/add-package"
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add Package
        </Link>
      </div>

      {/* ---------- TABS ---------- */}
      <div className="flex gap-5 mb-8 border-b pb-3">
        <button
          onClick={() => setActiveTab("DomesticTrips")}
          className={`px-5 py-2 rounded-md text-lg font-medium ${
            activeTab === "DomesticTrips"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Domestic
        </button>

        <button
          onClick={() => setActiveTab("InternationalTrips")}
          className={`px-5 py-2 rounded-md text-lg font-medium ${
            activeTab === "InternationalTrips"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          International
        </button>
      </div>

      {/* ---------- Packages Card View ---------- */}
      <BlogsCard
        grid="grid-cols-1 md:grid-cols-2 gap-9"
        packages={filteredPackages}
        slug={slug}
        onEdit={(item) => console.log("Edit", item)}
        onDelete={handleDelete}
      />
    </div>
  );
};
