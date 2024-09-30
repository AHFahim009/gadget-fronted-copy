import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";

type TProps = {
  isAlertOn: boolean;
  setIsAlertOn: Dispatch<SetStateAction<boolean>>;
  id: string;
  children: ReactNode;
};

export function AlertDialogBox({
  isAlertOn,
  setIsAlertOn,
  id,
  children,
}: TProps) {
  console.log(id);

  return (
    <AlertDialog open={isAlertOn} onOpenChange={setIsAlertOn}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {children}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
