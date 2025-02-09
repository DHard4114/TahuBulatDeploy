"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { menu } from "../product/datamenu";
import { X, Minus, Plus } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useCart } from "../context/CartProvider";
import { createClientSupabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type MenuItem = {
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
};

interface User {
  id: string;
  email?: string;
}

const supabase = createClientSupabase();

export default function OrderPage() {
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    checkUser();
  }, []);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setIsOpen(true);
  };

  const increaseQuantity = useCallback(
    () => setQuantity((prev) => prev + 1),
    []
  );
  const decreaseQuantity = useCallback(
    () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)),
    []
  );

  const handleAddToCart = () => {
    if (!user) {
      alert("Anda harus login terlebih dahulu untuk melakukan pemesanan.");
      router.push("/auth/login");
      return;
    }

    if (selectedItem && quantity > 0) {
      addItem({ ...selectedItem, quantity });
      setIsOpen(false);
    } else {
      alert("Quantity harus lebih dari 0 untuk menambahkan ke keranjang.");
    }
  };

  return (
    <div className="w-full h-auto pt-14 bg-[#fffdfa]">
      {/* Header */}
      <div className="w-full h-72 relative">
        <Image
          src="/TahuBulat2.jpg"
          alt="Gambar utama tahu bulat"
          layout="fill"
          objectFit="cover"
          className="rounded-sm"
        />
        <div className="absolute inset-0 flex flex-col items-center sm:items-start justify-center text-center sm:text-left px-4 sm:px-10 md:px-20 lg:px-40">
          <h1 className="font-anton font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl bg-[#fffdfa] text-[#000000] border-2 border-black p-4">
            Get It Delivered
            <p className="font-lato font-normal text-sm text-black">
              Lapar? Cukup pesan dan makanan akan segera diantar! Pilih dari
              menu terbaik kami, checkout dalam hitungan detik, dan nikmati
              kelezatannya.
            </p>
          </h1>
        </div>
      </div>

      {/* Menu List */}
      <div className="container mx-auto px-4 mt-12">
        {Object.entries(menu).map(([category, items]) => (
          <div key={category} className="my-12">
            <h2 className="text-4xl sm:text-5xl font-cookie font-bold mb-6 border-b pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 pb-8 rounded-sm shadow-md border hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="rounded-sm w-full h-1/2 object-cover"
                  />
                  <h3 className="text-lg font-anton font-bold mt-4 text-[#2e2e2e] tracking-[0.05em]">
                    {item.name}
                  </h3>
                  <p className="font-mono font-light mt-2 text-xs lg:text-sm">
                    {item.description}
                  </p>
                  <p className="font-cookie text-md lg:text-xl text-[#358128]">
                    Rp {formatPrice(item.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4"
      >
        <Dialog.Panel className="bg-white p-6 rounded-sm max-w-sm w-full relative">
          <button
            aria-label="Close"
            className="absolute top-1 right-1 text-lg sm:text-sm"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>

          {selectedItem && (
            <>
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                width={300}
                height={200}
                className="rounded-sm w-full h-auto object-cover"
              />
              <h3 className="text-lg font-anton font-bold mt-4">
                {selectedItem.name}
              </h3>
              <p className="font-mono font-light mt-2 text-sm">
                {selectedItem.description}
              </p>
              <p className="font-cookie text-xl mt-2 text-[#358128]">
                Rp {formatPrice(selectedItem.price)}
              </p>

              {/* Counter Button */}
              <div className="flex items-center mt-4 justify-center space-x-7">
                <button
                  aria-label="Decrease Quantity"
                  className="p-2 text-xl"
                  onClick={decreaseQuantity}
                >
                  <Minus size={20} />
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  aria-label="Increase Quantity"
                  className="p-2 text-xl"
                  onClick={increaseQuantity}
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full border-2 border-black text-black bg-white hover:bg-[#0c0c0c] hover:text-white py-2 px-4 rounded-sm text-sm font-normal transition-all duration-300"
                onClick={handleAddToCart}
              >
                Tambah {quantity} ke Keranjang (Rp{" "}
                {formatPrice(quantity * selectedItem.price)})
              </button>
            </>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
