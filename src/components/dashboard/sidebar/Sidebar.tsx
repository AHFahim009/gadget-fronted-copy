"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import useDashboardSideBar from "@/hooks/useDashboardSidebar";
import { useAppSelector } from "@/redux/hooks";
import AdminSidebarContent from "./AdminSidebarContent";
import UserSidebarContent from "./UserSidebarContent";
import { useState, useEffect } from "react";
import SideBarSkeleton from "@/helpers/SideBarSkeleton";

export default function Sidebar() {
  const [loading, setLoading] = useState(true);

  const { closeSidebar, isSideBarOpen } = useDashboardSideBar();
  const userRole = useAppSelector((state) => state.auth.user?.role);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
  let sidebarContent;
  switch (userRole) {
    case "admin":
      sidebarContent = <AdminSidebarContent />;
      break;
    case "user":
      sidebarContent = <UserSidebarContent />;
      break;

    default:
      break;
  }

  if (loading) {
    return <SideBarSkeleton />;
  }
  return (
    <>
      <aside className="hidden lg:block w-56 border px-4 overflow-x-hidden">
        {sidebarContent}
      </aside>

      <Sheet open={isSideBarOpen} onOpenChange={closeSidebar}>
        <SheetContent side="left" className="w-64 p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
