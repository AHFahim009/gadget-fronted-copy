import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type InputProps = {
  name: string;
  label: string;
  type?: "text" | "number";
  placeholder?: string;
};

export const UseTextArea = ({ name, label, placeholder }: InputProps) => {
  const formContext = useFormContext();
  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} placeholder={placeholder} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
