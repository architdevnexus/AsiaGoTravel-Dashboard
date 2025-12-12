import React, { useState, useEffect } from "react";
import TestimonialForm from "./TestimonialForm";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("https://backend.asiagotravels.com/api/allTestimonials");

      if (!res.ok) {
        console.error("Failed to fetch testimonials");
        return;
      }

      const data = await res.json();
      console.log("Fetched:", data);

      setTestimonials(data?.data || []); // depends on API structure
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ---------------------------
  // ADD / EDIT HANDLERS
  // ---------------------------
  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

const handleDelete = async (item) => {
  if (!window.confirm("Delete this testimonial?")) return;

  try {
    const res = await fetch(
      `https://backend.asiagotravels.com/api/testimonial/delete/${item._id}`,
      {
        method: "DELETE",
      }
    );

    const result = await res.json();
    console.log("Delete Result:", result);

    if (!res.ok) {
      alert(result.message || "Failed to delete testimonial");
      return;
    }

    // Remove from UI
    setTestimonials((prev) => prev.filter((t) => t._id !== item._id));

  } catch (error) {
    console.error("Delete Error:", error);
  }
};


const handleSave = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    let url = "";
    let method = "";

    if (editingItem) {
      // -------------------------
      // UPDATE TESTIMONIAL (PATCH)
      // -------------------------
      url = `https://backend.asiagotravels.com/api/testimonial/update/${editingItem._id}`;
      method = "PATCH";
    } else {
      // -------------------------
      // CREATE TESTIMONIAL (POST)
      // -------------------------
      url = "https://backend.asiagotravels.com/api/create-Testimonials";
      method = "POST";
    }

    const res = await fetch(url, {
      method,
      body: formData,
    });

    const result = await res.json();
    console.log("Save Result:", result);

    if (!res.ok) {
      alert(result.message || "Something went wrong");
      return;
    }

    // -------------------------
    // UPDATE UI IMMEDIATELY
    // -------------------------
    if (editingItem) {
      // Update existing testimonial
      setTestimonials((prev) =>
        prev.map((t) =>
          t._id === editingItem._id ? { ...t, ...result.data } : t
        )
      );
    } else {
      // Add newly created testimonial
      setTestimonials((prev) => [result.data, ...prev]);
    }

    setModalOpen(false);
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

      {/* Cards Grid */}
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

      {/* Modal */}
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
