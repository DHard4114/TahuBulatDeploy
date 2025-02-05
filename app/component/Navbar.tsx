"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../api/auth/authcontext";
import { useLogout } from "../auth/logout";
import { User, ShoppingCart, Menu as HamburgerIcon } from "lucide-react";
import { useCart } from "../api/cartcontext";

export default function Navbar() {
  const { user } = useAuth();
  const { logout, isLoggingOut } = useLogout();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const totalItems = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);

  return (
    <nav className="fixed w-full bg-[#161616] p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="text-white font-montserrat text-2xl pr-10">
            <Link href="/" className="font-semibold text-xl"><span className="font-cookie text-5xl">T</span>C</Link>
          </div>

          <div className="sm:hidden px-2" onClick={toggleMenu}>
            <HamburgerIcon size={24} className="text-white cursor-pointer" />
          </div>
        </div>

        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col sm:flex space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0 sm:flex-row absolute sm:static bg-[#161616] sm:bg-transparent w-full sm:w-auto left-0 sm:left-auto top-16 sm:top-auto sm:p-0 p-4`}
        >
          <li>
            <Link className="text-white font-montserrat" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-white font-montserrat" href="/menu">
              Menu
            </Link>
          </li>
          <li>
            <Link className="text-white font-montserrat" href="/order">
              Order Online
            </Link>
          </li>
          <li>
            <Link className="text-white font-montserrat" href="/reservation">
              Reservation
            </Link>
          </li>
        </ul>

        {/* Icons for User Authentication and Cart */}
        <div className="flex items-center space-x-4 sm:ml-auto">
          {user ? (
            <>
              {/* notifikasi jumlah barang */}
              <Link href="/cart" className="relative text-white">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* Tombol Logout */}
              <button
                onClick={logout}
                disabled={isLoggingOut}
                className="text-white font-montserrat disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="flex items-center text-white font-montserrat">
              <User size={20} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
