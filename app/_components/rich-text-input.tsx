"use client";

import { cn } from "@/lib/utils";

import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { ChangeEvent, FC, TextareaHTMLAttributes, useState } from "react";
import { uploadToCloudinaryUtil } from "./functions";
import { toast } from "@/components/ui/use-toast";

export type RichTextInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  Icon?: FC<any>;
  errorText?: string;
  labelClassName?: string;
  descriptionText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function RichTextInput({
  label,
  Icon,
  errorText,
  labelClassName,
  descriptionText,
  loadedContent,
  setContent,
  userFacing,
  ...props
}: RichTextInputProps & { loadedContent?: any[]; setContent?: React.Dispatch<any>; userFacing?: boolean }) {
  const [editorContent, setEditorContent] = useState<any>();

  const editor = useCreateBlockNote({
    ...(!!loadedContent && loadedContent.length > 0
      ? // initialContent: safeJsonParse(props.defaultValue as string, undefined, (res) => res.length > 0)
        { initialContent: loadedContent }
      : {}),
    uploadFile: async (file) => {
      try {
        const remoteUrl = await uploadToCloudinaryUtil(file);
        return remoteUrl;
      } catch (err: any) {
        toast({
          title: "Error uploading image",
          description: err.error || err.message || "Something went wrong",
          variant: "destructive"
        });
        return "";
      }
    }
  });

  editor.onChange((content) => {
    setEditorContent(content.document);
  });

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={props.name} className={cn("block text-sm font-medium leading-6 text-gray-900", labelClassName)}>
          {label}&nbsp;
          <span className="text-red-500">{props.required ? "*" : ""}</span>
        </label>
      ) : null}

      {errorText ? <p className="mt-1 text-sm text-red-500">{errorText}</p> : null}

      <div className="relative rounded-md shadow-sm">
        {Icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        ) : null}

        <input {...(props as any)} type="hidden" value={JSON.stringify(editorContent)} />
        <BlockNoteView
          {...(props as any)}
          theme="light"
          editor={editor}
          editable={!userFacing}
          itemType="input"
          onChange={() => {
            setContent && setContent(editor.document);
          }}
          id={props.name}
          className={cn(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ",
            !Icon ? "px-3" : "px-10",
            errorText ? "text-red-500 ring-1 ring-inset ring-red-300 placeholder:text-red-300" : "",
            props.className
          )}
        />
      </div>

      {descriptionText ? <p className="mt-1 text-sm text-gray-500">{descriptionText}</p> : null}
    </div>
  );
}
