"use client";

import { useState, useEffect } from "react";
import { createClientSupabase} from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email?: string;
};

const supabase = createClientSupabase();

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    guests: 1,
  });
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const session = await supabase.auth.getSession();

      if (!session.data.session) {
        console.error("No active session. User is not logged in.");
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (data?.user) {
        setUser(data.user);
      }
    };

    checkUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("Anda harus login terlebih dahulu untuk melakukan reservasi.");
      router.push("/auth/login");
      return;
    }

    if (form.name && form.email && form.date && form.guests > 0) {
      setSubmitted(true);
    } else {
      alert("Harap isi semua kolom dengan benar.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50 p-4 font-lato">
      <div className="max-w-md w-full bg-white rounded-sm p-5 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3 tracking-wide">
          Reservation
        </h2>

        {submitted ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600">
              Reservation Confirmed!
            </p>
            <p className="text-gray-700">
              We look forward to seeing you, {form.name}!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-sm p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-sm p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Reservation Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-sm p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Guests
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                value={form.guests}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-sm p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-all"
            >
              Reserve Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
