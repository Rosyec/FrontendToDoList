"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { TasksProvider } from "@/lib/tasks-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !user) {
      router.push("/login");
    }
  }, [user, router, isClient]);

  // Prevent flash of content/redirect logic handling
  if (!isClient) {
    return null;
  }

  if (!user) {
    return null;
  }

  return <TasksProvider>{children}</TasksProvider>;
}
