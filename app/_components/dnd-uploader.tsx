"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { IoClose } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { useCreateAlbumInBulkMutation } from "@/components/api";
import { useUserStore } from "../context/user-context";
import { useVendorContext } from "../context/vendor-context";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export type FileWithPreview = File & { preview: string };

export default function DndUploader() {
  const { vendor, setVendor } = useUserStore();
  const { setAlbum, album } = useVendorContext();
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const { mutateAsync: createAlbumAsync } = useCreateAlbumInBulkMutation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "image/*": [] }
  });

  const uploadToCloudinary = async () => {
    try {
      const promiseArr = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        if (!res.ok) throw new Error("Failed to upload file");
        const data = await res.json();
        return data.secure_url as string;
      });
      const remoteUrls = await Promise.all(promiseArr);
      toast({ title: "Success", variant: "default", description: "Files uploaded successfully" });
      return remoteUrls;
    } catch (err: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: err.error || err.message || "Failed to upload files"
      });
      throw err;
    }
  };

  const onSubmit = async () => {
    try {
      if (!vendor?.tokens.accessToken) throw new Error("No access token found");
      setUploading(true);
      const urls = await uploadToCloudinary();
      const data = await createAlbumAsync({
        accessToken: vendor.tokens.accessToken,
        data: { urls }
      });

      toast({ title: "Success", description: data.message, variant: "default" });
      setFiles([]);
      setAlbum([...album, ...data.data]);
    } catch (err: any) {
      const msg = err.error || err.message || "Failed to upload files";
      toast({
        title: "Error",
        description: msg,
        variant: "destructive"
      });
      if (msg.includes("No access token found") || msg.includes("token expired")) {
        setVendor(null);
        router.push("/login");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto py-4">
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-8 text-center font-semibold text-muted-foreground",
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Selected Files:</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 2xl:grid-cols-6">
            {files.map((file) => (
              <div key={file.name} className="relative">
                {file.type.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={file.preview} alt={file.name} className="h-28 w-full rounded-lg object-cover" />
                ) : (
                  <video src={file.preview} className="h-40 w-full rounded-lg object-cover" />
                )}
                <p className="mt-2 truncate text-sm">{file.name}</p>
                {/* {uploadProgress[file.name] !== undefined && (
                  <Progress value={uploadProgress[file.name]} className="mt-2" />
                )}
                {uploadStatus[file.name] && (
                  <div
                    className={`absolute bottom-2 right-2 rounded-full p-1 ${
                      uploadStatus[file.name] === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {uploadStatus[file.name] === "success" ? "✓" : "✗"}
                  </div>
                )} */}
                <Button
                  size="sm"
                  className="absolute right-2 top-2 h-fit w-fit rounded-full p-2"
                  type="button"
                  onClick={() => {
                    setFiles(files.filter((f) => f.name !== file.name));
                  }}
                >
                  <IoClose className="h-4 w-4 font-semibold shadow-lg" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <>
          <Button onClick={onSubmit} disabled={uploading} className="mt-4 font-semibold shadow-lg " type="button">
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload
          </Button>

          <Separator className="mb-4 mt-6" />
        </>
      )}
    </div>
  );
}
