export const getPackageById = async (id) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/allPackage/${id}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const data = await res.json();
    return data?.data || {};
  } catch (err) {
    console.log("❌ Error fetching package:", err);
    return {};
  }
};
