"use client";

import { useState } from "react";
import { createClientSupabase } from "@/lib/supabaseClient";
import Link from "next/link";

const supabase = createClientSupabase();

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Cek email kamu untuk konfirmasi!");
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">Sign Up</h1>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-3 text-sm text-green-500">{success}</p>}

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-gray-300 p-2 focus:border-gray-500 focus:ring-gray-400"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-gray-300 p-2 focus:border-gray-500 focus:ring-gray-400"
          />
        </div>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full rounded-sm bg-[#141414] p-2 text-white disabled:bg-gray-500"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p className="mt-3 text-center text-sm text-gray-700">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="font-semibold text-gray-900">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
