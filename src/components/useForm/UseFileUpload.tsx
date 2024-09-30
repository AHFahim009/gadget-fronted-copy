import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type InputProps = {
  name: string;
  label: string;
};

export const UseFileUpload = ({ name, label }: InputProps) => {
  const formContext = useFormContext();
  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
