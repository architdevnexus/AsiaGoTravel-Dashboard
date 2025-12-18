"use client";
import React, { useState } from "react";

export const PackageProductPage = ({ images = [], title = "" , setTitle , location = "" , setLocation ,   days = "",
  nights = "", setDays,
  setNights, }) => {
 
  const [editableImages, setEditableImages] = useState(images);
  const [imageFiles, setImageFiles] = useState([]);

  // ✅ ADD MISSING STATE
  const [formData, setFormData] = useState({
    tripCategory: "DomesticTrips",
  });

  // ✅ ADD MISSING HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Handle file upload
  const handleFileUpload = (index, file) => {
    if (!file) return;

    const previewURL = URL.createObjectURL(file);

    const updatedPreview = [...editableImages];
    updatedPreview[index] = previewURL;

    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;

    setEditableImages(updatedPreview);
    setImageFiles(updatedFiles);
  };

  // Add new upload field
  const addImage = () => {
    setEditableImages([...editableImages, ""]);
    setImageFiles([...imageFiles, null]);
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg">
      {/* Trip Category */}
      {/* <div>
        <label className="font-semibold">Trip Category</label>
        <select
          name="tripCategory"
          onChange={handleChange}
          className="border p-2 w-full"
          value={formData.tripCategory}
        >
          <option value="DomesticTrips">Domestic Trips</option>
          <option value="InternationalTrips">International Trips</option>
        </select>
      </div> */}

      {/* Package Title */}
      <label className="block font-semibold text-gray-700 mb-1 mt-4">
        Package Title
      </label>

       <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-semibold mb-2 border p-2 rounded w-full"
        placeholder="Enter Package Title"
      />


          <label className="block font-semibold text-gray-700 mb-1 mt-4">
       Location
      </label>

       <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="text-xl font-semibold mb-6 border p-2 rounded w-full"
        placeholder="Enter Location"
      />


            {/* DAYS & NIGHTS */}
      <div className="flex gap-4 mb-4">

            <label className="block font-semibold text-gray-700 mb-1 mt-4">
       Days
      </label>
        <input
          type="number"
          min="0"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="text-xl font-semibold mb-6 border p-2 rounded w-full"
          placeholder="Days"
        />

            <label className="block font-semibold text-gray-700 mb-1 mt-4">
       Night
      </label>

        <input
          type="number"
          min="0"
          value={nights}
          onChange={(e) => setNights(e.target.value)}
          className="text-xl font-semibold mb-6 border p-2 rounded w-full"
          placeholder="Nights"
        />
      </div>

      {/* Image Upload */}
      <label className="block font-semibold text-gray-700 mb-2">
        Upload Images
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {editableImages.map((img, i) => (
          <div key={i} className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded w-full"
              onChange={(e) => handleFileUpload(i, e.target.files[0])}
            />
          </div>
        ))}

        <button
          className="px-4 py-2 bg-[#1B4965] text-white rounded w-fit"
          onClick={addImage}
          type="button"
        >
          + Add Image
        </button>
      </div>

      {/* Preview Section */}
      <div className="flex gap-3 overflow-x-auto">
        {editableImages[0] && (
          <div className="relative w-[400px] h-[325px] rounded-lg overflow-hidden shrink-0">
            <img src={editableImages[0]} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-col gap-2 shrink-0">
          {[1, 2].map(
            (i) =>
              editableImages[i] && (
                <div
                  key={i}
                  className="relative w-[300px] h-40 rounded-lg overflow-hidden"
                >
                  <img
                    src={editableImages[i]}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
          )}
        </div>

        {editableImages[3] && (
          <div className="relative w-[400px] h-[325px] rounded-lg overflow-hidden shrink-0">
            <img
              src={editableImages[3]}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};
