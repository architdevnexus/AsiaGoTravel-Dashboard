export const deleteBlogById = async (id) => {
  try {
    const token = localStorage.getItem("token"); // ✅ matching login key
    console.log("Delete Token:", token);

    if (!token) {
      return { success: false, message: "No token found. Please login again." };
    }

    const res = await fetch(
      `http://194.238.18.1:3005/api/blog/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return data;

  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
};



export const updateBlog = async (id, formData) => {
  try {
 const token = localStorage.getItem("token");

    const res = await fetch(`http://194.238.18.1:3005/api/blog/edit/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Update Blog Error:", error);
    return null;
  }
};


