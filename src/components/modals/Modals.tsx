/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface IModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isModalOpen: boolean;
  closeModal: any;
  className?: string;
}

export function Modal({
  title,
  description,
  children,
  isModalOpen,
  closeModal,
  className,
}: IModalProps) {
  const handleModalClose = useCallback(() => {
    closeModal();
  }, [closeModal]);
  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent
        className={cn(
          "sm:max-w-[425px] max-h-screen overflow-y-auto",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
