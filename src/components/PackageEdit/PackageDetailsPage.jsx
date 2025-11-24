import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPackageById } from "../services/getPackageById";
import { PackageProductPage } from "./PackageProductPage";
import OverviewSection from "./OverviewSection";
import { updatePackageById } from "../services/getAllPackage";

const PackageSlugPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [packageData, setPackageData] = useState(null);

  // All editable fields
  const [form, setForm] = useState({
    title: "",
    location: "",
    overview: "",
    days: "",
    nights: "",
    price: "",
    features: "",
    category: "",
    highlights: "",
    includes: "",
    excludes: "",
  });

  // File states
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchPackageById();
  }, [id]);

  const fetchPackageById = async () => {
    try {
      const data = await getPackageById(id);
      setPackageData(data);

      // Fill form with existing data
      setForm({
        title: data?.title || "",
        location: data?.location || "",
        overview: data?.overview || "",
        days: data?.tripDuration?.days || "",
        nights: data?.tripDuration?.nights || "",
        price: data?.price || "",
        category: data?.category || "",
        highlights: data?.highlights || "",
        includes: data?.includes || "",
        excludes: data?.excludes || "",
      });

    } catch (error) {
      console.error("Error fetching package:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("location", form.location);
      fd.append("overview", form.overview);

      fd.append("tripDuration", JSON.stringify({
        days: form.days,
        nights: form.nights,
      }));

      fd.append("price", form.price);
      fd.append("category", form.category);
      fd.append("highlights", form.highlights);
      fd.append("includes", form.includes);
      fd.append("excludes", form.excludes);

      // Multiple Images
      if (images.length > 0) {
        images.forEach((img) => fd.append("images", img));  
      }

      // Single thumbnail
      if (thumbnail) {
        fd.append("thumbnail", thumbnail);
      }

      await updatePackageById(id, fd);
      alert("Package Updated Successfully!");
      fetchPackageById();
    } catch (error) {
      alert("Update Failed");
      console.error(error);
    }

    setLoading(false);
  };

  if (!packageData) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-5 pt-20">

      <PackageProductPage images={packageData?.images} title={packageData?.title} />

      <div className="mt-10 p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Update Package</h2>

        {/* All Inputs */}
        <div className="grid grid-cols-2 gap-4">
          
          <input name="title" value={form.title} onChange={handleChange} className="border p-2 rounded" placeholder="Title" />
          <input name="location" value={form.location} onChange={handleChange} className="border p-2 rounded" placeholder="Location" />

          <input name="days" value={form.days} onChange={handleChange} className="border p-2 rounded" placeholder="Days" />
          <input name="nights" value={form.nights} onChange={handleChange} className="border p-2 rounded" placeholder="Nights" />

          <input name="price" value={form.price} onChange={handleChange} className="border p-2 rounded" placeholder="Price" />
          <input name="category" value={form.category} onChange={handleChange} className="border p-2 rounded" placeholder="Category" />
          <input name="features" value={form.features} onChange={handleChange} className="border p-2 rounded" placeholder="Features" />
{/* 
          <textarea name="highlights" value={form.highlights} onChange={handleChange} className="border p-2 rounded h-24" placeholder="Highlights"></textarea>
          <textarea name="includes" value={form.includes} onChange={handleChange} className="border p-2 rounded h-24" placeholder="Includes"></textarea>

          <textarea name="excludes" value={form.excludes} onChange={handleChange} className="border p-2 rounded h-24" placeholder="Excludes"></textarea> */}

          <textarea name="overview" value={form.overview} onChange={handleChange} className="border p-2 rounded h-32 col-span-2" placeholder="Overview"></textarea>

          {/* Files */}
          <div className="col-span-2">
            <label className="font-semibold">Upload Images (Multiple)</label>
            <input type="file" multiple onChange={(e) => setImages([...e.target.files])} className="w-full border p-2 rounded" />
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Thumbnail</label>
            <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} className="w-full border p-2 rounded" />
          </div>

        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Package"}
        </button>
      </div>

      <OverviewSection overviewData={packageData} />
    </div>
  );
};

export default PackageSlugPage;
