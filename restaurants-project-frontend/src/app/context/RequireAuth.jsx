"use client";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export function RequireAuth({ children }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login");
    }
  }, [auth.currentUser, router]);

  return auth.currentUser ? children : null;
}
