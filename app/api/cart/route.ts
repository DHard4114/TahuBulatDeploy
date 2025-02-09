"use server";

import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const supabase = await createServerSupabase();

  const userEmail = req.headers.get("X-User-Email");
  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log ("Email: ", userEmail)

  const { data: cartData, error } = await supabase
    .from("carts")
    .select("cart")
    .eq("email", userEmail)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ cart: [] });
    }
    return NextResponse.json({ error: "Error fetching cart" }, { status: 500 });
  }


  return NextResponse.json({ cart: cartData?.cart || [] });
}

export async function PATCH(req: Request) {
  const supabase = await createServerSupabase();
  
  const userEmail = req.headers.get("X-User-Email");
  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cart } = await req.json();
    if (!cart || typeof cart !== "object" || Array.isArray(cart)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    const { error } = await supabase
      .from("carts")
      .upsert(
        {
          email: userEmail,
          cart: cart,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}