/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnyZodObject } from "zod";
import { cn } from "@/lib/utils";
type TFormProps = {
  children: ReactNode;
  onFormSubmit: any;
  defaultValues?: Record<string, any>;
  schema?: AnyZodObject;
  className?: string;
};

export default function UseForm({
  onFormSubmit,
  children,
  schema,
  defaultValues,
  className,
}: TFormProps) {
  const customMethods: Record<string, any> = {};
  if (schema) {
    customMethods["resolver"] = zodResolver(schema);
  }
  if (defaultValues) {
    customMethods["defaultValues"] = defaultValues;
  }

  const formMethods = useForm<FieldValues>({
    ...customMethods,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onFormSubmit(data);
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        {children}
      </form>
    </Form>
  );
}
