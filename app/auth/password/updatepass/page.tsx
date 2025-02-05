"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../api/auth/authcontext";

export default function UpdatePasswordPage() {
  const { updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const resetToken = queryParams.get("access_token");
    if (resetToken) {
      setToken(resetToken);
    }
  }, []);

  const handleUpdatePassword = async () => {
    setLoading(true);
    setMessage("");

    if (!token) {
      setMessage("Invalid or expired reset token.");
      setLoading(false);
      return;
    }

    // Menambahkan token pada update password
    const errorMessage = await updatePassword(newPassword, token);

    if (errorMessage) {
      setMessage("Something went wrong. Please try again.");
    } else {
      setMessage("Password updated successfully! Redirecting...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Password</h1>

        {message && <p className="text-sm mb-3 text-center">{message}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
        />

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full disabled:bg-blue-300"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
