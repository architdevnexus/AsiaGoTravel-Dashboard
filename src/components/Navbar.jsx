import React, { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

const sidebarLinks = [
  // { path: "/dashboard", label: "DASHBOARD" },

  {
    path: "/dashboard/package-management",
    label: "Package",

  },

  {
    path: "/dashboard/testimonial",
    label: "Testimonial",
  },

  {
    path: "/dashboard/blogs",
    label: "Blogs",

  },

  {
    path: "/dashboard/createblogs",
    label: "Create Blogs",
  },
  { path: "/dashboard/Createcareer", label: "Create Career" },
  { path: "/dashboard/jobapplicants", label: "Job Applicants" },


//   { path: "/dashboard/feedbackmanagement", label: "FEEDBACK MANAGEMENT" },
//   { path: "/dashboard/discountmanagement", label: "DISCOUNT MANAGEMENT" },
//   { path: "/dashboard/analytics", label: "ANALYTICS" },
];

const DashboardLayout = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex  ">
      {/* Sidebar */}
      <aside className="fixed font-nunito  top-0 left-0 h-screen w-68 bg-[#1E1E1E] text-white flex flex-col  overflow-y-auto ">
      

        <nav className="flex-1 p-4 space-y-2 mt-12  ">
          {sidebarLinks.map((link, index) =>
            link.children ? (
              <div key={index}>
                <button
                  onClick={() => toggleMenu(link.label)}
                  className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-gray-700"
                >
                  {link.label}
                  <span>{openMenus[link.label] ? "▲" : "▼"}</span>
                </button>

                {/* Submenu */}
                {openMenus[link.label] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child, childIndex) => (
                      <NavLink
                        key={childIndex}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded hover:bg-gray-700 ${
                            isActive
                              ? "bg-white text-black hover:text-white "
                              : ""
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-gray-600 ${
                    isActive
                      ? "bg-white text-black hover:bg-gray-600 hover:text-white "
                      : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen overflow-y-auto ">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
