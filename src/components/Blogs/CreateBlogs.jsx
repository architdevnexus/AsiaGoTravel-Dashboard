import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { useParams } from "react-router-dom";

const CreateBlogs = () => {
  const { id } = useParams();   // <-- FIXED
  console.log("Blog ID:", id);

  const [title, setTitle] = useState("");
  const [featureImage, setFeatureImage] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: true }),
      Color.configure(),
    ],
    content: "",
  });

  // Handle editor image upload
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
  };

  // Handle feature image
  const handleFeatureImage = (e) => setFeatureImage(e.target.files[0]);

  // Submit Blog API
  const handleSubmit = async () => {
    if (!title) return alert("Enter Blog Title");
    if (!editor) return alert("Editor not ready");

    const blogHTML = editor.getHTML();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("blogContent", blogHTML);
    formData.append("ctaText", "Plan your next trip with us →");
    formData.append("author", "Asia Go Travels");
    formData.append("category", "Destination Guides");

    if (featureImage) {
      formData.append("featureImage", featureImage);
    }

    // ✅ Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found! Login first.");
      return;
    }

    try {
      const res = await fetch(
        "https://www.backend.ghardekhoapna.com/api/blogPost",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Dynamic token
          },
          body: formData, // Must be FormData — no content-type needed
        }
      );

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert("Blog posted successfully!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  if (!editor) return null;

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
          <input type="file" accept="image/*" hidden onChange={handleFeatureImage} />
        </label>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 flex-wrap mb-3">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-3 py-1 border rounded">B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-3 py-1 border rounded">I</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className="px-3 py-1 border rounded">S</button>

        {/* Headings */}
        <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()} className="px-3 py-1 border rounded">H1</button>
        <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()} className="px-3 py-1 border rounded">H2</button>
        <button onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()} className="px-3 py-1 border rounded">H3</button>

        {/* Alignment */}
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className="px-3 py-1 border rounded">Left</button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className="px-3 py-1 border rounded">Center</button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className="px-3 py-1 border rounded">Right</button>

        {/* Link */}
        <button
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="px-3 py-1 border rounded"
        >
          Link
        </button>

        {/* Color Picker */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="w-10 h-10 border rounded"
        />
      </div>

      {/* Editor Image Upload Button */}
      <label className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded mb-3 inline-block">
        Add Image in Content
        <input type="file" accept="image/*" hidden onChange={handleEditorImageUpload} />
      </label>

      {/* Text Editor */}
      <div className="border p-3 rounded bg-white min-h-[250px]">
        <EditorContent editor={editor} />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Blog
      </button>
    </div>
  );
};

export default CreateBlogs;
