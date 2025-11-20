"use client";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

export const PackageProductPage = ({ images = [], title = "" }) => {
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableImages, setEditableImages] = useState(images);

  // Update image URL
  const updateImage = (index, value) => {
    const updated = [...editableImages];
    updated[index] = value;
    setEditableImages(updated);
  };

  // Add new image field
  const addImage = () => {
    setEditableImages([...editableImages, ""]);
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg">

      {/* Editable Title */}
      <input
        type="text"
        className="text-xl font-semibold mb-3 border p-2 rounded w-full"
        value={editableTitle}
        onChange={(e) => setEditableTitle(e.target.value)}
      />

      {/* Image URL Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {editableImages.map((img, i) => (
          <input
            key={i}
            className="border p-2 rounded w-full"
            placeholder={`Image URL ${i + 1}`}
            value={img}
            onChange={(e) => updateImage(i, e.target.value)}
          />
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

        {/* Arrow */}
        <div className="flex items-center justify-center w-10 h-[250px] bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100 transition shrink-0">
          <FaChevronRight className="text-gray-600 text-lg" />
        </div>
      </div>
    </div>
  );
};
