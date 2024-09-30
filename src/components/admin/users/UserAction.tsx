import { TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  LockKeyhole,
  MoreHorizontal,
  Trash2,
  UserRoundCheck,
} from "lucide-react";
import { useUpdateUserRoleMutation } from "@/redux/api/endpoints/auth.api";
import handleResponse from "@/helpers/handleResponse";
import { toast } from "sonner";
import { useState } from "react";
import UserDeleteConfirmation from "./UserDeleteConfirmation";

export enum Role {
  Admin = "admin",
  User = "user",
}

const UserAction = ({ userId }: { userId: string }) => {
  const [isAlertOn, setIsAlertOn] = useState(false);

  const [updateUser] = useUpdateUserRoleMutation();
  const handleUpdateUserRole = async (role: Role) => {
    console.log(role);

    try {
      const res = await updateUser({ userId: userId, role: role });
      console.log(res);

      const result = handleResponse(res);
      if (result) {
        toast.message(res.data.message);
      }
    } catch (error) {
      console.log("userAction", error);
    }
  };
  const handleDeleteUser = () => {
    setIsAlertOn(true);
  };

  return (
    <TableCell>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleUpdateUserRole(Role.User)}>
              <UserRoundCheck className="mr-2 h-4 w-4" /> User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdateUserRole(Role.Admin)}>
              <LockKeyhole className="mr-2 h-4 w-4" /> Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={handleDeleteUser}>
          <Trash2 className="h-4 w-4" />
        </Button>
        {isAlertOn && (
          <UserDeleteConfirmation
            isAlertOn={isAlertOn}
            setIsAlertOn={setIsAlertOn}
            id={userId}
          />
        )}
      </div>
    </TableCell>
  );
};

export default UserAction;
