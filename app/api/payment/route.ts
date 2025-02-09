"use server";

import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabaseServer";
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
  try {
    const { EMAIL_USER, EMAIL_PASS } = process.env;
    
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Konfigurasi email tidak ditemukan");
      throw new Error("Konfigurasi email tidak ditemukan");
    }

    if (!orderDetails?.userEmail || !orderDetails?.address || !orderDetails?.payment_method || !orderDetails?.cart) {
      console.error("Data orderDetails tidak valid");
      throw new Error("Data orderDetails tidak valid");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    const mailOptions = {
      from: `"Toko Online" <${EMAIL_USER}>`,
      to: orderDetails.userEmail,
      subject: "Konfirmasi Pesanan Anda",
      html: `
        <h3>Pesanan Anda berhasil dibuat!</h3>
        <p><strong>Alamat:</strong> ${orderDetails.address}</p>
        <p><strong>Metode Pembayaran:</strong> ${orderDetails.payment_method}</p>
        <p><strong>Lokasi:</strong> ${orderDetails.location}</p>
        <p><strong>Total Item:</strong> ${orderDetails.cart.length}</p>
        <br>
        <p>Terima kasih telah membeli Tofu Craze!</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email terkirim ke ${orderDetails.userEmail}: ${info.messageId}`);

  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
};

export async function POST(req: Request) {
  const supabase = await createServerSupabase();
  try {
    const { address, paymentMethod, location, email, cart } = await req.json();

    if (![address, paymentMethod, location, email, cart].every(Boolean) || cart.length === 0) {
      return NextResponse.json({ error: "Harap isi semua data yang diperlukan" }, { status: 400 });
    }

    const { error: orderError } = await supabase
    .from("orders")
    .insert([{
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

    await sendEmail({ address, payment_method: paymentMethod, location, userEmail: email, cart });

    return NextResponse.json({ message: "Checkout berhasil" }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown Error";
    return NextResponse.json({ error: "Terjadi kesalahan server", details: errorMessage }, { status: 500 });
  }
}
