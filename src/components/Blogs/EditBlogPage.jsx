import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { useParams, useNavigate } from "react-router-dom";
import { updateBlog } from "../services/deleteBlogById";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [featureImage, setFeatureImage] = useState(null);
  const [existingFeatureImage, setExistingFeatureImage] = useState("");
  const [loading, setLoading] = useState(true);

  // -----------------------------------------------------
  // TipTap Setup
  // -----------------------------------------------------
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: false,  // ❗ disable default heading
      link: false,     // ❗ disable default link
    }),

    Heading.configure({ levels: [1, 2, 3] }),
    Link.configure({ openOnClick: true }),
    Image.configure({ inline: false }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Color.configure(),
  ],
  content: "",
});


  // -----------------------------------------------------
  // Fetch EXISTING blog content
  // -----------------------------------------------------
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`https://backend.ghardekhoapna.com/api/AllBlog/${id}`);
        const data = await res.json();

        console.log(data.blog.title)

        setTitle(data.blog.title);
        editor?.commands.setContent(data.blog.blogContent);
         setExistingFeatureImage(data.blog.featureImage); 

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (editor) fetchBlog();
  }, [editor]);

  // -----------------------------------------------------
  // Handle image upload in editor
  // -----------------------------------------------------
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };

    reader.readAsDataURL(file);
  };

  // -----------------------------------------------------
  // Handle feature image
  // -----------------------------------------------------
  const handleFeatureImage = (e) => {
    setFeatureImage(e.target.files[0]);
  };

  // -----------------------------------------------------
  // UPDATE BLOG – USE updateBlog SERVICE
  // -----------------------------------------------------
  const handleSubmit = async () => {
    if (!title) return alert("Enter Blog Title");

    const html = editor.getHTML();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("blogContent", html);

    if (featureImage) {
      formData.append("featureImage", featureImage);
    }

    const res = await updateBlog(id, formData); // ✅ USE SERVICE

    console.log("Updated:", res);

    if (res?.success) {
      alert("Blog updated successfully!");
      navigate("/blogs");
    } else {
      alert(res?.message || "Update failed");
    }
      navigate("/dashboard/blogs");
  };

  if (loading || !editor) return <p className="p-5">Loading...</p>;

  // -----------------------------------------------------
  // UI
  // -----------------------------------------------------
  return (
    <div className="pt-20 p-5">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full border p-3 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

{/* Feature Image */}
<div className="mb-4">
  <label className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
    Update Feature Image
    <input type="file" accept="image/*" hidden onChange={handleFeatureImage} />
  </label>
</div>

{/* Show existing feature image */}
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


      {/* Toolbar */}
      <div className="flex gap-2 flex-wrap mb-3">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-3 py-1 border rounded">B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-3 py-1 border rounded">I</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className="px-3 py-1 border rounded">S</button>

        <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()} className="px-3 py-1 border rounded">H1</button>
        <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()} className="px-3 py-1 border rounded">H2</button>
        <button onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()} className="px-3 py-1 border rounded">H3</button>

        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className="px-3 py-1 border rounded">Left</button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className="px-3 py-1 border rounded">Center</button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className="px-3 py-1 border rounded">Right</button>

        <button
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="px-3 py-1 border rounded"
        >
          Link
        </button>

        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="w-10 h-10 border rounded"
        />
      </div>

      {/* Add image inside editor */}
      <label className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded mb-3 inline-block">
        Add Image in Content
        <input type="file" accept="image/*" hidden onChange={handleEditorImageUpload} />
      </label>

      {/* Text Editor */}
      <div className="border p-3 rounded bg-white min-h-[300px]">
        <EditorContent editor={editor} />
      </div>

      {/* Submit */}
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
