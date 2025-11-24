import React, { useState } from "react";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    days: "",
    nights: "",
    overview: "",
    categoryMain: "",
    categorySub: "",
    price: "",
    currency: "",
    pickupDrop: "",
    features: "",
    inclusions: "",
    exclusions: "",
    priceDetails: "",
    tags: "",
    summary: "",
    durationInNights: "",
    rating: "",
    famousDestinations: "",
    minBudget: "",
    maxBudget: "",
    filterTags: "",
    searchSource: "",
    searchDestination: "",
    searchDepartureDate: "",
    searchRooms: "",
    searchAdults: "",
    searchChildren: "",
    overviewCategoryNames: "",
    itinerary: [{ day: "", title: "", description: "" }],
    images: [],
    icons: [],
    overviewCategoryIcons: [],
  });

  // GENERAL INPUT HANDLER
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // MULTIPLE FILE HANDLERS
  const handleImages = (e) =>
    setFormData({ ...formData, images: [...e.target.files] });

  const handleIcons = (e) =>
    setFormData({ ...formData, icons: [...e.target.files] });

  const handleOverviewCategoryIcons = (e) =>
    setFormData({ ...formData, overviewCategoryIcons: [...e.target.files] });

  // ITINERARY HANDLERS
  const handleItineraryChange = (index, e) => {
    const copy = [...formData.itinerary];
    copy[index][e.target.name] = e.target.value;
    setFormData({ ...formData, itinerary: copy });
  };

  const addItinerary = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        { day: "", title: "", description: "" },
      ],
    });
  };

  const removeItinerary = (index) => {
    const copy = [...formData.itinerary];
    copy.splice(index, 1);
    setFormData({ ...formData, itinerary: copy });
  };

  // -------------------------
  // API SUBMIT FUNCTION
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    // SIMPLE FIELDS
    payload.append("title", formData.title);
    payload.append("location", formData.location);
    payload.append("overview", formData.overview);
    payload.append("price", formData.price);
    payload.append("currency", formData.currency);
    payload.append("pickupDrop", formData.pickupDrop);
    payload.append("durationInNights", formData.durationInNights);
    payload.append("rating", formData.rating);

    // JSON FIELDS
    payload.append("tripDuration", JSON.stringify({ 
      days: formData.days, 
      nights: formData.nights 
    }));

    payload.append(
      "tripCategory",
      JSON.stringify({
        main: formData.categoryMain,
        sub: formData.categorySub,
      })
    );

    payload.append("features", JSON.stringify(formData.features.split(",")));
    payload.append("inclusions", JSON.stringify(formData.inclusions.split(",")));
    payload.append("exclusions", JSON.stringify(formData.exclusions.split(",")));

    payload.append("priceDetails", formData.priceDetails);
    payload.append("tags", JSON.stringify(formData.tags.split(",")));
    payload.append("summary", JSON.stringify(formData.summary.split(",")));
    payload.append(
      "famousDestinations",
      JSON.stringify(formData.famousDestinations.split(","))
    );

    payload.append(
      "budget",
      JSON.stringify({
        min: formData.minBudget,
        max: formData.maxBudget,
      })
    );

    payload.append("filterTags", JSON.stringify(formData.filterTags.split(",")));

    payload.append(
      "searchDetails",
      JSON.stringify({
        source: formData.searchSource,
        destination: formData.searchDestination,
        departureDate: formData.searchDepartureDate,
        rooms: formData.searchRooms,
        adults: formData.searchAdults,
        children: formData.searchChildren,
      })
    );

    payload.append(
      "overviewCategoryIcons",
      JSON.stringify(
        formData.overviewCategoryNames.split(",").map((name) => ({ name }))
      )
    );

    payload.append("itinerary", JSON.stringify(formData.itinerary));

    // MULTIPLE FILES
    formData.images.forEach((img) => payload.append("images", img));
    formData.icons.forEach((icon) => payload.append("icons", icon));
    formData.overviewCategoryIcons.forEach((file) =>
      payload.append("overviewCategoryIcons", file)
    );

    try {
      const response = await fetch(
        "http://194.238.18.1:3005/api/addPackage",
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        alert("Package added successfully!");
      } else {
        alert("Failed to add package");
      }
    } catch (error) {
      console.error(error);
      alert("Error while submitting package");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Package</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC FIELDS */}
        <input name="title" placeholder="Title" className="border p-2 w-full" onChange={handleChange} />
        <input name="location" placeholder="Location" className="border p-2 w-full" onChange={handleChange} />

        {/* TRIP DURATION */}
        <div className="grid grid-cols-2 gap-4">
          <input name="days" placeholder="Days" className="border p-2 w-full" onChange={handleChange} />
          <input name="nights" placeholder="Nights" className="border p-2 w-full" onChange={handleChange} />
        </div>

        <textarea name="overview" placeholder="Overview" className="border p-2 w-full" rows="3" onChange={handleChange} />

        {/* TRIP CATEGORY */}
        <div className="grid grid-cols-2 gap-4">
          <input name="categoryMain" placeholder="Category Main" className="border p-2 w-full" onChange={handleChange} />
          <input name="categorySub" placeholder="Category Sub" className="border p-2 w-full" onChange={handleChange} />
        </div>

        {/* PRICE */}
        <input name="price" placeholder="Price" className="border p-2 w-full" onChange={handleChange} />
        <input name="currency" placeholder="Currency" className="border p-2 w-full" onChange={handleChange} />

        <input name="pickupDrop" placeholder="Pickup Drop" className="border p-2 w-full" onChange={handleChange} />

        {/* ARRAYS */}
        <textarea name="features" placeholder="Features (comma separated)" className="border p-2 w-full" onChange={handleChange}></textarea>
        <textarea name="inclusions" placeholder="Inclusions (comma separated)" className="border p-2 w-full" onChange={handleChange}></textarea>
        <textarea name="exclusions" placeholder="Exclusions (comma separated)" className="border p-2 w-full" onChange={handleChange}></textarea>

        {/* PRICE DETAILS JSON */}
        <textarea name="priceDetails" placeholder="Price Details JSON" className="border p-2 w-full" rows="3" onChange={handleChange}></textarea>

        {/* TAGS */}
        <input name="tags" placeholder="Tags (comma separated)" className="border p-2 w-full" onChange={handleChange} />

        {/* SUMMARY */}
        <textarea name="summary" placeholder="Summary (comma separated)" className="border p-2 w-full" onChange={handleChange}></textarea>

        {/* SEARCH FIELDS */}
        <input name="searchSource" placeholder="Search Source" className="border p-2 w-full" onChange={handleChange} />
        <input name="searchDestination" placeholder="Search Destination" className="border p-2 w-full" onChange={handleChange} />
        <input type="date" name="searchDepartureDate" className="border p-2 w-full" onChange={handleChange} />
        <input name="searchRooms" placeholder="Rooms" className="border p-2 w-full" onChange={handleChange} />
        <input name="searchAdults" placeholder="Adults" className="border p-2 w-full" onChange={handleChange} />
        <input name="searchChildren" placeholder="Children" className="border p-2 w-full" onChange={handleChange} />

        {/* OVERVIEW CATEGORY ICON NAMES */}
        <input name="overviewCategoryNames" placeholder="Overview Category Names (,)" className="border p-2 w-full" onChange={handleChange} />

        {/* FILE UPLOADS */}
        <div>
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImages} />
        </div>

        <div>
          <label>Upload Icons</label>
          <input type="file" multiple onChange={handleIcons} />
        </div>

        <div>
          <label>Upload Overview Category Icons</label>
          <input type="file" multiple onChange={handleOverviewCategoryIcons} />
        </div>

        {/* ITINERARY */}
        <h3 className="text-lg font-semibold">Itinerary</h3>

        {formData.itinerary.map((item, index) => (
          <div key={index} className="border p-4 mb-4 rounded bg-gray-50">
            <input name="day" placeholder="Day" className="border p-2 w-full mb-2" onChange={(e) => handleItineraryChange(index, e)} />
            <input name="title" placeholder="Title" className="border p-2 w-full mb-2" onChange={(e) => handleItineraryChange(index, e)} />
            <textarea name="description" placeholder="Description" className="border p-2 w-full" onChange={(e) => handleItineraryChange(index, e)}></textarea>

            {formData.itinerary.length > 1 && (
              <button type="button" className="text-red-500 mt-2" onClick={() => removeItinerary(index)}>
                Remove Day
              </button>
            )}
          </div>
        ))}

        <button type="button" className="px-4 py-2 bg-green-500 text-white rounded" onClick={addItinerary}>
          + Add Day
        </button>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 text-lg font-semibold">
          Submit Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
