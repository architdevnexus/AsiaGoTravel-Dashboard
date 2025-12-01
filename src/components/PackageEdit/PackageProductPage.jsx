"use client";
import React, { useState } from "react";


export const PackageProductPage = ({ images = [], title = "" }) => {
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableImages, setEditableImages] = useState(images); // stores preview URLs
  const [imageFiles, setImageFiles] = useState([]); // actual file objects

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
      {/* Label + Editable Title */}
      <label className="block font-semibold text-gray-700 mb-1">
        Package Title
      </label>
      <input
        type="text"
        className="text-xl font-semibold mb-4 border p-2 rounded w-full"
        value={editableTitle}
        onChange={(e) => setEditableTitle(e.target.value)}
      />

      {/* Image Upload Inputs */}
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
          className="px-4 py-2 bg-blue-600 text-white rounded w-fit"
          onClick={addImage}
        >
          + Add Image
        </button>
      </div>

      {/* Preview Section */}
      <div className="flex gap-3 overflow-x-auto">
        {/* Left Large Image */}
        {editableImages[0] && (
          <div className="relative w-[400px] h-[325px] rounded-lg overflow-hidden shrink-0">
            <img
              src={editableImages[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Middle stacked images */}
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
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )
          )}
        </div>

        {/* Right Large Image */}
        {editableImages[3] && (
          <div className="relative w-[400px] h-[325px] rounded-lg overflow-hidden shrink-0">
            <img
              src={editableImages[3]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};
