"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SliderButtonControl from "./SliderButtonControl";

interface User {
  name: { first: string; last: string };
  picture: { large: string };
  location: { city: string };
}

export default function ReviewCard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const reviews = [
    "Tofu Craze Original renyah dan gurih! Cocok banget buat camilan ringan. Pemesanan online juga cepat dan mudah!",
    "Tofu Craze Mozarella-nya luar biasa! Keju meleleh di dalamnya bikin ketagihan. Proses checkout juga simpel!",
    "Tofu Craze Udang Ayam punya rasa gurih yang unik! Kombinasi udang dan ayamnya pas banget. Pengiriman cepat!",
    "Pedasnya Tofu Craze Mercon mantap! Buat pecinta pedas, ini wajib coba. Pelayanan online sangat responsif!",
    "Tofu Craze Isi Telor bikin nagih! Isian telur puyuhnya bikin makin enak. Booking meja juga gampang banget!",
    "Tofu Craze Isi Daging Rendang benar-benar kaya rasa! Dagingnya empuk dan berbumbu khas. Restoran juga nyaman!",
    "Otak-otak Kepiting Alaska punya rasa seafood premium! Lezat dan cocok buat teman ngobrol. Order online lancar!",
    "Otak-otak Gurita punya tekstur unik dan rasa gurih yang khas! Worth it banget untuk dicoba!",
    "Es Teh Tarik-nya segar banget! Rasa manis dan teh yang pas. Pengiriman cepat, tetap dingin saat sampai!",
    "Smoothies buahnya creamy dan segar! Cocok buat pelepas dahaga. Kemasannya juga rapi dan aman!",
    "Wedang Jahe hangatnya pas buat malam hari! Jahe dan gula merahnya bikin badan hangat dan rileks.",
];

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=11")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        const duplicatedUsers = [...data.results, ...data.results.slice(0, 3)];
        setUsers(duplicatedUsers);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (users.length > 3) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [users]);

  useEffect(() => {
    if (currentIndex === users.length - 3) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, users.length]);

  return (
    <section id="review" className="w-full flex flex-col items-center p-10 bg-white">
      <h2 className="text-5xl font-cookie font-extrabold text-center text-[#161616]">
        Customer Reviews
      </h2>

      <div className="relative w-full max-w-4xl overflow-hidden mt-6">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div
            className={`flex transition-transform ${
              isTransitioning ? "duration-500 ease-in-out" : "duration-0"
            }`}
            style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
          >
            {users.map((user, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 p-4 text-center bg-transparent rounded-sm"
              >
                <Image
                  src={user.picture.large}
                  alt={`Profile picture of ${user.name.first} ${user.name.last}`}
                  width={64}
                  height={64}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-lg font-montserrat font-semibold mt-2">
                  {user.name.first} {user.name.last}
                </h3>
                <p className="text-sm text-gray-600">{user.location.city}</p>
                <p className="italic mt-2 text-sm">
                  {reviews[index % reviews.length]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isLoading && !error && (
        <SliderButtonControl
          onPrev={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? users.length - 3 : prevIndex - 1
            )
          }
          onNext={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex + 1 === users.length ? 0 : prevIndex + 1
            )
          }
        />
      )}
    </section>
  );
}
