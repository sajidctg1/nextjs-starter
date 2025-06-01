"use client";

import { CloudUpload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "~/components/ui/file-upload";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  label?: string;
  onError?: (err: string) => void;
  desc?: string;
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export const FormUpload = <T extends Record<string, unknown>>({
  name,
  label,
  onError,
  desc,
  className,
  multiple,
  disabled,
}: Props<T>) => {
  const { control } = useFormContext();

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
            <FileUpload
              value={multiple ? field.value : [field.value]}
              onValueChange={field.onChange}
              accept="image/*"
              maxFiles={2}
              maxSize={5 * 1024 * 1024}
              onFileReject={(_, message) => onError?.(message)}
              multiple={multiple}
              disabled={disabled}
            >
              <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                <CloudUpload className="size-4" />
                Drag and drop or
                <FileUploadTrigger asChild>
                  <Button variant="link" size="sm" className="p-0">
                    choose files
                  </Button>
                </FileUploadTrigger>
                to upload
              </FileUploadDropzone>
              <FileUploadList>
                {multiple && field.value.length ? (
                  // @ts-expect-error
                  field.value.map((file, index) => (
                    <FileUploadItem key={index} value={file}>
                      <FileUploadItemPreview />
                      <FileUploadItemMetadata />
                      <FileUploadItemDelete asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <X />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </FileUploadItemDelete>
                    </FileUploadItem>
                  ))
                ) : (
                  <FileUploadItem value={field.value}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <X />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                )}
              </FileUploadList>
            </FileUpload>
          </FormControl>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
