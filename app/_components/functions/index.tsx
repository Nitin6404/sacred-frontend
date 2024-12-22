"use client";

import { toast } from "@/components/ui/use-toast";

export const checkToken = (profileObj: any, setProfile: (val: any) => void, router: any) => {
  try {
    if (!profileObj?.tokens?.accessToken) throw new Error("No access token found");
  } catch (err: any) {
    toast({ title: "Error", description: err.error || err.message || "Something went wrong", variant: "destructive" });
    setProfile(null);
    router.push("/login");
  }
};

export const checkValidToken = (msg: string, setProfile: (val: any) => void, router: any) => {
  try {
    if (msg.includes("token expired") || msg.includes("No access token found")) {
      setProfile(null);
      router.push("/login");
    }
  } catch (err: any) {
    setProfile(null);
    router.push("/login");
  }
};

export const uploadToCloudinaryUtil = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url as string;
  } catch (err) {
    // console.error(err);
    throw err;
  }
};
