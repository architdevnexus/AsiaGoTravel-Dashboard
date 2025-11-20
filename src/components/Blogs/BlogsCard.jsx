import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export const BlogsCard = ({
  grid = "grid-cols-1 md:grid-cols-3",
  blogs = [],
  onDelete = () => {},
}) => {
  return (
    <div>
      <div className={`grid gap-8 ${grid}`}>
        {blogs.length > 0 ? (
          blogs.map((pkg, index) => (
            <div
              key={pkg?._id || index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={
                    pkg?.featureImage
                  }
                  alt={pkg?.location || "Blog Image"}
                  className="w-full h-56 object-cover p-3 rounded-4xl"
                />

                <div className="absolute top-5 left-4 text-white text-lg px-3 py-1 rounded-full flex items-center gap-1 bg-black/40 backdrop-blur-md">
                  <IoLocationOutline className="text-[20px] font-bold" />
                  {pkg?.location}
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex">
                <div className="bg-[#3FA9F5] h-20 w-2"></div>
                <div className="px-5 space-y-4">
                  <h3 className="text-2xl font-semibold mt-1">{pkg?.title}</h3>

                  <div
                    className="text-gray-500 text-sm line-clamp-2 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: pkg?.blogContent }}
                  ></div>
                </div>
              </div>

              {/* BUTTON SECTION */}
              <div className="w-full py-4 px-5 flex items-center justify-between">
                {/* VIEW BUTTON */}
                <Link to={`/all-blogs/${pkg?._id}`}>
                  <span className="flex items-center gap-4 bg-[#1B4965] text-white px-4 py-1.5 rounded-full hover:bg-[#357ca8] transition">
                    Learn More
                    <div className="w-8 rounded-full bg-white p-2 text-black">
                      <FaArrowRightLong />
                    </div>
                  </span>
                </Link>

                {/* EDIT BUTTON */}
                <Link
                  to={`/edit-blog/${pkg?._id}`}
                  className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition flex items-center justify-center"
                >
                  <FiEdit size={18} />
                </Link>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => onDelete(pkg?._id)}
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No Blogs found.
          </p>
        )}
      </div>
    </div>
  );
};
