export const getBlogsById = async (id) => {
  try {
    const res = await fetch(`http://194.238.18.1:3005/api/AllBlog/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch blog by ID");

    const data = await res.json();
    console.log(data, "nfchsjidhf")
    return data || null;
  } catch (error) {
    console.log("Error fetching blog by ID:", error);
    return null;
  }
};
