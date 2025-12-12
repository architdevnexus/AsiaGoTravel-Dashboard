const addNewBlog = async () => {
  try {
    const formData = new FormData();

    formData.append("title", "Manali Adventure Trip");
    formData.append("location", "Manali");
    formData.append("tripDuration", JSON.stringify({ days: 4, nights: 3 }));
    formData.append(
      "overview",
      "Experience the serene beauty of Kerala, fondly known as “God’s Own Country.” This 6-day journey takes you through Kerala’s most iconic destinations..."
    );
    formData.append(
      "tripCategory",
      JSON.stringify({ main: "Weekend Trips", sub: "November 2025" })
    );
    formData.append("price", "172500");
    formData.append("currency", "$");
    formData.append("pickupDrop", "Mumbai Airport");

    formData.append(
      "features",
      JSON.stringify([
        "Guided tour as per Itinerary",
        "4-star accommodations and daily breakfast",
        "Indian and local cuisine options",
      ])
    );

    formData.append(
      "inclusions",
      JSON.stringify([
        "Accommodation in 3★ / 4★ hotels (as per choice).",
        "Daily breakfast at the hotel.",
        "Private AC vehicle for transfers and sightseeing.",
        "Houseboat stay with all meals in Alleppey.",
        "Sightseeing tours as per itinerary.",
        "Driver allowance, toll taxes, and parking charges.",
      ])
    );

    formData.append(
      "exclusions",
      JSON.stringify([
        "Airfare / Train tickets",
        "Personal expenses",
        "Entry fees at monuments",
        "Optional activities",
        "Travel insurance and GST",
      ])
    );

    formData.append(
      "priceDetails",
      JSON.stringify([
        {
          type: "Double",
          originalPrice: 50000,
          discountedPrice: 45000,
          currency: "₹",
          note: "Per Person (Double Occupancy)",
        },
        {
          type: "Triple",
          originalPrice: 47000,
          discountedPrice: 42000,
          currency: "₹",
          note: "Per Person (Triple Occupancy)",
        },
      ])
    );

    formData.append("tags", JSON.stringify(["beach", "goa"]));

    // IMAGES (local file uploads with <input type="file"> later)
    const imagePaths = [
      "/C:/Users/user/Downloads/5c088d7b58b57e9a1055114fcaabc04d7028dfc8.jpg",
      "/C:/Users/user/Downloads/cc51559b8768688fff26187046b148316d4fdaa3.jpg",
      "/C:/Users/user/Downloads/7e602ff891c58a7e5a2087bff2c7de5dd81e8a9d.jpg",
      "/C:/Users/user/Downloads/607449469915107a6138e4eabed22f9c42182ebe.png",
    ];

    imagePaths.forEach((img) => formData.append("images", img));

    // ICONS
    const iconPaths = [
      "/C:/Users/user/Downloads/Group 5.svg",
      "/C:/Users/user/Downloads/Group 48096019.svg",
      "/C:/Users/user/Downloads/Group 48096018.svg",
      "/C:/Users/user/Downloads/Group 48096020.svg",
    ];
    iconPaths.forEach((icon) => formData.append("icons", icon));

    formData.append(
      "itinerary",
      JSON.stringify([
        {
          day: "Day 1",
          title: "Arrival and Check-in",
          description: "Reach Manali and check into your hotel.",
        },
        {
          day: "Day 2",
          title: "Local Sightseeing",
          description: "Visit Hadimba Temple and Mall Road.",
        },
      ])
    );

    formData.append(
      "summary",
      JSON.stringify([
        "Explore Kerala’s top destinations.",
        "Enjoy hill stations, wildlife, and backwaters.",
        "Cruise through Alleppey backwaters.",
      ])
    );

    formData.append(
      "searchDetails",
      JSON.stringify({
        source: "Delhi",
        destination: "Manali",
        departureDate: "2025-12-01",
        rooms: 2,
        adults: 4,
        children: 1,
      })
    );

    formData.append(
      "overviewCategoryIcons",
      JSON.stringify([{ name: "Culture" }, { name: "Nature" }])
    );

    formData.append("durationInNights", "4");
    formData.append("rating", "4.8");
    formData.append("famousDestinations", JSON.stringify(["Munnar", "Alleppey", "Kochi"]));
    formData.append("budget", JSON.stringify({ min: 10000, max: 20000 }));
    formData.append("filterTags", JSON.stringify(["Honeymoon", "family Package"]));

    // FETCH API CALL
    const res = await fetch("https://backend.asiagotravels.com/api/addPackage", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      alert("Package added successfully!");
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};
