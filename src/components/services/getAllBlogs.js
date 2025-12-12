export const getAllBlogs = async () => {
  try {
    const res = await fetch("https://backend.asiagotravels.com/api/AllBlog", {
      method: "GET",
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    const data = await res.json();

    console.log("API Raw Response:", data);

    return data; // return full response
  } catch (error) {
    console.log("Error fetching blogs:", error);
    return [];
  }
};
