import { uploadToCloudinaryUtil } from "@/app/_components/functions";
import { toast } from "@/components/ui/use-toast";
import React, { RefObject } from "react";

const useImageUploader = () => {
  const [assetUpload, setAssetUpload] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const uploadFn = async (file: File) => {
    if (!file) return;
    try {
      setAssetUpload(true);
      const remoteUrl = await uploadToCloudinaryUtil(file);
      setImageUrl(() => remoteUrl);
    } catch (err: any) {
      console.error("Error uploading image", err);
      toast({
        title: "Error",
        description: err.error || err.message || "Error uploading image",
        variant: "destructive"
      });
    } finally {
      setAssetUpload(false);
    }
  };

  const handleRemoveImage = (fileInputRef?: RefObject<HTMLInputElement>) => {
    setImageUrl(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  };

  return { assetUpload, imageUrl, handleRemoveImage, uploadFn };
};

export default useImageUploader;
