import { useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

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
  options: Array<{ label: string; value: any }>;
  label?: string;
  placeholder?: string;
  desc?: string;
  className?: string;
  disabled?: boolean;
}

export const FormSelect = <T extends Record<string, any>>({
  name,
  options,
  label,
  placeholder: _placeholder,
  desc,
  className,
  disabled,
}: Props<T>) => {
  const { control } = useFormContext();
  const placeholder =
    (_placeholder ?? label) ? "Select " + label : "Select " + name.toString();

  return (
    <FormField
      control={control}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="capitalize">
            {label ?? name.toString()}
          </FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="capitalize"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
