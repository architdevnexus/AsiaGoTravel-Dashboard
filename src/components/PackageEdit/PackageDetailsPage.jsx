import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePackageFetcher from "./PackageFetcher";
import { PackageProductPage } from "./PackageProductPage";
import OverviewSection from "./OverviewSection";
import { updatePackageById } from "../services/getAllPackage";

const PackageSlugPage = () => {
  const { id } = useParams();

  const { loading: fetchLoading, packageData, refetch } = usePackageFetcher(id);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    overview: "",
    days: "",
    nights: "",
    price: "",
    category: "",
    highlights: "",
    includes: "",
    excludes: "",
  });

  const [images, setImages] = useState([]);
  const [icons, setIcons] = useState([]); 
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (!packageData) return;

    // Parse tripDuration (string → JSON)
    let parsedDuration = { days: "", nights: "" };
    try {
      parsedDuration = JSON.parse(packageData.tripDuration);
    } catch (e) {
      console.log("Trip Duration parsing error");
    }

    const overviewObj = packageData?.overviewCategory?.[0] || {};

    setForm({
      title: packageData.title || "",
      location: packageData.location || "",
      overview: overviewObj.overview || "",
      days: parsedDuration.days || "",
      nights: parsedDuration.nights || "",
      price: packageData?.priceDetails?.[0]?.originalPrice || "",
      category: packageData?.subTripCategory?.main || "",
      highlights: overviewObj?.summary?.join(", ") || "",
      includes: overviewObj?.inclusions?.join(", ") || "",
      excludes: overviewObj?.exclusions?.join(", ") || "",
    });
  }, [packageData]);

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

      // Basic fields
      fd.append("title", form.title);
      fd.append("location", form.location);
      fd.append("rating", form.rating || "4.9");
      fd.append("subTripCategoryMain", form.category);
      fd.append("days", form.days);
      fd.append("nights", form.nights);

      // JSON FIELDS
      fd.append(
        "features",
        JSON.stringify(form.highlights.split(",").map((i) => i.trim()))
      );

      fd.append(
        "priceDetails",
        JSON.stringify([
          {
            type: "Double",
            originalPrice: Number(form.price),
            discountedPrice: Number(form.price) - 5000,
            currency: "$",
            note: "Per Person",
          },
        ])
      );

      fd.append(
        "overviewCategory",
        JSON.stringify([
          {
            overview: form.overview,
            itinerary: [
              {
                day: "Day 1",
                title: "Arrival & Local Sightseeing",
                description: ["Arrival", "Check-in", "Local market"],
              },
            ],
            inclusions: form.includes.split(",").map((i) => i.trim()),
            exclusions: form.excludes.split(",").map((i) => i.trim()),
            summary: form.highlights.split(",").map((i) => i.trim()),
          },
        ])
      );

      // Multiple images
      if (images.length > 0) {
        images.forEach((img) => fd.append("overviewImages", img));
      }

      // ICON IMAGES
      if (icons?.length > 0) {
        icons.forEach((ic) => fd.append("icons", ic));
      }

      // SEND PATCH REQUEST
      await updatePackageById(id, fd);

      alert("Package Updated Successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }

    setLoading(false);
  };

  if (fetchLoading || !packageData)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-5 pt-20">
      {/* FIXED → overviewCategory[0].images */}
      <PackageProductPage
     images={packageData?.overviewCategory?.[0]?.images?.map(img => img.url) || []}
        title={packageData?.title}
      />

      <OverviewSection overviewData={packageData} />
   {/* OVERVIEW IMAGES UPLOAD */}
<div className="mb-6">
  <label className="block text-gray-700 font-medium mb-2">
    Upload Overview Images
  </label>

  <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 transition">
    <input
      type="file"
      multiple
      id="overviewImages"
      onChange={(e) => setImages([...e.target.files])}
      className="hidden"
    />

    <label
      htmlFor="overviewImages"
      className="flex flex-col items-center justify-center gap-2 cursor-pointer"
    >
      <span className="text-gray-500">Click to upload or drag & drop</span>
      <span className="text-sm text-gray-400">(You can select multiple images)</span>
    </label>
  </div>

  {/* Preview */}
  {images.length > 0 && (
    <div className="flex gap-3 mt-4 flex-wrap">
      {Array.from(images).map((img, i) => (
        <img
          key={i}
          src={URL.createObjectURL(img)}
          alt="preview"
          className="w-24 h-24 object-cover rounded-md shadow"
        />
      ))}
    </div>
  )}
</div>

{/* ICONS UPLOAD */}
<div className="mb-6">
  <label className="block text-gray-700 font-medium mb-2">
    Upload Icons
  </label>

  <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer hover:border-green-500 transition">
    <input
      type="file"
      multiple
      id="packageIcons"
      onChange={(e) => setIcons([...e.target.files])}
      className="hidden"
    />

    <label
      htmlFor="packageIcons"
      className="flex flex-col items-center justify-center gap-2 cursor-pointer"
    >
      <span className="text-gray-500">Click to upload or drag & drop</span>
      <span className="text-sm text-gray-400">(Upload up to 3 icons)</span>
    </label>
  </div>

  {/* Preview */}
  {icons?.length > 0 && (
    <div className="flex gap-3 mt-4 flex-wrap">
      {Array.from(icons).map((icon, i) => (
        <img
          key={i}
          src={URL.createObjectURL(icon)}
          alt="icon preview"
          className="w-16 h-16 object-contain rounded-md shadow bg-white p-2"
        />
      ))}
    </div>
  )}
</div>


      <div className="">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Package"}
        </button>
      </div>
    </div>
  );
};

export default PackageSlugPage;
