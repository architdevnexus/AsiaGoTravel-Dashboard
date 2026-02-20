export const getAllBlogs = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/AllBlog`, {
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
