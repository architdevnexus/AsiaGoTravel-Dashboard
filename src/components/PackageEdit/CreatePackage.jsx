import React, { useState } from "react";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    tripCategory: "DomesticTrips",
    subTripCategory: "honeymoonTrip", // ⭐ NEW FIELD ADDED
    title: "",
    location: "",
    days: "",
    nights: "",
    overview: "",
    features: "",
    inclusions: "",
    exclusions: "",
    summary: "",
    rating: "",
    itinerary: [{ day: "Day 1", title: "", description: "" }],
    icons: [],
    overviewImages: [],
  });

  // GENERAL INPUT HANDLER
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FILE HANDLERS
const handleOverviewImages = (e) => {
  const newFiles = [...e.target.files];
  setFormData({
    ...formData,
    overviewImages: [...formData.overviewImages, ...newFiles],
  });
};


const handleIcons = (e) => {
  const newIcons = [...e.target.files];
  setFormData({
    ...formData,
    icons: [...formData.icons, ...newIcons],
  });
};


  // ITINERARY HANDLERS
  const handleItineraryChange = (index, e) => {
    const copy = [...formData.itinerary];
    copy[index][e.target.name] = e.target.value;
    setFormData({ ...formData, itinerary: copy });
  };

  const addItinerary = () => {
    const nextDayNumber = formData.itinerary.length + 1;
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        { day: `Day ${nextDayNumber}`, title: "", description: "" },
      ],
    });
  };

  const removeItinerary = (index) => {
    const copy = [...formData.itinerary];
    copy.splice(index, 1);

    const updatedItinerary = copy.map((item, i) => ({
      ...item,
      day: `Day ${i + 1}`,
    }));

    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("tripCategory", formData.tripCategory);

      // ⭐ Corrected Packages JSON with SubCategory
      const packagesJSON = [
        {
          subTripCategory: { main: formData.subTripCategory },
          tripDuration: {
            days: Number(formData.days),
            nights: Number(formData.nights),
          },
          title: formData.title,
          location: formData.location,
          overviewCategory: [
            {
              overview: formData.overview,
              itinerary: formData.itinerary.map((item) => ({
                ...item,
                description: Array.isArray(item.description)
                  ? item.description
                  : item.description.split(",").map((d) => d.trim()),
              })),
              inclusions: formData.inclusions.split(",").map((i) => i.trim()),
              exclusions: formData.exclusions.split(",").map((i) => i.trim()),
              summary: formData.summary.split(",").map((s) => s.trim()),
            },
          ],
          priceDetails: [
            { type: "Double", originalPrice: 1200, discountedPrice: 999 },
          ],
          rating: Number(formData.rating),
          features: formData.features.split(",").map((f) => f.trim()),

          icons:
            formData.iconsList || [
              { name: "Running" },
              { name: "DN" },
              { name: "AAOI" },
              { name: "car" },
            ],

          isActive: true,
        },
      ];

      payload.append("Packages", JSON.stringify(packagesJSON));

      // Attach files
      formData.overviewImages.forEach((file) =>
        payload.append("overviewImages", file)
      );
      formData.icons.forEach((file) => payload.append("icons", file));

      const token = localStorage.getItem("refreshToken");

      const response = await fetch(
        "https://backend.ghardekhoapna.com/api/addPackage",
        {
          method: "POST",
          headers: {
            Cookie: `refreshToken=${token}`,
          },
          body: payload,
        }
      );

      const result = await response.json();
      console.log("API Response ->", result);

      if (response.ok) alert("Package added successfully!");
      else alert(`Failed to add package: ${result.message}`);
    } catch (err) {
      console.error(err);
      alert("Error submitting package");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pt-10">
      <h1 className="text-3xl font-bold mb-6">Add New Package</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TRIP CATEGORY */}
        <div>
          <label className="font-semibold">Trip Category</label>
          <select
            name="tripCategory"
            onChange={handleChange}
            className="border p-2 w-full"
            value={formData.tripCategory}
          >
            <option value="DomesticTrips">Domestic Trips</option>
            <option value="InternationalTrips">International Trips</option>
          </select>
        </div>

        {/* ⭐ SUB TRIP CATEGORY */}
        <div>
          <label className="font-semibold">Sub Trip Category</label>
          <select
            name="subTripCategory"
            value={formData.subTripCategory}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="honeymoonTrip">Honeymoon Trips</option>
            <option value="familyGroupTrip">Family Trips</option>
            <option value="friendsGroupTrip">Friends Group Trips</option>
            <option value="bachelorTours">Bachelor Tours</option>
            <option value="luxuryTours">Luxury Tours</option>
            <option value="premiumHolidayPackage">Premium Holiday Package</option>
            <option value="personalizedTours">Personalized Tours</option>

          </select>
        </div>

        {/* BASIC INFO */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* TRIP DURATION */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Days</label>
            <input
              name="days"
              placeholder="Days"
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="font-semibold">Nights</label>
            <input
              name="nights"
              placeholder="Nights"
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* OVERVIEW */}
        <div>
          <label className="font-semibold">Overview</label>
          <textarea
            name="overview"
            placeholder="Overview"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* FEATURES */}
        <div>
          <label className="font-semibold">Features (comma separated)</label>
          <textarea
            name="features"
            placeholder="Features"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* INCLUSIONS */}
        <div>
          <label className="font-semibold">Inclusions (comma separated)</label>
          <textarea
            name="inclusions"
            placeholder="Inclusions"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* EXCLUSIONS */}
        <div>
          <label className="font-semibold">Exclusions (comma separated)</label>
          <textarea
            name="exclusions"
            placeholder="Exclusions"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* SUMMARY */}
        <div>
          <label className="font-semibold">Summary (comma separated)</label>
          <textarea
            name="summary"
            placeholder="Summary"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* RATING */}
        <div>
          <label className="font-semibold">Rating</label>
          <input
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* FILE UPLOADS */}
        <div>
          <label className="font-semibold">Overview Images</label>
          <input type="file" multiple onChange={handleOverviewImages} />
        </div>

        <div>
          <label className="font-semibold">Icons</label>
          <input type="file" multiple onChange={handleIcons} />
        </div>

        {/* ITINERARY */}
        <h3 className="font-semibold mt-4">Itinerary</h3>
        {formData.itinerary.map((item, i) => (
          <div key={i} className="border p-3 rounded mb-3">
            <div>
              <label className="font-semibold">Day</label>
              <input
                name="day"
                value={item.day}
                onChange={(e) => handleItineraryChange(i, e)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Title</label>
              <input
                name="title"
                placeholder="Title"
                onChange={(e) => handleItineraryChange(i, e)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Description</label>
              <textarea
                name="description"
                placeholder="Description"
                onChange={(e) => handleItineraryChange(i, e)}
                className="border p-2 w-full"
              />
            </div>
            {formData.itinerary.length > 1 && (
              <button
                type="button"
                onClick={() => removeItinerary(i)}
                className="text-red-600 mt-2"
              >
                Remove Day
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addItinerary}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Day
        </button>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg"
        >
          Submit Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
