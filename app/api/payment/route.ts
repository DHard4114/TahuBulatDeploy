"use server";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

interface CartItem {
  name: string;
  quantity: number;
}

interface OrderDetails {
  address: string;
  payment_method: string;
  location: string;
  userEmail: string;
  cart: CartItem[];
}

const sendEmail = async (orderDetails: OrderDetails) => {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) throw new Error("Konfigurasi email tidak ditemukan");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: orderDetails.userEmail,
    subject: "Konfirmasi Pesanan",
    text: `Pesanan Anda berhasil dibuat dengan detail berikut:
    
Alamat: ${orderDetails.address}
Metode Pembayaran: ${orderDetails.payment_method}
Lokasi: ${orderDetails.location}
Total Item: ${orderDetails.cart.length}`,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(req: Request) {
  try {
    const { address, paymentMethod, location, email, cart } = await req.json();

    // Validasi input
    if (![address, paymentMethod, location, email, cart].every(Boolean) || cart.length === 0) {
      return NextResponse.json({ error: "Harap isi semua data yang diperlukan" }, { status: 400 });
    }

    // Menyimpan pesanan ke Supabase
    const { error: orderError } = await supabase.from("orders").insert([{
      username: email,
      cart,
      address,
      payment_method: paymentMethod,
      location,
      status: "pending",
      created_at: new Date().toISOString(),
    }]);

    if (orderError) {
      console.error("Supabase Insert Error:", orderError);
      return NextResponse.json({ 
        error: "Gagal menyimpan pesanan", 
        details: orderError.message 
      }, { status: 500 });
    }

    // Kirim konfirmasi email
    await sendEmail({ address, payment_method: paymentMethod, location, userEmail: email, cart });

    return NextResponse.json({ message: "Checkout berhasil" }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown Error";
    return NextResponse.json({ error: "Terjadi kesalahan server", details: errorMessage }, { status: 500 });
  }
}
