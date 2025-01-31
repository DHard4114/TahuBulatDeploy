"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { MenuItem } from "../product/datamenu";
import { supabase } from "../../lib/supabase";

type Cart = { [key: string]: number };

interface AuthCartContextType {
  cart: Cart;
  addItem: (item: MenuItem) => void;
  removeItem: (item: MenuItem) => void;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthCartContext = createContext<AuthCartContextType | undefined>(undefined);

interface AuthCartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: AuthCartProviderProps) => {
  const [cart, setCart] = useState<Cart>({});
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      if (data?.session) {
        setUser(data.session.user?.email || null);
      }
    };
    fetchSession();
  }, []);

  const fetchCart = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("carts")
      .select("cart")
      .eq("username", user)
      .single();

    if (error) {
      console.error("Error fetching cart:", error.message);
      setCart({});
    } else {
      setCart(data?.cart || {});
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [fetchCart, user]);

  const updateCart = useCallback(async () => {
    if (!user) return;

    const { error } = await supabase
      .from("carts")
      .upsert(
        [{ username: user, cart, updated_at: new Date().toISOString() }],
        { onConflict: "username" }
      )
      .select();

    if (error) {
      console.error("Error updating cart:", error.message);
    }
  }, [user, cart]);

  useEffect(() => {
    updateCart();
  }, [cart, updateCart]);

  const addItem = (item: MenuItem & { quantity?: number }) => {
    setCart((prevCart) => {
      const qtyToAdd = item.quantity ?? 1;
      return {
        ...prevCart,
        [item.name]: (prevCart[item.name] || 0) + qtyToAdd,
      };
    });
  };

  const removeItem = (item: MenuItem) => {
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

  const login = async (username: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
    setCart({});
  };

  return (
    <AuthCartContext.Provider
      value={{ cart, addItem, removeItem, user, login, logout }}
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
