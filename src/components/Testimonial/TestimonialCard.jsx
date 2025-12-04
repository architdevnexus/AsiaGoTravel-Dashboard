import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

export default function TestimonialCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 relative">
      <p className="text-gray-700 text-sm italic mb-4">"{item.message}"</p>

      <div className="flex items-center gap-3">
        <img
          src={item.image}
          alt="User"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-lg">{item.name}</h4>
          <p className="text-gray-500 text-sm">{item.designation}</p>
        </div>
      </div>

      <p className="text-yellow-500 pt-7    font-semibold">
  ⭐ {item.rating} / 5
</p>


      <div className="absolute bottom-7 right-4 flex gap-3">
        <button onClick={() => onEdit(item)} className="text-yellow-500">
          <FaRegEdit size={18} />
        </button>
        <button onClick={() => onDelete(item)} className="text-red-500">
          <FaTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
}
