"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function FileUpload({ value, onChange, accept, multiple = false }: FileUploadProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData
          });

          if (!response.ok) throw new Error("Upload failed");
          const data = await response.json();
          return data.url;
        });

        const urls = await Promise.all(uploadPromises);
        if (multiple) {
          onChange(Array.isArray(value) ? [...value, ...urls] : urls);
        } else {
          onChange(urls[0]);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    },
    [multiple, onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    multiple
  });

  const renderPreview = () => {
    if (!value) return null;

    if (multiple && Array.isArray(value)) {
      return (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((url, index) => (
            <div key={index} className="relative h-20 w-20">
              <Image src={url} alt={`Preview ${index + 1}`} fill className="rounded-md object-cover" />
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "string" && value) {
      return (
        <div className="relative mt-2 h-20 w-20">
          <Image src={value} alt="Preview" fill className="rounded-md object-cover" />
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          {isDragActive ? "Drop the files here..." : "Drag & drop files here, or click to select"}
        </p>
      </div>
      {renderPreview()}
    </div>
  );
}
