"use client";
import Footer from "@/components/dashboard/footer/Footer";
import Header from "@/components/dashboard/header/Header";
import SideBarSkeleton from "@/helpers/SideBarSkeleton";
import dynamic from "next/dynamic";

import { ReactNode } from "react";

const DynamicSidebar = dynamic(
  () => import("@/components/dashboard/sidebar/Sidebar"),
  {
    loading: () => <SideBarSkeleton />, // Correct placement for the loading component
  }
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-screen"
      style={{ maxWidth: "1400px", margin: "auto" }}
    >
      <DynamicSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <div className="w-full mx-auto max-w-[1200px] px-4  py-6">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
