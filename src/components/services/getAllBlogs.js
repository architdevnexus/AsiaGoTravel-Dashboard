export const getAllBlogs = async () => {
  try {
    const res = await fetch("http://194.238.18.1:3005/api/AllBlog", {
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
