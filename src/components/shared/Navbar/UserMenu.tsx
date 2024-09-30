"use client";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Image from "next/image";
import useLoginStore from "@/hooks/useLoginStore";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeUser } from "@/redux/slices/user.slice";
import { useEffect, useState } from "react";
import UserMenuSkeleton from "@/helpers/UserMenuSkeleton";
import Link from "next/link";
const UserMenu = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { openModal } = useLoginStore();
  const dispatch = useAppDispatch();
  const {
    name: userName,
    photo,
    email,
    role,
  } = useAppSelector((state) => state.auth?.user) || {};
  console.log(photo);

  let dashboardPath = ``;
  switch (role) {
    case "admin":
      dashboardPath = `/dashboard/${role}`;
      break;
    case "user":
      dashboardPath = `/dashboard/${role}`;
      break;

    default:
      break;
  }

  useEffect(() => {
    // Wait for the Redux auth store to be initialized
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
  const handleLogin = () => {
    openModal();
  };

  const handleLogOut = async () => {
    dispatch(removeUser());
    router.push("/");
  };

  if (loading) {
    return <UserMenuSkeleton />;
  }

  return (
    <>
      {userName ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Image
                src={photo ? photo : profileImage}
                width={100}
                height={100}
                alt="user name"
                className=" object-cover rounded-full h-12 w-122"
              />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Orders</DropdownMenuItem>
            <Link href={dashboardPath}>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button onClick={handleLogin} size={"sm"}>
            Login
          </Button>
        </>
      )}
    </>
  );
};
export default UserMenu;
