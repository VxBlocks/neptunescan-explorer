"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Block() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const h = searchParams.get("h");

  useEffect(() => {
    if (h) {
      router.replace(`/block/${h}`);
    } else {
      router.replace("/");
    }
  }, [h, router]);

  return null;
}
