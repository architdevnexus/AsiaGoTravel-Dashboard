import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const BlogsCard = ({
  grid = "grid-cols-1 md:grid-cols-3",
  packages = [],
  slug,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <div className="">
      <div className={`grid gap-8 ${grid}`}>
        {packages?.length > 0 ? (
          packages?.map((pkg, index) => (
            <div
              key={pkg?._id || index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={pkg?.images?.[0]}
                  alt={pkg?.location}
                  width={400}
                  height={200}
                  className="w-full h-56 object-cover p-3 rounded-4xl"
                />
                <div className="absolute top-5 left-4 text-white text-lg px-3 py-1 rounded-full flex items-center gap-1">
                  <IoLocationOutline className="text-[20px] font-bold" />{" "}
                  {pkg?.location}
                </div>
              </div>

              {/* Content */}
              <div className="flex">
                <div className="bg-[#3FA9F5] h-20 w-2"></div>

                <div className="px-5 space-y-4">
                  <h3 className="text-2xl font-semibold mt-1 leading-snug">
                    {pkg?.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {pkg?.description || "sdlmlkwnefhkjdeijdpiwqjfdwueig"}
                  </p>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex items-center justify-between px-5 py-4">
                {/* Learn More */}
                <Link to={`/all-packages/${pkg?._id}`}>
                  <span className="flex cursor-pointer items-center gap-8 bg-[#1B4965] text-white px-4 py-1.5 rounded-full hover:bg-[#357ca8] transition">
                    Learn More
                    <div className="w-8 rounded-full bg-white p-2 text-black">
                      <FaArrowRightLong />
                    </div>
                  </span>
                </Link>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {/* <button
                    onClick={() => onEdit(pkg)}
                    className="bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500"
                  >
                    <FaRegEdit size={16} />
                  </button> */}

                  <button
                    onClick={() => onDelete(pkg)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
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
