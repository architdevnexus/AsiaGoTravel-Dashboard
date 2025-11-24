"use client";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const OverviewSection = ({ overviewData }) => {
  const [activeTab, setActiveTab] = useState("Summary");
  const [isOpen, setIsOpen] = useState(false);

  // FIXED: always ensure arrays are arrays
  const [form, setForm] = useState({
    title: overviewData?.title || "",
    description: overviewData?.description || "",
    itinerary: Array.isArray(overviewData?.itinerary)
      ? overviewData.itinerary
      : [],
    inclusions: Array.isArray(overviewData?.inclusions)
      ? overviewData.inclusions
      : [],
    exclusions: Array.isArray(overviewData?.exclusions)
      ? overviewData.exclusions
      : [],
    summary: Array.isArray(overviewData?.summary) ? overviewData.summary : [],
    priceDetails: overviewData?.priceDetails || { amount: "" },
  });

  const tabs = ["Itinerary", "Inclusions", "Exclusions", "Summary"];

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const fd = new FormData();

      // BASIC FIELDS
      fd.append("title", form.title);
      fd.append("description", form.description);

      // PRICE
      fd.append("priceDetails", JSON.stringify(form.priceDetails));

      // ARRAY FIELDS
      fd.append("inclusions", JSON.stringify(form.inclusions));
      fd.append("exclusions", JSON.stringify(form.exclusions));
      fd.append("summary", JSON.stringify(form.summary));

      // ITINERARY
      fd.append("itinerary", JSON.stringify(form.itinerary));

      // API CALL
      const res = await fetch(
        `https://www.backend.ghardekhoapna.com/api/update/${overviewData?._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        }
      );

      if (!res.ok) {
        alert("Failed to update!");
        return;
      }

      alert("Package updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Error updating package");
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const addFieldItem = (key) => {
    setForm({ ...form, [key]: [...(form[key] || []), ""] });
  };

  const updateFieldItem = (key, index, value) => {
    const updated = [...(form[key] || [])];
    updated[index] = value;
    setForm({ ...form, [key]: updated });
  };

  // Add new itinerary day
  const addItineraryDay = () => {
    setForm({
      ...form,
      itinerary: [...(form.itinerary || []), { title: "", details: [""] }],
    });
  };

  const updateItineraryTitle = (index, value) => {
    const updated = [...(form.itinerary || [])];
    updated[index].title = value;
    setForm({ ...form, itinerary: updated });
  };

  const updateItineraryDetail = (dayIndex, detailIndex, value) => {
    const updated = [...(form.itinerary || [])];
    updated[dayIndex].details[detailIndex] = value;
    setForm({ ...form, itinerary: updated });
  };

  const addItineraryDetail = (i) => {
    const updated = [...(form.itinerary || [])];
    updated[i].details.push("");
    setForm({ ...form, itinerary: updated });
  };

  return (
    <section className="w-full bg-white py-10 px-5 md:px-16">
      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="md:col-span-2">
          <input
            type="text"
            className="text-2xl font-bold text-[#1B4965] mb-2 w-full border p-2 rounded"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <textarea
            className="text-gray-700 leading-relaxed mb-5 border p-3 rounded w-full"
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <div className="flex border-b mb-4 text-sm font-medium text-gray-600">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-[#1B4965] text-white bg-[#1B4965] font-semibold rounded-lg mb-2"
                    : "border-transparent hover:text-[#1B4965]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ITINERARY */}
          {activeTab === "Itinerary" && (
            <div>
              {(form.itinerary || []).map((day, index) => (
                <div key={index} className="mb-6 p-4 border rounded shadow-sm">
                  <h4 className="font-bold">Day {index + 1}</h4>

                  <input
                    className="w-full border p-2 rounded mt-2"
                    placeholder="Day title"
                    value={day.title}
                    onChange={(e) =>
                      updateItineraryTitle(index, e.target.value)
                    }
                  />

                  {(day.details || []).map((detail, i) => (
                    <input
                      key={i}
                      className="w-full border p-2 rounded mt-2"
                      placeholder="Detail"
                      value={detail}
                      onChange={(e) =>
                        updateItineraryDetail(index, i, e.target.value)
                      }
                    />
                  ))}

                  <button
                    onClick={() => addItineraryDetail(index)}
                    className="mt-3 text-blue-600 underline"
                  >
                    + Add more details
                  </button>

                  <div className="border-t border-gray-200 my-6"></div>
                </div>
              ))}

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={addItineraryDay}
              >
                + Add Day
              </button>
            </div>
          )}

          {/* INCLUSIONS */}
          {activeTab === "Inclusions" && (
            <div>
              {(form.inclusions || []).map((item, i) => (
                <input
                  key={i}
                  className="w-full border p-2 rounded mb-2"
                  value={item}
                  onChange={(e) =>
                    updateFieldItem("inclusions", i, e.target.value)
                  }
                />
              ))}

              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => addFieldItem("inclusions")}
              >
                + Add Inclusion
              </button>
            </div>
          )}

          {/* EXCLUSIONS */}
          {activeTab === "Exclusions" && (
            <div>
              {(form.exclusions || []).map((item, i) => (
                <input
                  key={i}
                  className="w-full border p-2 rounded mb-2"
                  value={item}
                  onChange={(e) =>
                    updateFieldItem("exclusions", i, e.target.value)
                  }
                />
              ))}

              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => addFieldItem("exclusions")}
              >
                + Add Exclusion
              </button>
            </div>
          )}

          {/* SUMMARY */}
          {activeTab === "Summary" && (
            <div>
              {(form.summary || []).map((item, i) => (
                <input
                  key={i}
                  className="w-full border p-2 rounded mb-2"
                  value={item}
                  onChange={(e) =>
                    updateFieldItem("summary", i, e.target.value)
                  }
                />
              ))}

              <button
                className="px-4 py-2 bg-gray-700 text-white rounded"
                onClick={() => addFieldItem("summary")}
              >
                + Add Summary Point
              </button>
            </div>
          )}
        </div>
        {/* RIGHT SIDEBAR */}
        <div
          className="bg-white shadow-md rounded-lg p-5 border border-gray-100 
            flex flex-col h-full min-h-[550px]"
        >
          {/* TOP CONTENT */}
          <div className="flex-1">
            <h3 className="text-gray-800 font-semibold">Starting From</h3>

            <input
              type="number"
              className="text-3xl font-bold text-gray-900 mt-2 w-full border p-2 rounded"
              value={form.priceDetails?.amount || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  priceDetails: {
                    ...form.priceDetails,
                    amount: e.target.value,
                  },
                })
              }
            />

            <button className="flex items-center justify-center gap-2 w-full border border-[#3FA9F5] text-green-600 py-2 rounded-md hover:bg-green-50 transition mt-6">
              <FaWhatsapp /> Whatsapp
            </button>
          </div>

          {/* BOTTOM FIXED BUTTON */}
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-blue-600 text-white rounded mt-6"
          >
            Update Package
          </button>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
