import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";
import nodemailer from "nodemailer";

interface OrderDetails {
  address: string;
  payment_method: string;
  location: string;
}

const sendEmail = async (orderDetails: OrderDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@example.com",
    subject: "Pesanan Baru Masuk",
    text: `
      Pesanan baru telah dibuat dengan detail berikut:
      Alamat: ${orderDetails.address}
      Metode Pembayaran: ${orderDetails.payment_method}
      Lokasi: ${orderDetails.location}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { address, selectedPayment, location, username } = req.body;

    if (!address || !selectedPayment || !location || !username) {
      return res.status(400).json({ error: "Harap isi semua data!" });
    }

    
    const { data: cartData, error: cartError } = await supabase
      .from("carts")
      .select("cart")
      .eq("username", username)
      .single();

    if (cartError || !cartData) {
      return res.status(404).json({ error: "Cart tidak ditemukan" });
    }

    const { error: orderError } = await supabase.from("orders").insert([
      {
        username,
        cart: cartData.cart,
        address,
        payment_method: selectedPayment,
        location,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (orderError) {
      return res.status(500).json({ error: "Gagal menyimpan pesanan", details: orderError });
    }

    
    await supabase.from("carts").delete().eq("username", username);

    await sendEmail({ address, payment_method: selectedPayment, location });

    return res.status(200).json({ message: "Checkout berhasil, cart dikosongkan, dan email terkirim!" });
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
