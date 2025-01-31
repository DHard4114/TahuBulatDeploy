"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../app/context/cartcontext";
import { menu } from "../../app/product/datamenu";
import { useRouter } from "next/navigation";

export default function FullWindowCart() {
  const { cart, addItem, removeItem } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

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
        <button className="w-full sm:w-auto hover:bg-[#000] font-mono hover:text-white py-2 sm:py-3 px-4 sm:px-6 rounded-sm border-2 border-black font-semibold bg-white text-black transition-all duration-200">
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
    </div>
  );
}
