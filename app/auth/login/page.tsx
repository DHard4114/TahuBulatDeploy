"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedEmails, setSavedEmails] = useState<string[]>([]);

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem("savedEmails") || "[]");
    setSavedEmails(storedEmails);
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const updatedEmails = Array.from(new Set([email, ...savedEmails]));
      localStorage.setItem("savedEmails", JSON.stringify(updatedEmails));

      router.push("/");
    }

    setLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50 p-4 font-lato">
      <div className="max-w-md w-full bg-white rounded-sm p-5 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3 tracking-wide">Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <div className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}  // Add onKeyDown event for Enter key
              list="email-suggestions"
              className="mt-1 block w-full rounded-sm border-gray-300 focus:border-gray-500 focus:ring-gray-400 text-gray-800 p-2"
              required
            />
            <datalist id="email-suggestions">
              {savedEmails.map((savedEmail, index) => (
                <option key={index} value={savedEmail} />
              ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}  // Add onKeyDown event for Enter key
              className="mt-1 block w-full rounded-sm border-gray-300 focus:border-gray-500 focus:ring-gray-400 text-gray-800 p-2"
              required
            />
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-[#141414] text-white font-medium py-2 rounded-sm hover:bg-gray-900 transition-all"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-center text-sm">
            Belum punya akun? <Link href="/auth/signup" className="text-blue-500">Daftar</Link>
          </p>
          <p className="text-center text-sm">
            <Link href="/auth/password/repass" className="text-blue-500">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
