import { type HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Textarea } from "../ui/textarea";
import { InputPassword } from "../ui-ext/input-password";

interface Props<T extends Record<string, any>> {
  name: keyof T;
  label?: string;
  type?: HTMLInputTypeAttribute | "otp" | "phone" | "textarea";
  placeholder?: string;
  desc?: string;
  className?: string;
  disabled?: boolean;
}

export const FormInput = <T extends Record<string, any>>({
  name,
  label,
  type = "text",
  placeholder: _placeholder,
  desc,
  className,
  disabled,
}: Props<T>) => {
  const { control } = useFormContext();
  const placeholder =
    (_placeholder ?? label) ? "Enter " + label : "Enter " + name.toString();

  return (
    <FormField
      control={control}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="capitalize">
            {label ?? name.toString()}
          </FormLabel>
          <FormControl>
            <div>
              {type === "password" && (
                <InputPassword
                  {...field}
                  disabled={disabled}
                  placeholder={placeholder}
                  type="password"
                />
              )}
              {type === "otp" && (
                <InputOTP {...field} disabled={disabled} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
              {type === "textarea" && (
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  disabled={disabled}
                  rows={4}
                />
              )}
              {type !== "password" && type !== "otp" && type !== "textarea" && (
                <Input
                  {...field}
                  disabled={disabled}
                  placeholder={placeholder}
                  type={type}
                />
              )}
            </div>
          </FormControl>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
