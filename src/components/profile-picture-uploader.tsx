"use client";

import { UploadIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { UploadThingError } from "uploadthing/server";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
} from "~/components/ui/file-upload";
import { uploadFiles } from "~/lib/uploadthing/utils";

interface Props {
  maxSize: number;
  onUpload?(fileUrls: string[]): void;
}

type OnProgress = { onProgress: (file: File, progress: number) => void };

export const ProfilePictureUploader = ({ maxSize, onUpload }: Props) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [file, setFile] = React.useState<File>();

  const handleUpload = React.useCallback(
    async (files: File[], { onProgress }: OnProgress) => {
      setIsUploading(true);
      try {
        const res = await uploadFiles("avatarUploader", {
          files,
          onUploadProgress: ({ file, progress }) => {
            onProgress(file, progress);
          },
        });
        console.log(res);
        onUpload?.(res.map((i) => i.ufsUrl));
      } catch (error) {
        if (error instanceof UploadThingError) {
          const errorMessage =
            error.data && "error" in error.data
              ? error.data.error
              : "Upload failed";
          toast.error(errorMessage);
          return;
        }
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (
    <FileUpload
      accept="image/*"
      maxFiles={1}
      maxSize={maxSize * 1024 * 1024}
      className={"w-full max-w-md border-none"}
      onAccept={(files) => setFile(files[0])}
      onUpload={handleUpload}
      onFileReject={onFileReject}
      disabled={isUploading}
    >
      {file ? (
        <FileUploadItem value={file} className="border-none p-0">
          <div className="relative size-[200px] shrink-0 grow overflow-hidden rounded-full">
            <FileUploadItemPreview className="size-[200px]" />
            <FileUploadItemProgress variant="fill" />
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <FileUploadItemMetadata />
          </div>
        </FileUploadItem>
      ) : (
        <FileUploadDropzone className="size-[200px] rounded-full">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <UploadIcon className="text-muted-foreground size-6" />
            </div>
            <p className="text-sm font-medium">Drag & drop images here</p>
            <p className="text-muted-foreground text-sm">
              Or click to browse <br />
              (up to {maxSize}MB)
            </p>
          </div>
        </FileUploadDropzone>
      )}
    </FileUpload>
  );
};
