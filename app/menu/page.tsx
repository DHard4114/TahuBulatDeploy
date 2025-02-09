"use client";

import Image from "next/image";
import { menu } from "../product/datamenu";

export default function MenuPage() {
  return (
    <div className="w-full h-auto pt-14 bg-[#FDEBD0]">
      <div className="w-full h-72 relative">
        <Image
          src="/TahuBulat2.jpg"
          alt="Gambar utama tahu bulat"
          layout="fill"
          objectFit="cover"
          className="rounded-sm"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-cookie text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#fffffe]">
            Check Out
          </h2>
          <h1 className="font-anton font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#fffffe]">
            OUR MENU
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {Object.entries(menu).map(([category, items]) => (
          <div key={category} className="my-12">
            <h2 className="text-4xl sm:text-5xl font-cookie font-bold mb-6 border-b pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-sm shadow-md border hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="rounded-sm w-full h-auto object-cover"
                  />
                  <h3 className="text-lg font-anton font-bold mt-4 text-[#2e2e2e] tracking-[0.05em]">
                    {item.name}
                  </h3>
                  <p className="font-mono font-light mt-2 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
