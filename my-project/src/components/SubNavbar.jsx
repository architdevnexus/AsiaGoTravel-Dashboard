import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const SubNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // clear session/localStorage if needed
    localStorage.clear();
    // navigate to home
    navigate("/");
  };

  return (
    <div className="bg-white h-[45px] absolute z-10 w-full flex justify-between px-10 fixed items-center shadow-md">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        GoAsia Travels
      </div>

      <div className="flex gap-4 items-center relative" ref={dropdownRef}>
        <FaBell className="w-10 h-6 cursor-pointer" />

        {/* Person Icon with Dropdown */}
        <div className="relative">
          <IoMdPerson
            className="w-10 h-6 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
