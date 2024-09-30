"use client";
import { FieldValues } from "react-hook-form";
import { Modal } from "../modals/Modals";
import { Button } from "../ui/button";
import UseForm from "../useForm/UseForm";
import { UseInputField } from "../useForm/UseInputField";
import { UsePasswordInput } from "../useForm/UsePasswordInput";
import useLoginStore from "@/hooks/useLoginStore";
import Divider from "@/helpers/Divider";
import { useLoginUserMutation } from "@/redux/api/endpoints/auth.api";
import handleResponse from "@/helpers/handleResponse";
import { useAppDispatch } from "@/redux/hooks";
import { addUser } from "@/redux/slices/user.slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { closeModal, isModalOpen } = useLoginStore();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLoginForm = async (formPayload: FieldValues) => {
    try {
      const res = await loginUser(formPayload);
      console.log(res);

      const result = handleResponse(res);
      if (result) {
        // doSaveAccessToken(result.accessToken);
        dispatch(addUser(result.data));
        closeModal();
        router.push("/");
        toast.message(result.message);
      }
    } catch (error) {
      console.log("loginForm", error);
    }
  };
  const handleGotoRegistration = () => {
    closeModal();
    router.push("/register");
  };
  return (
    <Modal
      key={"loginModel"}
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      title="Login"
      description="Enter your credentials to access your account."
    >
      <UseForm
        onFormSubmit={handleLoginForm}
        defaultValues={{
          email: "admin@gmail.com",
          password: "admin12345",
        }}
      >
        <UseInputField
          key={"email"}
          name="email"
          placeholder="Enter your name"
          label="Email"
          type="text"
        />
        <UsePasswordInput
          key={"password"}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
        {isLoading ? (
          "loading"
        ) : (
          <Button type="submit" className="w-full">
            Login
          </Button>
        )}
      </UseForm>
      <Divider />

      <div className="text-center text-sm ">
        <span className="text-muted-foreground">New to our platform? </span>
        <span
          onClick={handleGotoRegistration}
          className="text-primary hover:underline cursor-pointer"
        >
          Create an account
        </span>
      </div>
    </Modal>
  );
};

export default LoginForm;
