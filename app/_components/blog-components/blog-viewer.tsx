"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlogByIdMutation } from "@/components/api";
import { Blog } from "@/types";
import { toast } from "@/components/ui/use-toast";
import BlogWrapper from "./blog-wrapper";

export default function BlogViewer({ slug, userFacing }: { slug: string; userFacing?: boolean }) {
  const [post, setPost] = useState<Blog | null>(null);
  const { mutate: getFn, isIdle, isPending, isError } = useGetBlogByIdMutation();

  useEffect(() => {
    try {
      if (!slug) {
        toast({ title: "Error", variant: "destructive", description: "No blog slug found" });
        throw new Error("No blog slug found");
        // router.back();
      }
      getFn(
        { slug },
        {
          onSuccess: async (data) => setPost(data.data),
          onError: (error) => {
            throw error;
          }
        }
      );
    } catch (err: any) {
      const msg = err.error || err.message || "An error occurred";
      // console.log("error message --> ", msg);
      toast({ title: "Error fetching blog", variant: "destructive", description: msg });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (isIdle || isPending) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        <Skeleton className="mx-auto h-8 w-3/4" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!post) return <></>;

  return <BlogWrapper blog={post} userFacing={userFacing} />;
}
