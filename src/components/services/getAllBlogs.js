export const getAllBlogs = async () => {
  try {
    const res = await fetch("https://www.backend.ghardekhoapna.com/api/AllBlog", {
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
