"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-XM7QCMV29D";

export default function GA4RouteListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    const search = window.location?.search || "";
    const page_path = `${pathname}${search}`;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path });
  }, [pathname]);

  return null;
}
