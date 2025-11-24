export const getPackageById = async (id) => {
  try {
    const res = await fetch(`https://www.backend.ghardekhoapna.com/api/allPackage/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();
    return data?.data || {};
  } catch (err) {
    console.log("❌ Error fetching package:", err);
    return {};
  }
};
