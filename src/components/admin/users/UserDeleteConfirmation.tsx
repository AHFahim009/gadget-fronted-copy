import { AlertDialogBox } from "@/components/alertDialog/AlertDialog";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import handleResponse from "@/helpers/handleResponse";
import { useDeleteUserMutation } from "@/redux/api/endpoints/auth.api";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
type TProps = {
  isAlertOn: boolean;
  setIsAlertOn: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const UserDeleteConfirmation = ({ id, isAlertOn, setIsAlertOn }: TProps) => {
  const [userDelete] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    try {
      const res = userDelete(id);
      const result = handleResponse(res);
      if (result) {
        setIsAlertOn(false);
        toast.message(result.message);
      }
    } catch (error) {
      console.log("UserDeleteConfirmation", error);
    }
  };

  return (
    <AlertDialogBox
      key={id}
      id={id}
      isAlertOn={isAlertOn}
      setIsAlertOn={setIsAlertOn}
    >
      <AlertDialogAction onClick={handleDeleteUser}>Delete</AlertDialogAction>
    </AlertDialogBox>
  );
};
export default UserDeleteConfirmation;
