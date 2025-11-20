import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogsById } from "../services/getBlogsById";

export const BlogsSlugPage = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchBlogById();
  }, [id]);

  const fetchBlogById = async () => {
    try {
      const data = await getBlogsById(id);

      console.log("Blog by ID:", data.blog); 
      setBlogData(data.blog);                
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!blogData)
    return <p className="text-center py-10 text-red-500">Blog not found.</p>;

  return (
    <div className="p-5 pt-20 max-w-3xl mx-auto">

      {/* Blog Image */}
        <img
          src={blogData.featureImage}
          alt={blogData.title}
          className="w-full rounded-lg mb-6"
        />
  

     
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{blogData.title}</h1>

      {/* Date */}
      {blogData.updatedAt && (
        <p className="text-gray-500 mb-6">
          {new Date(blogData.updatedAt).toLocaleDateString()}
        </p>
      )}

      {/* Description */}
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blogData.blogContent }}
      ></div>

    </div>
  );
};
