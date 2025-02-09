"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { MenuItem } from "../product/datamenu";
import { createClientSupabase } from "../../lib/supabaseClient";
import { User } from "@supabase/auth-js";

type Cart = { [key: string]: number };

interface AuthCartContextType {
  cart: Cart;
  addItem: (item: MenuItem) => void;
  removeItem: (item: MenuItem) => void;
  user: User | null;
  clearCart: () => void;
}

const AuthCartContext = createContext<AuthCartContextType | undefined>(
  undefined
);

interface AuthCartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: AuthCartProviderProps) => {
  const [cart, setCart] = useState<Cart>({});
  const [user, setUser] = useState<User | null>(null);
  const lastSavedCart = useRef<Cart | null>(null);
  const supabase = createClientSupabase();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const fetchCart = useCallback(async () => {
    if (!user?.email) return;
  
    try {
      const res = await fetch("/api/cart", {
        method: "GET",
        headers: {
          "X-User-Email": user.email,
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setCart(data.cart);
      } else {
        console.error("Error fetching cart:", data.error);
      }
    } catch (error) {
      console.error("Network error while fetching cart:", error);
    }
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
  
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": user.email,
        },
        body: JSON.stringify({cart}),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error("Error updating cart:", data.error);
      } else {
        lastSavedCart.current = cart;
      }
    } catch (error) {
      console.error("Network error while updating cart:", error);
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
    setCart((prevCart) => ({
      ...prevCart,
      [item.name]: (prevCart[item.name] || 0) + (item.quantity ?? 1),
    }));
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
    <AuthCartContext.Provider
      value={{ cart, addItem, removeItem, user, clearCart }}
    >
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
