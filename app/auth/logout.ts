import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogout() {
  const auth = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return ;

    try {
      setIsLoggingOut(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await auth.logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut };
}
