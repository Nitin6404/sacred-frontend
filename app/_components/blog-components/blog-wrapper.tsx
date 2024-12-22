"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { RichTextInput } from "../rich-text-input";
import { cn } from "@/lib/utils";
import SaveBlog from "../../admin/(blog-wrapper)/blogs/components/save-blog";
import UpdateBlog from "../../admin/(blog-wrapper)/blogs/components/update-blog";
import { Blog } from "@/types";
import ImageUploader2 from "../image-uploader-2";
import { toast } from "@/components/ui/use-toast";
import BlogMultiSelect from "./blog-multi-select";
import { Option } from "@/components/ui/multiselect";
import { useUserStore } from "@/app/context/user-context";
import { useGetAllCategoriesMutation } from "@/components/api";
import { useRouter } from "next/navigation";

interface BlogWrapperProps {
  blog?: Blog;
  userFacing?: boolean;
}

const headingClasses = cn(
  "h-fit w-full border-none !p-2 text-xl font-semibold text-gray-600 shadow-none outline-0 placeholder:text-gray-400 placeholder:drop-shadow-sm sm:text-2xl lg:text-3xl 2xl:text-4xl",
  "focus-visible:ring-0",
  "disabled:text-muted-foreground flex-1"
);

const BlogWrapper = ({ blog, userFacing }: BlogWrapperProps) => {
  const router = useRouter();
  const maxHeadingLength = useRef(35);
  const { super_admin } = useUserStore();
  const [heading, setHeading] = React.useState(blog?.title || "");
  const [content, setContent] = React.useState<any>(blog?.content || []);
  const [thumbnail, setThumbnail] = React.useState<string | null>(blog?.thumbnail || null);
  const [bgImage, setBgImage] = React.useState<string | null>(blog?.bgImage || null);
  const [assetUpload, setAssetUpload] = React.useState(false);
  const [allCategories, setAllCategories] = React.useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<Option[]>(
    (blog?.categories || []).map((cat: any) => ({ label: cat.category.name, value: `${cat.categoryId}` })) ||
      ([] as Option[])
  );
  const {
    mutateAsync: getAsync,
    isPending: catPending,
    isError: catError,
    isIdle: catIdle
  } = useGetAllCategoriesMutation();

  const getAllCategoriesFn = async () => {
    try {
      if (!super_admin?.tokens?.accessToken) throw new Error("No access token found");
      const data = await getAsync(super_admin?.tokens.accessToken || "");
      setAllCategories(((data.data || []) as any[]).map((cat) => ({ label: cat.name, value: `${cat.id}` })));
    } catch (err: any) {
      const msg: string = err.error || err.message || "An error occurred";
      toast({ title: "Error", description: err.message, variant: "destructive" });
      if (msg.includes("No access token found") || msg.includes("token expired")) {
        router.push("/admin/login");
      }
    }
  };

  useEffect(() => {
    if (userFacing) return;
    getAllCategoriesFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [super_admin?.tokens?.accessToken]);

  return (
    <section
      className={cn("mx-auto grid h-full max-w-[90vw] grid-cols-1 gap-1 sm:container sm:pb-4 lg:gap-8 2xl:gap-12 ")}
    >
      {!userFacing &&
        (blog ? (
          <UpdateBlog
            disabled={assetUpload}
            maxHeadingLength={maxHeadingLength}
            data={{
              content,
              bgImage,
              thumbnail,
              id: blog.id,
              title: heading,
              categoryIds: selectedCategories.map((cat) => parseInt(cat.value, 10))
            }}
          />
        ) : (
          <SaveBlog
            disabled={assetUpload}
            maxHeadingLength={maxHeadingLength}
            data={{
              content,
              bgImage,
              thumbnail,
              title: heading,
              categoryIds: selectedCategories.map((cat) => parseInt(cat.value, 10))
            }}
          />
        ))}

      <section className="space-y-2">
        <section className="lg:h-30 h-20 sm:h-24 xl:h-40 2xl:h-48">
          <ImageUploader2
            readonly={userFacing}
            defaultValue={bgImage || ""}
            onImageUpload={(url) => setBgImage(url)}
            updateParentState={(val) => setAssetUpload(val)}
            classes={["lg:h-30 h-20 sm:h-24 xl:h-40 2xl:h-48 w-full"]}
          />
        </section>

        <section className="flex items-center gap-2">
          <section className="h-36 w-48">
            <ImageUploader2
              readonly={userFacing}
              classes={["h-36 w-48"]}
              defaultValue={thumbnail || ""}
              onImageUpload={(url) => setThumbnail(url)}
              updateParentState={(val) => setAssetUpload(val)}
            />
          </section>

          <section className="flex-1">
            {userFacing ? (
              <span className={headingClasses}>{heading}</span>
            ) : (
              <>
                <Input
                  className={headingClasses}
                  placeholder="Enter title here ..."
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  contentEditable={!userFacing}
                />
                <span
                  className={cn(
                    "pl-2 text-sm font-semibold",
                    heading.length > maxHeadingLength.current ? "text-red-500" : "text-gray-400"
                  )}
                >
                  {maxHeadingLength.current - heading.length} letters left
                  {heading.length > maxHeadingLength.current && <> (max {maxHeadingLength.current} allowed)</>}
                </span>
              </>
            )}
          </section>
        </section>
      </section>

      <BlogMultiSelect
        userFacing={userFacing}
        allCategories={allCategories}
        categories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        loading={catIdle || catPending}
        error={catError}
      />

      <RichTextInput setContent={setContent} loadedContent={content} userFacing={userFacing} />
    </section>
  );
};

export default BlogWrapper;
