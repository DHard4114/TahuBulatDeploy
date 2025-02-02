"use client";

import { useState, useEffect, useCallback } from "react";
import { useCart } from "../../app/context/cartcontext";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const DynamicMap = dynamic(() => import("../payment/map"), { ssr: false });

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (address: string, paymentMethod: string) => void;
}

const CheckoutModal = ({ isOpen, onClose, onCheckout }: CheckoutModalProps) => {
  const { user } = useCart();
  const [address, setAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user === null) {
      alert("Anda harus login untuk checkout!");
      onClose();
    }
  }, [user, onClose]);

  const handleCheckout = useCallback(async () => {
    if (!address || !selectedPayment || !location) {
      alert("Harap isi semua data!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulasi sukses tanpa mengirim ke Supabase
      setTimeout(() => {
        alert("Pesanan berhasil dibuat!");
       
        onClose();
        onCheckout(address, selectedPayment);
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Terjadi kesalahan saat memproses pesanan.");
      setIsSubmitting(false);
    }
  }, [address, selectedPayment, location, onClose, onCheckout]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        <label className="block text-sm font-medium">Alamat</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mb-3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Masukkan alamat lengkap"
        />

        <label className="block text-sm font-medium">Pilih Lokasi</label>
        <DynamicMap location={location} setLocation={setLocation} />

        <label className="block text-sm font-medium mt-3">Metode Pembayaran</label>
        <select
          className="w-full border p-2 rounded-md mb-3"
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
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-3"
        >
          {isSubmitting ? "Memproses..." : "Pesan Sekarang"}
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-300 py-2 rounded-md mt-2"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;