import { toast } from "react-toastify";

export const logoutUser = () => {
  localStorage.removeItem("token");

  toast.error("Session expired. Please login again!", {
    position: "top-right",
  });

  window.location.href = "/";
};
