"use client";
import React, { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const OverviewSection = ({
  overviewData,
  itinerary = [],
  setItinerary,
  inclusions = [],
  setInclusions,
  price,
  setPrice,
  exclusions = [],
  setExclusions,
  summary = [],
  setSummary,
}) => {
  const [activeTab, setActiveTab] = useState("Summary");

  const tabs = ["Itinerary", "Inclusions", "Exclusions", "Summary"];

  const addFieldItem = (type) => {
    if (type === "inclusions") setInclusions([...inclusions, ""]);
    if (type === "exclusions") setExclusions([...exclusions, ""]);
    if (type === "summary") setSummary([...summary, ""]);
  };

  const updateFieldItem = (type, index, value) => {
    const updater = {
      inclusions: setInclusions,
      exclusions: setExclusions,
      summary: setSummary,
    }[type];

    const source = {
      inclusions,
      exclusions,
      summary,
    }[type];

    const updated = [...source];
    updated[index] = value;
    updater(updated);
  };

  /* ---------------- ITINERARY FUNCTIONS ---------------- */

  const addItineraryDay = () => {
    setItinerary([
      ...itinerary,
      {
        day: `Day ${itinerary.length + 1}`,
        title: "",
        description: [""],
      },
    ]);
  };

  const updateItineraryTitle = (dayIndex, value) => {
    const updated = itinerary.map((day, i) =>
      i === dayIndex ? { ...day, title: value } : day
    );
    setItinerary(updated);
  };

  const updateItineraryDetail = (dayIndex, descIndex, value) => {
    const updated = itinerary.map((day, i) => {
      if (i !== dayIndex) return day;
      const newDesc = [...day.description];
      newDesc[descIndex] = value;
      return { ...day, description: newDesc };
    });
    setItinerary(updated);
  };

  const addItineraryDetail = (dayIndex) => {
    const updated = itinerary.map((day, i) =>
      i === dayIndex
        ? { ...day, description: [...day.description, ""] }
        : day
    );
    setItinerary(updated);
  };

  /* 🔥 DELETE ONLY ONE DESCRIPTION */
  const removeItineraryDetail = (dayIndex, descIndex) => {
    const updated = itinerary.map((day, i) => {
      if (i !== dayIndex) return day;

      const filtered = day.description.filter(
        (_, idx) => idx !== descIndex
      );

      return {
        ...day,
        description: filtered.length ? filtered : [""],
      };
    });

    setItinerary(updated);
  };

  return (
    <section className="w-full bg-white py-10 px-5 md:px-16">
      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="md:col-span-2">
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
              {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-6 p-4 border rounded">
                  <h4 className="font-bold">{day.day}</h4>

                  <input
                    value={day.title}
                    onChange={(e) =>
                      updateItineraryTitle(dayIndex, e.target.value)
                    }
                    placeholder="Day title"
                    className="w-full border p-2 rounded mb-3"
                  />

                  {day.description.map((desc, descIndex) => (
                    <div
                      key={descIndex}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input
                        value={desc}
                        onChange={(e) =>
                          updateItineraryDetail(
                            dayIndex,
                            descIndex,
                            e.target.value
                          )
                        }
                        placeholder="Description"
                        className="flex-1 border p-2 rounded"
                      />

                      {/* ❌ DELETE DESCRIPTION */}
                      <button
                        onClick={() =>
                          removeItineraryDetail(dayIndex, descIndex)
                        }
                        className="text-red-500 hover:text-red-700"
                        title="Delete description"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addItineraryDetail(dayIndex)}
                    className="text-sm text-blue-600 mt-2"
                  >
                    + Add Description
                  </button>
                </div>
              ))}

              <button
                className="px-4 py-2 bg-[#1B4965] text-white rounded"
                onClick={addItineraryDay}
              >
                + Add Day
              </button>
            </div>
          )}

          {/* INCLUSIONS */}
          {activeTab === "Inclusions" && (
            <div>
              {inclusions.map((item, i) => (
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
              {exclusions.map((item, i) => (
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
              {summary.map((item, i) => (
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
        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-100 flex flex-col min-h-[550px]">
          <h3 className="text-gray-800 font-semibold">Starting From</h3>

          <input
            type="number"
            className="text-3xl font-bold text-gray-900 mt-2 w-full border p-2 rounded"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button className="flex items-center justify-center gap-2 w-full border border-[#1B4965] text-green-600 py-2 rounded-md hover:bg-green-50 transition mt-6">
            <FaWhatsapp /> Whatsapp
          </button>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
