"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import ToggleMode from "./ToogleMode";
import MobileNavbar from "./MobileNavbar";
import Cart from "../Cart";
import dynamic from "next/dynamic";
import UserMenuSkeleton from "@/helpers/UserMenuSkeleton";

const DynamicUserMenu = dynamic(() => import("./UserMenu"), {
  loading: () => <UserMenuSkeleton />,
});

export default function Navbar() {
  return (
    <main>
      <header className=" w-full border-b  ">
        <div className="container mx-auto px-4 flex h-14 items-center">
          {/* logo  */}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                GadgetZone
              </span>
            </Link>
          </div>
          {/* logo  */}
          <MobileNavbar />
          <div className="flex flex-1 items-center  space-x-4 justify-end">
            <Cart />
            {/* user profile || login button  */}
            <DynamicUserMenu />
            {/*user profile || login button */}

            <ToggleMode />
          </div>
        </div>
      </header>
    </main>
  );
}
