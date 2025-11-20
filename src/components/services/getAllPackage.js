// services/getAllPackages.js
export const getAllPackages = async () => {
  try {
    const res = await fetch("http://194.238.18.1:3005/api/allPackage", {
      method: "GET",
    });

    if (!res.ok) throw new Error("Failed to fetch packages");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching packages:", error);
    return [];
  }
};
