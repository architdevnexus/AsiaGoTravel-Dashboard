"use client";
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const OverviewSection = ({ overviewData, itinerary = [], setItinerary, inclusions = [],
  setInclusions,
  price,
  setPrice,
  exclusions = [],
  setExclusions,
  summary = [],
  setSummary, }) => {
  const [activeTab, setActiveTab] = useState("Summary");

  // Get correct overview object
  const overviewObj = overviewData?.overviewCategory?.[0];


  // Initialize form correctly
  const [form, setForm] = useState({
    // title: overviewData?.title,
    // description: overviewObj?.overview || "",

    inclusions: overviewObj?.inclusions || [],
    exclusions: overviewObj?.exclusions || [],
    summary: overviewObj?.summary || [],

  });

  const tabs = ["Itinerary", "Inclusions", "Exclusions", "Summary"];

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const addFieldItem = (type) => {
    if (type === "inclusions") setInclusions([...inclusions, ""]);
    if (type === "exclusions") setExclusions([...exclusions, ""]);
    if (type === "summary") setSummary([...summary, ""]);
  };

  const updateFieldItem = (type, index, value) => {
    if (type === "inclusions") {
      const updated = [...inclusions];
      updated[index] = value;
      setInclusions(updated);
    }
    if (type === "exclusions") {
      const updated = [...exclusions];
      updated[index] = value;
      setExclusions(updated);
    }
    if (type === "summary") {
      const updated = [...summary];
      updated[index] = value;
      setSummary(updated);
    }
  };


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

  const updateItineraryTitle = (index, value) => {
    const updated = [...itinerary];
    updated[index].title = value;
    setItinerary(updated);
  };

  const updateItineraryDetail = (dayIndex, detailIndex, value) => {
    const updated = [...itinerary];
    updated[dayIndex].description[detailIndex] = value;
    setItinerary(updated);
  };

  const addItineraryDetail = (index) => {
    const updated = [...itinerary];
    updated[index].description.push("");
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
                className={`px-4 py-2 border-b-2 transition-all ${activeTab === tab
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
              {itinerary?.map((day, index) => (
                <div key={index} className="mb-6 p-4 border rounded">
                  <h4 className="font-bold">{day.day}</h4>

                  <input
                    value={day.title}
                    onChange={(e) =>
                      updateItineraryTitle(index, e.target.value)
                    }
                    placeholder="Day title"
                  />

                  {day.description.map((desc, i) => (
                    <input
                      key={i}
                      value={desc}
                      onChange={(e) =>
                        updateItineraryDetail(index, i, e.target.value)
                      }
                      placeholder="Description"
                    />
                  ))}
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
        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-100 flex flex-col h-full min-h-[550px]">
          <div className="flex-1">
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
      </div>
    </section>
  );
};

export default OverviewSection;
