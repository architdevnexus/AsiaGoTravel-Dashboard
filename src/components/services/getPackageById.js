export const getPackageById = async (id) => {
  try {
    const res = await fetch(`http://194.238.18.1:3005/api/allPackage/${id}`, {
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
