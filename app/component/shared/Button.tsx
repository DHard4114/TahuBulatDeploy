import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variants?: "primary" | "secondary";
}

export default function Button({ href, children, variants }: ButtonProps) {
  const baseStyles =
    "cursor-pointer rounded-sm py-2 px-4 md:py-3 md:px-6 font-lato font-medium text-sm md:text-md transition duration-200";

  const variantStyles = {
    primary:
      "bg-white border-2 border-[#2c2c2c] text-black hover:bg-[#2c2c2c] hover:text-white hover:border-[#2c2c2c]",
    secondary:
      "bg-transparent border-2 text-white border-[#ffffff] hover:text-[#161616] hover:border-[#161616] hover:bg-white",
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 shadow-md">
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles[variants || "primary"]}`}
      >
        {children}
      </Link>
    </div>
  );
}
