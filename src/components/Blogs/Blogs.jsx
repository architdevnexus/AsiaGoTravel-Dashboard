import React, { useEffect, useState } from "react";
import { BlogsCard } from "./BlogsCard";
import { getAllBlogs } from "../services/getAllBlogs";
import { deleteBlogById } from "../services/deleteBlogById";

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await getAllBlogs();
    setBlogs(res?.blogs || []);
  };

  // DELETE BLOG API USING SERVICE FILE
  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const response = await deleteBlogById(id); // ✅ call service

    if (response?.success) {
      alert("Blog deleted!");
      fetchBlogs(); // refresh list
    } else {
      alert(response?.message || "Error deleting blog");
    }
  };

  return (
    <div className="p-10">
      <BlogsCard
        grid="grid-cols-1 md:grid-cols-2 gap-9"
        blogs={blogs}
        onDelete={deleteBlog}
      />
    </div>
  );
};
