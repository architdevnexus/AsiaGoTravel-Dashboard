import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot Password States
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------
  // LOGIN SUBMIT
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://backend.ghardekhoapna.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      const result = await res.json();
      console.log("Login Response:", result);

      if (!res.ok) {
        alert(result.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      if (result?.token) {
        localStorage.setItem("token", result.token);
      }

      setLoading(false);
      navigate("/dashboard/package-management");

    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  // -------------------------------
  // FORGOT PASSWORD API
  // -------------------------------
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      alert("Please enter your email first");
      return;
    }

    setForgotLoading(true);

    try {
      const res = await fetch("https://backend.ghardekhoapna.com/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const result = await res.json();
      console.log("Forgot Password:", result);

      if (!res.ok) {
        alert(result.message || "Failed to send reset link");
        setForgotLoading(false);
        return;
      }

      alert("Password reset link sent to your email!");
      setForgotLoading(false);
      setForgotOpen(false);

    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Something went wrong.");
      setForgotLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Please login to your account
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot Password Button */}
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="text-blue-600 text-sm mt-2 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      {/* -------------------------- */}
      {/* FORGOT PASSWORD MODAL */}
      {/* -------------------------- */}
      {forgotOpen && (
       <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 border rounded-lg"
                onClick={() => setForgotOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
                onClick={handleForgotPassword}
                disabled={forgotLoading}
              >
                {forgotLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
