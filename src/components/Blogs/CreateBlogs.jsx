import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { useParams } from "react-router-dom";

const CreateBlogs = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [featureImage, setFeatureImage] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFeatureImage = (e) => setFeatureImage(e.target.files[0]);

  const handleSubmit = async () => {
    if (!title) return alert("Enter Blog Title");
    if (!blogContent) return alert("Enter Blog Content");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("blogContent", blogContent);
    formData.append("ctaText", "Plan your next trip with us →");
    formData.append("author", "Asia Go Travels");
    formData.append("category", "Destination Guides");

    if (featureImage) {
      formData.append("featureImage", featureImage);
    }

    const token = localStorage.getItem("token");
    if (!token) return alert("No token found! Login first.");

    try {
      setLoading(true);

      const res = await fetch(
        "https://backend.asiagotravels.com/api/blogPost",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert("Blog posted successfully!");
        setTitle("");
        setBlogContent("");
        setFeatureImage(null);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 p-5">
      <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>

      {/* Blog Title */}
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full border p-3 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Feature Image Upload */}
      <div className="mb-4">
        <label className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
          Upload Feature Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFeatureImage}
          />
        </label>
      </div>

      {/* PrimeReact Editor */}
      <div className="mb-4 border rounded bg-white">
        <Editor
          value={blogContent}
          onTextChange={(e) => setBlogContent(e.htmlValue)}
          style={{ height: "300px" }}
          placeholder="Write blog content here..."
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 justify-center disabled:bg-blue-400"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Submitting...
          </>
        ) : (
          "Submit Blog"
        )}
      </button>
    </div>
  );
};

export default CreateBlogs;
