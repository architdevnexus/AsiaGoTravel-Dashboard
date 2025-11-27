// services/getAllPackages.js
export const getAllPackages = async () => {
  try {
    const res = await fetch("https://www.backend.ghardekhoapna.com/api/allPackage", {
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


export const updatePackageById = async (id, formData) => {
  const token = localStorage.getItem("token"); 

  const response = await fetch(`https://www.backend.ghardekhoapna.com/api/package/update/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, 
  });

  if (!response.ok) {
    throw new Error("Failed to update package");
  }

  return response.json();
};
