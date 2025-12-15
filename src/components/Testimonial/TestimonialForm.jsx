import React, { useState, useEffect } from "react";

export default function TestimonialForm({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    packageName: "",
    message: "",
    image: null,
    rating: "",
  });

  const [previewName, setPreviewName] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        packageName: initialData.packageName || "",
        message: initialData.message || "",
        image: null,
        rating: initialData.rating || "",
      });

      setPreviewName(initialData.image || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewName(file.name);
    }
  };

  const submitForm = () => {
    if (!formData.name || !formData.message) {
      alert("Name and message are required!");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center pt-10 items-center bg-black/40 backdrop-blur-md">
      <div className="bg-white w-[90%] md:w-[500px] rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Testimonial" : "Add Testimonial"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="text"
            name="packageName"
            placeholder="Package / Company"
            value={formData.packageName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Testimonial Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg h-24"
          />

          <div>
            <label className="block font-medium mb-1">Customer Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border px-3 py-2 rounded-lg"
            />
            {previewName && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {previewName}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Rating (1 to 5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={submitForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
