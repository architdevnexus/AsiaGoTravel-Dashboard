import React, { useState, useEffect } from "react";

export default function TestimonialForm({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    packageName: "",
    message: "",
    image: "",
    rating: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        packageName: initialData.packageName || "",
        message: initialData.message || "",
        image: initialData.image || "",
        rating: initialData.rating || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = () => {
    if (!formData.name || !formData.message) {
      alert("Name and message are required!");
      return;
    }

    onSave(formData); // rating is now included
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
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
            placeholder="packageName / Company"
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

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          {/* ⭐ Rating Input */}
          <div>
            <label className="block font-medium mb-1">Rating (1 to 5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              required
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
