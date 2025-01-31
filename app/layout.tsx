import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { AuthProvider } from "./context/authcontext";
import { CartProvider } from "./context/cartcontext";
import { Metadata } from "next";



export const metadata : Metadata = {
  title: "TofuCraze",
  description: "Get a Few",
  icons: {
    icon: "/favicon.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="w-full h-auto">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
