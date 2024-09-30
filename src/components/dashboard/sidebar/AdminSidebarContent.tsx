import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Users, ShoppingBasket } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard/admin", icon: Home },
  { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart2 },
  { name: "Products", href: "/dashboard/admin/products", icon: ShoppingBasket },
  { name: "Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Home", href: "/", icon: Home },
];

const AdminSidebarContent = () => {
  const pathname = usePathname();

  return (
    <div className="py-4 flex flex-col h-full ">
      <div className="px-4 mb-8">
        <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
      </div>
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};
export default AdminSidebarContent;
