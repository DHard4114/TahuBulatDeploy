"use client";

import { useState } from "react";
import { useAuth } from "../../../context/authcontext";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");

    if (!email) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const errorMessage = await resetPassword(email);

    if (errorMessage) {
      setMessage("Something went wrong. Please try again.");
    } else {
      setMessage("If the email is associated with an account, you'll receive a reset link.");
    }

    setLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleResetPassword();
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50 p-4 font-lato">
      <div className="max-w-md w-full bg-white rounded-sm p-5 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3 tracking-wide">Reset Password</h2>

        {message && <p className="text-sm text-center mb-3 text-gray-700">{message}</p>}

        <div className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full rounded-sm border-gray-300 focus:border-gray-500 focus:ring-gray-400 text-gray-800 p-2"
              required
            />
          </div>

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full bg-[#141414] text-white font-medium py-2 rounded-sm hover:bg-gray-900 transition-all"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
