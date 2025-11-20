import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Read token from URL

  console.log(token , "token")

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirm) {
      alert("Please fill both fields");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://194.238.18.1:3005/api/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const result = await res.json();
      console.log("Reset Password Response:", result);

      if (!res.ok) {
        alert(result.message || "Failed to reset password");
        setLoading(false);
        return;
      }

      alert("Password reset successful! Please login.");
      navigate("/");

    } catch (error) {
      console.error("Reset error:", error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <p className="text-sm text-center text-gray-600">
          Enter your new password
        </p>

        <div className="space-y-4">

          <div>
            <label className="block mb-1 text-gray-700 text-sm">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </div>
    </div>
  );
};
