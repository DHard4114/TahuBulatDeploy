"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../app/context/cartcontext";
import { menu } from "../../app/product/datamenu";
import { useRouter } from "next/navigation";
//import { supabase } from "../../lib/supabase";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const DynamicMap = dynamic(() => import("../payment/map"), { ssr: false });

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (address: string, paymentMethod: string) => void;
}

const FullWindowCart = () => {
  const { cart, addItem, removeItem } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const formatRupiah = (value: number): string => {
    return `Rp. ${value.toLocaleString("id-ID")}`;
  };

  const getItemPrice = (itemName: string): number => {
    for (const category in menu) {
      const item = menu[category].find((item) => item.name === itemName);
      if (item) return item.price;
    }
    return 0;
  };

  const totalAmount = Object.entries(cart)
    .reduce(
      (total, [name, quantity]) => total + getItemPrice(name) * quantity,
      0
    )
    .toFixed(2);

  const handleAddMoreItems = () => {
    router.push("/order");
  };


  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-screen top-0 inset-0 bg-white flex flex-col p-6 text-black mt-20">
      <h2 className="text-2xl font-sans font-bold mb-4">Cart</h2>
      <div className="border-b pb-4 mb-4">
        <p className="text-gray-600">({Object.keys(cart).length} items)</p>
      </div>

      {Object.entries(cart).map(([name, quantity]) => (
        <div key={name} className="flex items-center justify-between mb-4">
          <span>{name}</span>
          <div className="flex items-center gap-4">
            <button
              className="px-2 text-gray-600 hover:text-black"
              onClick={() =>
                removeItem({ name, description: "", price: 0, image: "" })
              }
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-2 text-gray-600 hover:text-black"
              onClick={() =>
                addItem({ name, description: "", price: 0, image: "" })
              }
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <p>Total</p>
          <p>{formatRupiah(parseFloat(totalAmount))}</p>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Pajak dan biaya pengiriman dihitung saat checkout.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <button
          className="w-full sm:w-auto hover:bg-[#000] font-mono hover:text-white py-2 sm:py-3 px-4 sm:px-6 rounded-sm border-2 border-black font-semibold bg-white text-black transition-all duration-200"
          onClick={handleCheckoutClick}
        >
          Checkout
        </button>
      </div>

      <div className="mt-3 space-y-3">
        <button
          onClick={handleAddMoreItems}
          className="w-full sm:w-auto hover:bg-[#000] font-mono hover:text-white py-2 sm:py-3 px-4 sm:px-6 rounded-sm border-2 border-black font-semibold bg-white text-black transition-all duration-200"
        >
          Pilih Makanan Lainnya
        </button>
      </div>

      {/* Checkout Modal */}
      {isModalOpen && (
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onCheckout={(address, paymentMethod) => {
            console.log("Checkout address: ", address);
            console.log("Checkout payment method: ", paymentMethod);
            handleModalClose();
          }}
        />
      )}
    </div>
  );
};

const CheckoutModal = ({ isOpen, onClose, onCheckout }: CheckoutModalProps) => {
  const { user, logout } = useCart();
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

  const handleCheckout = async () => {
    if (!address || !selectedPayment || !location) {
      alert("Harap isi semua data!");
      return;
    }
  
    setIsSubmitting(true);
  
    // Simulasi sukses tanpa mengirim ke Supabase, mungkin bisa saya kembangkan nanti, karena saya membuat webnya hanya 3 hari
    setTimeout(() => {
      alert("Pesanan berhasil dibuat!");
      logout();
      onClose();
      onCheckout(address, selectedPayment);
      setIsSubmitting(false);
    }, 2000);
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {/* Alamat */}
        <label className="block text-sm font-medium">Alamat</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mb-3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Masukkan alamat lengkap"
        />

        {/* Pilih Lokasi di Peta */}
        <label className="block text-sm font-medium">Pilih Lokasi</label>
        <DynamicMap location={location} setLocation={setLocation} />

        {/* Metode Pembayaran */}
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

export default FullWindowCart;
