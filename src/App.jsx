import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>

      <SubNavbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Dashboard Routes Wrapped Inside Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<h2>Dashboard Home</h2>} />

          <Route path="package-management" element={<PackageEdit />} />
          <Route path="testimonial" element={<Testimonials />} />
          <Route path="blogs" element={<Blogs />} />
        </Route>


        <Route path="/all-packages/:id" element={<PackageSlugPage />} />
        <Route path="/all-blogs/:id" element={<BlogsSlugPage />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/dashboard/createblogs" element={<CreateBlogs />} />
      </Routes>
    </>
  );
}

export default App;
