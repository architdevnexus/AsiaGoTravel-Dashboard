import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import DashboardLayout from "./components/Navbar";
import { SubNavbar } from "./components/SubNavbar";
import { PackageEdit } from "./components/PackageEdit";
import PackageSlugPage from "./components/PackageEdit/PackageDetailsPage";
import Testimonials from "./components/Testimonial/Testimonial";
import { ResetPassword } from "./components/ResetPassword";
import { Blogs } from "./components/Blogs/Blogs";
import { BlogsSlugPage } from "./components/Blogs/BlogsSlugPage";
import CreateBlogs from "./components/Blogs/CreateBlogs";
import EditBlog from "./components/Blogs/EditBlogPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPackage from "./components/PackageEdit/CreatePackage";
import { Career } from "./components/Career/Career";
import { CreateCareerJobForm } from "./components/Career/CreateCareer";
import { CareerJobCard } from "./components/Career/AllCareer";
import { AllJobApplicants } from "./components/Career/AllJobApplicants";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Hide SubNavbar on Login page */}
      {location.pathname !== "/" && <SubNavbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
           <ProtectedRoute>
            <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<h2>Dashboard Home</h2>} />

          <Route path="package-management" element={<PackageEdit />} />
          <Route path="add-package" element={<AddPackage />} />
          <Route path="testimonial" element={<Testimonials />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="all-blogs/:id" element={<BlogsSlugPage />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
          <Route path="createblogs" element={<CreateBlogs />} />
          <Route path="createcareer" element={<Career />} />
          <Route path="jobapplicants" element={<AllJobApplicants />
          } />


          <Route
            path="all-packages/:id"
            element={

              <PackageSlugPage />

            }
          />
        </Route>


      </Routes>
    </>
  );
}

export default App;
