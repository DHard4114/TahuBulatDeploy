import { NextRequest } from "next/server";
import { validateUserSession } from "@/app/api/middleware";

export async function middleware(request: NextRequest) {
  return await validateUserSession(request);
}

export const config = {
  matcher: ["/app/api/cart", "/app/api/payment"],
};
