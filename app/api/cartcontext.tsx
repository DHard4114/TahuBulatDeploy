"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback, useRef } from "react";
import { MenuItem } from "../product/datamenu";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/auth-js";

type Cart = { [key: string]: number };

interface AuthCartContextType {
  cart: Cart;
  addItem: (item: MenuItem) => void;
  removeItem: (item: MenuItem) => void;
  user: User | null;
  clearCart: () => void;
}

const AuthCartContext = createContext<AuthCartContextType | undefined>(undefined);

interface AuthCartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: AuthCartProviderProps) => {
  const [cart, setCart] = useState<Cart>({});
  const [user, setUser] = useState<User | null>(null);
  const lastSavedCart = useRef<Cart | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      console.log("User fetched:", data?.session?.user);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
        console.log("Auth state changed:", session?.user);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchCart = useCallback(async () => {
    if (!user?.email) return;

    const { data, error } = await supabase
      .from("carts")
      .select("cart")
      .eq("email", user.email)
      .single();

    if (error) {
      console.error("Error fetching cart:", error.message);
      setCart({});
      return;
    }

    const formattedCart = Array.isArray(data?.cart)
      ? Object.fromEntries(data.cart.map((item) => [item.name, item.quantity]))
      : {};

    setCart(formattedCart);
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      fetchCart();
    }
  }, [user, fetchCart]);

  const updateCart = useCallback(async () => {
    if (!user?.email) return;

    if (JSON.stringify(lastSavedCart.current) === JSON.stringify(cart)) {
      console.log("Cart tidak berubah, tidak perlu update.");
      return;
    }

    const formattedCart = Object.entries(cart).map(([name, quantity]) => ({
      name,
      quantity,
    }));

    const { error } = await supabase
      .from("carts")
      .upsert(
        [
          {
            email: user.email,
            cart: formattedCart,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "email" }
      );

    if (error) {
      console.error("Error updating cart:", error.message);
    } else {
      lastSavedCart.current = cart;
    }
  }, [cart, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateCart();
    }, 500);

    return () => clearTimeout(timer);
  }, [cart, updateCart]);

  const addItem = (item: MenuItem & { quantity?: number }) => {
    if (!user) return;
    setCart((prevCart) => {
      const qtyToAdd = item.quantity ?? 1;
      return {
        ...prevCart,
        [item.name]: (prevCart[item.name] || 0) + qtyToAdd,
      };
    });
  };

  const removeItem = (item: MenuItem) => {
    if (!user) return;

    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item.name] > 1) {
        newCart[item.name] -= 1;
      } else {
        delete newCart[item.name];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    if (!user) return;
    setCart({});
  };

  return (
    <AuthCartContext.Provider value={{ cart, addItem, removeItem, user, clearCart }}>
      {children}
    </AuthCartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(AuthCartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
