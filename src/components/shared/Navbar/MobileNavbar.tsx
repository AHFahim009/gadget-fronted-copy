import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
  { href: "/help", label: "Help" },
];

const MobileNavbar = () => {
  const [onOpen, setOnOpen] = useState(false);
  const handleMobileMenu = () => {
    setOnOpen(true);
  };
  return (
    <Sheet open={onOpen} onOpenChange={setOnOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={handleMobileMenu}
          className=" shrink-0 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-4 h-screen overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex gap-2 ">
            <Link href="/" className=" flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="font-bold ">GadgetZone</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center scroll-m-20 text-sn font-semibold tracking-tight`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavbar;
