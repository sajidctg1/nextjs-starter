import { useFormContext } from "react-hook-form";

import { cn } from "~/lib/utils";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";

interface Props<T extends Record<string, any>> {
  name: keyof T;
  label?: string;
  desc?: string;
  className?: string;
  disabled?: boolean;
}

export const FormSwitch = <T extends Record<string, any>>({
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
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",
            className
          )}
        >
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            {desc && <FormDescription>{desc}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              disabled={disabled}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
