"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import LoginForm from "@/components/Login/LoginForm";
import { usePathname } from "next/navigation";
import useLoginStore from "@/hooks/useLoginStore";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = usePathname();
  const { isModalOpen } = useLoginStore();
  const isRegisterPage = router === "/register";

  return (
    <>
      {!isRegisterPage && <Navbar />}
      {isModalOpen && <LoginForm />}
      {children}

      {!isRegisterPage && <Footer />}
    </>
  );
};

export default ClientWrapper;
