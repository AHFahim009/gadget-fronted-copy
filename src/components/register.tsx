"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import UseForm from "./useForm/UseForm";
import { UseInputField } from "./useForm/UseInputField";
import { useCreateUserMutation } from "@/redux/api/endpoints/auth.api";
import { FieldValues } from "react-hook-form";
import createFormData from "@/helpers/createFormData";
import handleResponse from "@/helpers/handleResponse";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { addUser } from "@/redux/slices/user.slice";
import { toast } from "sonner";
import { UseFileUpload } from "./useForm/UseFileUpload";
import useLoginStore from "@/hooks/useLoginStore";
import LoginForm from "./Login/LoginForm";

export default function RegisterPage() {
  const [createUser] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { openModal, isModalOpen } = useLoginStore();

  const handleLoginForm = () => {
    console.log(isModalOpen);

    console.log("clicked");

    openModal();
  };

  const handleRegisterForm = async (formPayload: FieldValues) => {
    const { photo, ...data } = formPayload;

    const formData = createFormData({ photo: photo, data: data });

    try {
      const res = await createUser(formData);
      const result = handleResponse(res);
      if (result) {
        // doSaveAccessToken(result.accessToken);
        // const user = decodeToken({ token: result.accessToken });
        dispatch(addUser(result.data));
        route.push("/");
        toast.message(result.message);
      }
    } catch (error) {
      console.log("registerPage", error);
    }
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <ShoppingCart className="mr-2 h-6 w-6" />
          Your Company
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has transformed the way we handle our
              business operations. It`&apos;`s intuitive, efficient, and
              incredibly powerful.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <UseForm onFormSubmit={handleRegisterForm} className="space-y-3">
            <UseInputField
              name="name"
              label="Name"
              placeholder="Write you name"
            />
            <UseInputField
              name="email"
              label="Email"
              placeholder="name@gmail.com"
            />
            <UseInputField
              name="password"
              label="Password"
              placeholder="Write you password"
            />
            <UseFileUpload name="photo" label="Upload you photo" />

            <Button className="w-full">Sign Up</Button>
          </UseForm>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <span
              onClick={handleLoginForm}
              className="underline underline-offset-4 hover:text-primary cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      {isModalOpen && <LoginForm />}
    </div>
  );
}
