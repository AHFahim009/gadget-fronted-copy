"use client";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import profileImage from "@/assets/profile.png";
import useDashboardSideBar from "@/hooks/useDashboardSidebar";
import ToggleMode from "@/components/shared/Navbar/ToogleMode";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import UserMenuSkeleton from "@/helpers/UserMenuSkeleton";

export default function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const { openSidebar } = useDashboardSideBar();
  const { name, photo, email } =
    useAppSelector((state) => state.auth.user) || {};

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  return (
    <header className="border-b flex items-center px-4 gap-4 py-3 ">
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden shrink-0 "
        onClick={() => openSidebar()}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <div className="flex items-center justify-between   flex-1 ">
        <div className="flex items-center ">
          <Input
            type="search"
            placeholder="Search..."
            className="flex-1 mr-4"
          />
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex  items-center gap-2 ">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ToggleMode />
          {isLoading ? (
            <UserMenuSkeleton />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image
                    src={photo ? photo : profileImage}
                    width={100}
                    height={100}
                    alt="user name"
                    className="w-full object-cover rounded-full"
                  />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
