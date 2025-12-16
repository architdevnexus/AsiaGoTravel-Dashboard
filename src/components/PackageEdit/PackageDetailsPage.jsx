import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePackageFetcher from "./PackageFetcher";
import { PackageProductPage } from "./PackageProductPage";
import OverviewSection from "./OverviewSection";
import { updatePackageById } from "../services/getAllPackage";

const PackageSlugPage = () => {
  const { id } = useParams();
  const { loading: fetchLoading, packageData, refetch } = usePackageFetcher(id);

  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  


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

  // ⭐ Images + Icons State
  const [images, setImages] = useState([]);
  const [icons, setIcons] = useState([]);

  // ⭐ LOAD DATA
  useEffect(() => {
    if (!packageData) return;

    let parsedDuration = { days: "", nights: "" };
    try {
      parsedDuration = JSON.parse(packageData.tripDuration);
    } catch { }

    const overviewObj = packageData?.overviewCategory?.[0] || {};

    setForm({
      title: packageData?.title || "",
      location: packageData.location || "",
      overview: overviewObj.overview || "",
      days: parsedDuration.days || "",
      nights: parsedDuration.nights || "",
      price: packageData?.priceDetails?.[0]?.discountedPrice || "",
      category: packageData?.subTripCategory?.main || "",
      highlights: overviewObj?.summary?.join(", ") || "",
      includes: overviewObj?.inclusions?.join(", ") || "",
      excludes: overviewObj?.exclusions?.join(", ") || "",
    });

    setFeatures(
      Array.isArray(packageData?.features)
        ? packageData.features
        : []
    );

    // ⭐ LOAD EXISTING IMAGES
    const existingImages =
      overviewObj?.images?.map((img) => ({
        type: "existing",
        url: img.url,
      })) || [];

    setImages(existingImages);

    // ⭐ LOAD EXISTING ICONS FROM ROOT LEVEL (CORRECT)
    const existingIcons =
      packageData?.icons?.map((ic) => ({
        type: "existing",
        url: ic.url,
        name: ic.name,
      })) || [];

    setIcons(existingIcons);
  }, [packageData]);

  // ⭐ Basic input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⭐ FEATURE HANDLERS (ADDED)
  const addFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures((prev) => [...prev, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };


  // ⭐ ADD NEW IMAGES
  const handleOverviewImages = (e) => {
    const uploaded = [...e.target.files].map((file) => ({
      type: "new",
      file,
    }));
    setImages((prev) => [...prev, ...uploaded]);
  };

  // ⭐ DELETE IMAGE
  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ⭐ DELETE ICON
  const deleteIcon = (index) => {
    setIcons((prev) => prev.filter((_, i) => i !== index));
  };

  // ⭐ SUBMIT UPDATE
  const handleUpdate = async () => {
    setLoading(true);

    try {
      const fd = new FormData();

      // Basic fields
      fd.append("title", form.title);
      fd.append("location", form.location);
      fd.append("rating", "4.9");
      fd.append("subTripCategoryMain", form.category);
      fd.append("days", form.days);
      fd.append("nights", form.nights);
      fd.append("features", JSON.stringify(features));

      // fd.append(
      //   "features",
      //   JSON.stringify(form.highlights.split(",").map((i) => i.trim()))
      // );

      fd.append(
        "priceDetails",
        JSON.stringify([
          {
            type: "Double",
            originalPrice: Number(form.price),
            discountedPrice: Number(form.price),
            currency: "$",
            note: "Per Person",
          },
        ])
      );

      // ⭐ MERGE IMAGES
      const finalImagesArray = [
        ...images
          .filter((img) => img.type === "existing")
          .map((img) => ({ url: img.url })),
        ...images
          .filter((img) => img.type === "new")
          .map((img) => ({
            url: "",
            fileName: img.file.name,
          })),
      ];

      // ⭐ MERGE ICONS (ROOT LEVEL)
      const finalIconsArray = [
        ...icons
          .filter((ic) => ic.type === "existing")
          .map((ic) => ({
            url: ic.url,
            name: ic.name,
          })),
        ...icons
          .filter((ic) => ic.type === "new")
          .map((ic) => ({
            url: "",
            name: ic.file.name,
          })),
      ];

      // ⭐ OVERVIEW CATEGORY (dynamic)
      fd.append(
        "overviewCategory",
        JSON.stringify([
          {
            overview: form.overview,
            itinerary: form.itinerary || [],   // 🔥 dynamic itinerary
            inclusions: form.includes
              ? form.includes.split(",").map((i) => i.trim())
              : [],
            exclusions: form.excludes
              ? form.excludes.split(",").map((i) => i.trim())
              : [],
            summary: form.highlights
              ? form.highlights.split(",").map((i) => i.trim())
              : [],
            images: finalImagesArray,
          },
        ])
      );


      setFeatures(Array.isArray(packageData?.features) ? packageData.features : []);

      // ⭐ SEND ICONS SEPARATELY (ROOT LEVEL)
      fd.append("iconsData", JSON.stringify(finalIconsArray));

      // ⭐ UPLOAD NEW IMAGES
      images
        .filter((img) => img.type === "new")
        .forEach((img) => fd.append("overviewImages", img.file));

      // ⭐ UPLOAD NEW ICONS
      icons
        .filter((ic) => ic.type === "new")
        .forEach((ic) => fd.append("icons", ic.file));

      await updatePackageById(id, fd);

      alert("Package Updated Successfully!");
      refetch();

    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }

    setLoading(false);
  };

  if (fetchLoading || !packageData)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-5 pt-20">

      <PackageProductPage
        images={packageData?.overviewCategory?.[0]?.images?.map((img) => img.url) || []}
        title={packageData.title}
      />

      <OverviewSection overviewData={packageData} />

      {/* ⭐ OVERVIEW IMAGES SECTION */}
      <div className="mb-6  mt-10">
        <label className="block text-gray-700 font-medium mb-2">Overview Images</label>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer hover:border-[#1B4965] transition">
          <input
            type="file"
            multiple
            id="overviewImages"
            onChange={handleOverviewImages}
            className="hidden"
          />

          <label
            htmlFor="overviewImages"
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-gray-500">Click to upload or drag & drop</span>
            <span className="text-sm text-gray-400">(Select multiple images)</span>
          </label>
        </div>

        {/* Preview */}
        {images.length > 0 && (
          <div className="flex gap-3 mt-4 flex-wrap">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={
                    img.type === "existing"
                      ? img.url
                      : URL.createObjectURL(img.file)
                  }
                  className="w-24 h-24 object-cover rounded-md shadow"
                />
                <button
                  onClick={() => deleteImage(i)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={() => document.getElementById("overviewImages").click()}
          className="mt-3 bg-[#1B4965] text-white px-4 py-2 rounded shadow hover:bg-[#1B4965]"
        >
          ➕ Add Images
        </button>
      </div>

      {/* ⭐ ICONS SECTION */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Icons</label>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer hover:border-green-500 transition">
          <input
            type="file"
            multiple
            id="packageIcons"
            onChange={(e) =>
              setIcons((prev) => [
                ...prev,
                ...[...e.target.files].map((file) => ({
                  type: "new",
                  file,
                })),
              ])
            }
            className="hidden"
          />

          <label
            htmlFor="packageIcons"
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-gray-500">Click to upload or drag & drop</span>
            <span className="text-sm text-gray-400">(Upload icons)</span>
          </label>
        </div>

        {/* Icon Preview */}
        {icons.length > 0 && (
          <div className="flex gap-3 mt-4 flex-wrap">
            {icons.map((icon, i) => (
              <div key={i} className="relative">
                <img
                  src={
                    icon.type === "existing"
                      ? icon.url
                      : URL.createObjectURL(icon.file)
                  }
                  className="w-16 h-16 object-contain rounded-md shadow bg-white p-2"
                />

                <button
                  onClick={() => deleteIcon(i)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => document.getElementById("packageIcons").click()}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          ➕ Add Icons
        </button>
      </div>


      {/* ⭐ FEATURES INPUT (ADDED – NOTHING REMOVED) */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Features
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFeature()}
            placeholder="Type feature and press Enter"
            className="flex-1 border rounded px-3 py-2"
          />

          <button
            type="button"
            onClick={addFeature}
            className="bg-[#1B4965] text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {features.map((item, index) => (
              <span
                key={index}
                className="bg-blue-100 text-[#1B4965] px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {item}
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>




      {/* Update Button */}
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="mt-5 bg-[#1B4965] text-white px-6 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Package"}
      </button>
    </div>
  );
};

export default PackageSlugPage;
