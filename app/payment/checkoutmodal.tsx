"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartProvider";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const DynamicMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <p>Memuat peta...</p>,
});

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (address: string, paymentMethod: string) => void;
}

const CheckoutModal = ({ isOpen, onClose, onCheckout }: CheckoutModalProps) => {
  const { user, clearCart, cart } = useCart();
  const [address, setAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("Anda harus login untuk checkout!");
      onClose();
    }
  }, [user, onClose]);

  const handleCheckout = async () => {
    if (!address || !selectedPayment || !location) {
      alert("Harap isi semua data!");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Keranjang belanja Anda kosong!");
      return;
    }

    if (!user?.email) {
      alert("Email tidak ditemukan. Silakan login ulang!");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderDetails = {
        address : address,
        paymentMethod: selectedPayment,
        location : location,
        email: user.email,
        cart: Object.entries(cart).map(([name, quantity]) => ({
          name,
          quantity,
        })),
      };

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      console.log("Status:", response.status);
      console.log("Content-Type:", response.headers.get("content-type"));

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Server mengembalikan HTML/Error:", errorText);
        throw new Error("Server response bukan JSON!");
      }

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || "Gagal memproses pembayaran");
      }

      alert("Pesanan berhasil dibuat dan email telah dikirim!");
      clearCart();
      onClose();
      onCheckout(address, selectedPayment);
    } catch (error: unknown) {
      let errorMessage = "Terjadi kesalahan saat memproses pembayaran";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(`Gagal checkout: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        <label className="block text-sm font-medium">Alamat</label>
        <input
          type="text"
          className="w-full border p-2 rounded-sm mb-3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Masukkan alamat lengkap"
        />

        <label className="block text-sm font-medium">Pilih Lokasi</label>
        <DynamicMap location={location} setLocation={setLocation} />

        <label className="block text-sm font-medium mt-3">Metode Pembayaran</label>
        <select
          className="w-full border p-2 rounded-sm mb-3"
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
        >
          <option value="">Pilih metode pembayaran</option>
          <option value="GOPAY">Gopay</option>
          <option value="OVO">OVO</option>
        </select>

        <button
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-sm mt-3 disabled:bg-gray-400"
        >
          {isSubmitting ? "Memproses..." : "Pesan Sekarang"}
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-300 py-2 rounded-sm mt-2"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;