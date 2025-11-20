"use client";
import React, { useState } from "react";
import { FaWhatsapp, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OverviewSection = ({ overviewData }) => {
  const [activeTab, setActiveTab] = useState("Summary");
  const [isOpen, setIsOpen] = useState(false);

  // Convert incoming overviewData into editable local state
  const [form, setForm] = useState({
    title: overviewData?.title || "",
    description: overviewData?.description || "",
    itinerary: overviewData?.itinerary || [],
    inclusions: overviewData?.inclusions || [],
    exclusions: overviewData?.exclusions || [],
    summary: overviewData?.summary || [],
    priceDetails: overviewData?.priceDetails || {},
  });

  const tabs = ["Itinerary", "Inclusions", "Exclusions", "Summary"];

  // Helper for updating fields
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // Add new items in list-based fields
  const addFieldItem = (key) => {
    setForm({ ...form, [key]: [...form[key], ""] });
  };

  // Edit list items
  const updateFieldItem = (key, index, value) => {
    const updated = [...form[key]];
    updated[index] = value;
    setForm({ ...form, [key]: updated });
  };

  // Add Day in itinerary
  const addItineraryDay = () => {
    setForm({
      ...form,
      itinerary: [...form.itinerary, { title: "", details: [""] }],
    });
  };

  // Update itinerary day title
  const updateItineraryTitle = (index, value) => {
    const updated = [...form.itinerary];
    updated[index].title = value;
    setForm({ ...form, itinerary: updated });
  };

  // Update itinerary detail point
  const updateItineraryDetail = (dayIndex, detailIndex, value) => {
    const updated = [...form.itinerary];
    updated[dayIndex].details[detailIndex] = value;
    setForm({ ...form, itinerary: updated });
  };

  // Add new detail line
  const addItineraryDetail = (i) => {
    const updated = [...form.itinerary];
    updated[i].details.push("");
    setForm({ ...form, itinerary: updated });
  };

  return (
    <section className="w-full bg-white py-10 px-5 md:px-16">
      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="md:col-span-2">

          {/* Editable Title */}
          <input
            type="text"
            className="text-2xl font-bold text-[#1B4965] mb-2 w-full border p-2 rounded"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          {/* Editable Description */}
          <textarea
            className="text-gray-700 leading-relaxed mb-5 border p-3 rounded w-full"
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          {/* TABS */}
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

          {/* ITINERARY TAB */}
          {activeTab === "Itinerary" && (
            <div>
              {form.itinerary.map((day, index) => (
                <div key={index} className="mb-6 p-4 border rounded shadow-sm">
                  <h4 className="font-bold">Day {index + 1}</h4>

                  {/* Title */}
                  <input
                    className="w-full border p-2 rounded mt-2"
                    placeholder="Day title"
                    value={day.title}
                    onChange={(e) => updateItineraryTitle(index, e.target.value)}
                  />

                  {/* Details */}
                  {day.details.map((detail, i) => (
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

                  {/* Add details */}
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
              {form.inclusions.map((item, i) => (
                <input
                  key={i}
                  className="w-full border p-2 rounded mb-2"
                  value={item}
                  onChange={(e) => updateFieldItem("inclusions", i, e.target.value)}
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
              {form.exclusions.map((item, i) => (
                <input
                  key={i}
                  className="w-full border p-2 rounded mb-2"
                  value={item}
                  onChange={(e) => updateFieldItem("exclusions", i, e.target.value)}
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
              {form.summary.map((item, i) => (
                <input
                  key={i}
                  className="w-full border p-2 rounded mb-2"
                  value={item}
                  onChange={(e) => updateFieldItem("summary", i, e.target.value)}
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

        {/* RIGHT SIDEBAR (unchanged UI but editable values) */}
        <div className="bg-white shadow-md rounded-lg p-5 h-fit border border-gray-100">
          <div className="mb-5">
            <h3 className="text-gray-800 font-semibold">Starting From</h3>

            <input
              type="number"
              className="text-3xl font-bold text-gray-900 mt-2 w-full border p-2 rounded"
              value={form.priceDetails.amount}
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
          </div>

          <button className="flex items-center justify-center gap-2 w-full border border-[#3FA9F5] text-green-600 py-2 rounded-md hover:bg-green-50 transition">
            <FaWhatsapp /> Whatsapp
          </button>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
