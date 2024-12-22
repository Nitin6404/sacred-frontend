"use client";

import { ImageProps } from "next/image";
import { useState } from "react";
import { ErrorBoundary } from "@/components/errorBoundary";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { Cross2Icon } from "@radix-ui/react-icons";

type CustomImageProps = ImageProps & {
  fallbackImage?: string;
  fallbackStyle?: string;
  fallbackClassName?: string;
};

const imageMatchRegex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp|tiff)/;

function CustomImageComponent({
  fallbackStyle,
  fallbackClassName,
  fallbackImage = "/favicon.png",
  ...props
}: CustomImageProps) {
  const defaultImage = (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    <img {...props} src={fallbackImage} className={fallbackClassName || "mx-5 my-auto h-48 w-48 opacity-50"} />
  );

  if (!props.src || !imageMatchRegex.test(props.src as string)) return defaultImage;
  return (
    <ErrorBoundary fallback={defaultImage}>
      {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
      <img
        {...props}
        src={props.src as string}
        onError={(e: any) => {
          e.target.src = fallbackImage;
          e.target.style = fallbackStyle
            ? fallbackStyle
            : "height: 200px; width: 200px; margin: 20px auto 0px auto; opacity:0.5;";
        }}
      />
    </ErrorBoundary>
  );
}

export function CustomImage({
  enlargeImage,
  onOpenEnlargedImage,
  onCloseEnlargedImage,
  ...props
}: CustomImageProps & { enlargeImage?: boolean; onCloseEnlargedImage?: () => void; onOpenEnlargedImage?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CustomImageComponent
        {...props}
        onClick={() => {
          if (!enlargeImage) return;
          setOpen(true);
          if (onOpenEnlargedImage) onOpenEnlargedImage();
        }}
        className={cn(enlargeImage ? "cursor-pointer" : "", props.className)}
      />

      {enlargeImage && open
        ? createPortal(
            <div className="fixed left-0 top-0 h-screen w-screen justify-center overflow-hidden p-4">
              <div
                onClick={() => {
                  setOpen(false);
                  if (onCloseEnlargedImage) onCloseEnlargedImage();
                }}
                className="absolute left-0 top-0 z-0 h-screen w-screen cursor-pointer bg-black bg-opacity-25"
              />

              <div
                onClick={() => {
                  setOpen(false);
                  if (onCloseEnlargedImage) onCloseEnlargedImage();
                }}
                className="absolute left-2 top-2 z-30 ml-[50vw] -translate-x-[51%] cursor-pointer rounded-full bg-primary p-2 ring-2"
              >
                <Cross2Icon className="h-8 w-8 text-white" />
              </div>

              <CustomImageComponent
                {...props}
                className="z-10 ml-[50vw] h-[calc(100vh-40px)] w-auto -translate-x-[51%] object-contain"
              />
            </div>,
            document.body
          )
        : null}
    </>
  );
}
