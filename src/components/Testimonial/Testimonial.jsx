import React, { useState, useEffect } from "react";
import TestimonialForm from "./TestimonialForm";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(
        "https://backend.asiagotravels.com/api/allTestimonials"
      );

      if (!res.ok) {
        console.error("Failed to fetch testimonials");
        return;
      }

      const data = await res.json();
      setTestimonials(data?.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ---------------------------
  // ADD / EDIT
  // ---------------------------
  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  // ---------------------------
  // DELETE
  // ---------------------------
  const handleDelete = async (item) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      const res = await fetch(
        `https://backend.asiagotravels.com/api/testimonial/delete/${item._id}`,
        { method: "DELETE" }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed to delete testimonial");
        return;
      }

      setTestimonials((prev) =>
        prev.filter((t) => t._id !== item._id)
      );
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // ---------------------------
  // SAVE (ADD / UPDATE)
  // ---------------------------
  const handleSave = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      const url = editingItem
        ? `https://backend.asiagotravels.com/api/testimonial/update/${editingItem._id}`
        : "https://backend.asiagotravels.com/api/create-Testimonials";

      const method = editingItem ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Something went wrong");
        return;
      }

      // ✅ CLOSE MODAL
      setModalOpen(false);

      // ✅ RELOAD PAGE AFTER SUBMIT
      window.location.reload();

    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  return (
    <div className="p-8 pt-20">
      <div className="flex justify-between pb-6">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Testimonial
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.length > 0 ? (
          testimonials.map((item) => (
            <TestimonialCard
              key={item._id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No testimonials found.
          </p>
        )}
      </div>

      {modalOpen && (
        <TestimonialForm
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editingItem}
        />
      )}
    </div>
  );
}
