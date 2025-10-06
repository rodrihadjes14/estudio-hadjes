"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = "G-XM7QCMV29D";

export default function GA4RouteListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    const q = searchParams?.toString();
    const page_path = q ? `${pathname}?${q}` : pathname;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path });
  }, [pathname, searchParams]);

  return null;
}
