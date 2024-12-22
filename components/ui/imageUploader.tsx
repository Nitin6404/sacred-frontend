"use client";

import { uploadToCloudinaryUtil } from "@/app/_components/functions";
import { Input, InputProps } from "./input";
import { ChangeEvent, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ErrorBoundary } from "../errorBoundary";

export type FormImageUploaderProps = InputProps & {
  value?: string;
  defaultValue?: string;
  setFormValue?: (value: string) => void;
};

function ImageUploader(props: FormImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [imageRemoteUrl, setImageRemoteUrl] = useState<string>(props.value || props.defaultValue || "");

  const uploadToCloudinary = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const remoteUrl = await uploadToCloudinaryUtil(file);
      setImageRemoteUrl(() => remoteUrl);
      props.setFormValue?.(remoteUrl);
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("imageRemoteUrl", imageRemoteUrl, imageRemoteUrl.length);
  // }, [imageRemoteUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <div className="">Uploading . . .</div>
      ) : imageRemoteUrl.length > 0 ? (
        <ErrorBoundary fallback={<>this is the fallback</>}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="max-h-44" src={imageRemoteUrl} alt="Input image" />
        </ErrorBoundary>
      ) : null}

      <Input type="hidden" {...props} value={imageRemoteUrl} />

      <Input
        type="file"
        disabled={loading}
        onChange={uploadToCloudinary}
        className={twMerge("flex-grow", props.className)}
      />
    </div>
  );
}

export const FormImageUploader = forwardRef(ImageUploader);
