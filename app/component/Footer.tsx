"use client";

import { usePathname } from "next/navigation";
import ContactSection from "../contact/page";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="bg-[#8B5E3B] text-white py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8">
      {/* Slogan */}
      <div className="text-center mb-6">
        <h1 className="font-anton text-3xl sm:text-4xl md:text-5xl tracking-wide">
          MORE THAN JUST TOFU, IT’S A CRAZE!
        </h1>
      </div>

      {/* Contact Section, tampil hanya di homepage */}
      <div id="contact" className="justify-center items-center">
        {isHomePage && <ContactSection />}
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm md:text-base text-gray-200">
        &copy; {new Date().getFullYear()} Tofu Craze. All Rights Reserved.
      </div>
    </footer>
  );
}
