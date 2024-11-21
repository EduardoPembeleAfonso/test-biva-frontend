"use client";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="flex relative px-8 lg:pl-8 lg:pr-14 py-12 gap-16">
      {children}
    </div>
  );
}
