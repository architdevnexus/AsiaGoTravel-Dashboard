import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { useParams, useNavigate } from "react-router-dom";
import { updateBlog } from "../services/deleteBlogById";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [featureImage, setFeatureImage] = useState(null);
  const [existingFeatureImage, setExistingFeatureImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://backend.asiagotravels.com/api/AllBlog/${id}`
        );
        const data = await res.json();

        setTitle(data.blog.title);
        setBlogContent(data.blog.blogContent);
        setExistingFeatureImage(data.blog.featureImage);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleFeatureImage = (e) => {
    setFeatureImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!title) return alert("Enter Blog Title");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("blogContent", blogContent);

    if (featureImage) {
      formData.append("featureImage", featureImage);
    }

    const res = await updateBlog(id, formData);

    if (res?.success) {
      alert("Blog updated successfully!");
      navigate("/dashboard/blogs");
    } else {
      alert(res?.message || "Update failed");
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="pt-20 p-5">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

      <input
        type="text"
        placeholder="Blog Title"
        className="w-full border p-3 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="mb-4">
        <label className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
          Update Feature Image
          <input type="file" accept="image/*" hidden onChange={handleFeatureImage} />
        </label>
      </div>

      {existingFeatureImage && (
        <div className="mb-4">
          <p className="font-medium mb-1">Current Feature Image:</p>
          <img
            src={existingFeatureImage}
            alt="Current Feature"
            className="w-48 h-auto rounded border"
          />
        </div>
      )}

      <div className="mb-4">
        <Editor
          value={blogContent}
          onTextChange={(e) => setBlogContent(e.htmlValue)}
          style={{ height: "300px" }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Update Blog
      </button>
    </div>
  );
};

export default EditBlog;
