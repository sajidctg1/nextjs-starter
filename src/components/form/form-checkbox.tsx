import { useFormContext } from "react-hook-form";

import { cn } from "~/lib/utils";

import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface Props<T extends Record<string, any>> {
  name: keyof T;
  label?: string;
  desc?: string;
  className?: string;
  disabled?: boolean;
}

export const FormCheckbox = <T extends Record<string, any>>({
  name,
  label,
  desc,
  className,
  disabled,
}: Props<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name.toString()}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4 shadow",
            className
          )}
        >
          <FormControl>
            <Checkbox
              disabled={disabled}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {desc && <FormDescription>{desc}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
