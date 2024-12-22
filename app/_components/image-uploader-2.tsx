"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Camera, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadToCloudinaryUtil } from "./functions";
import { toast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  classes?: string[];
  onImageUpload?: (url: string) => void;
  updateParentState?: (val: boolean) => void;
  defaultValue?: string;
  readonly?: boolean;
}

export default function ImageUploader2(props: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      props.updateParentState?.(true);
      const remoteUrl = await uploadToCloudinaryUtil(file);
      setImage(() => remoteUrl);
      props.onImageUpload?.(remoteUrl);
    } catch (err: any) {
      // console.error("Error uploading image", err);
      toast({
        title: "Error",
        description: err.error || err.message || "Error uploading image",
        variant: "destructive"
      });
    } finally {
      props.updateParentState?.(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
    props.onImageUpload?.("");
  };

  const handleAreaClick = () => {
    if (props.readonly) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto h-full w-full">
      {(image || "").length > 0 || (props.defaultValue || "").length > 0 ? (
        <div className={cn("relative h-full")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image || props.defaultValue}
            alt="Uploaded image"
            className={cn("rounded-lg object-cover shadow-md", props.classes)}
          />
          {!props.readonly && (
            <Button
              variant="destructive"
              size="icon"
              className={cn(
                "absolute right-2 top-2 shadow-lg",
                "flex h-fit w-fit items-center justify-center rounded-full bg-primary p-2 text-white shadow-xl"
              )}
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          onClick={handleAreaClick}
          className="flex h-full cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-6 transition-colors hover:bg-gray-200"
          // style={{ aspectRatio: "16/9" }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={uploadToCloudinary}
            className="hidden"
            ref={fileInputRef}
            aria-label="Upload image"
          />
          <Camera className="h-12 w-12 text-gray-400" aria-hidden="true" />
          <span className="sr-only">Click to upload an image</span>
        </div>
      )}
    </div>
  );
}
