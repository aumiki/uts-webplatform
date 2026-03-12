"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import CartIndicator from "./CartIndicator";

export default function AuthHideWrapper() {
  const pathname = usePathname();
  const hideOnAuth = pathname === "/login" || pathname === "/register";
  
  if (hideOnAuth) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      <CartIndicator />
    </>
  );
}

