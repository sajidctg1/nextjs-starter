"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { useFont } from "~/hooks/use-font";
import { cn } from "~/lib/utils";

import {
  type UpdateAppearancePayload,
  updateAppearanceSchema,
} from "../schemas";

const fontList = [
  // { name: "Geist", className: "font-geist-sans" },
  // { name: "Geist Mono", className: "font-geist-mono" },
  { name: "Roboto", className: "font-roboto" },
  { name: "Libre Franklin", className: "font-libre-franklin" },
] as const;

export const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();

  const form = useForm<UpdateAppearancePayload>({
    resolver: zodResolver(updateAppearanceSchema),
    defaultValues: { theme, font },
  });

  function onSubmit(data: UpdateAppearancePayload) {
    if (theme !== data.theme) setTheme(data.theme);
    setFont(data.font);
  }

  useEffect(() => {
    if (!theme || !font) return;
    form.setValue("theme", theme);
    form.setValue("font", font);
  }, [theme, font]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <GenericForm {...form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="font"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={font}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {fontList.map((item) => (
                        <SelectItem key={item.className} value={item.className}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Theme</FormLabel>
                <FormDescription>
                  Select the theme for the dashboard.
                </FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={theme}
                  className="grid max-w-md grid-cols-2 gap-8 pt-2"
                >
                  <FormItem>
                    <FormLabel>
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only" />
                      </FormControl>
                      <div
                        className={cn(
                          "cursor-pointer rounded-md border-2 p-1 hover:bg-gray-300",
                          form.getValues("theme") === "light" &&
                            "border-primary"
                        )}
                      >
                        <div className="space-y-2 rounded-sm bg-gray-300 p-2">
                          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-2 w-20 rounded-lg bg-gray-500" />
                            <div className="h-2 w-24 rounded-lg bg-gray-500" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="size-4 rounded-full bg-gray-500" />
                            <div className="h-2 w-24 rounded-lg bg-gray-500" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="size-4 rounded-full bg-gray-500" />
                            <div className="h-2 w-24 rounded-lg bg-gray-500" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        Light
                      </span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel>
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <div
                        className={cn(
                          "cursor-pointer rounded-md border-2 p-1 hover:bg-slate-950",
                          form.getValues("theme") === "dark" && "border-primary"
                        )}
                      >
                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-2 w-20 rounded-lg bg-slate-400" />
                            <div className="h-2 w-24 rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="size-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-24 rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="size-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-24 rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        Dark
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <Button disabled={!form.formState.isDirty} type="submit">
            Update preferences
          </Button>
        </GenericForm>
      </CardContent>
    </Card>
  );
};
