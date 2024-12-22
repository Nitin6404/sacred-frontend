import { useUserStore } from "@/app/context/user-context";
import { useUpdateBlogsMutation } from "@/components/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface UpdateBlogProps {
  data: any;
  maxHeadingLength: React.MutableRefObject<number>;
  disabled?: boolean;
}

const UpdateBlog = (props: UpdateBlogProps) => {
  const { super_admin } = useUserStore();
  const { mutateAsync: updateBlogAsync, isPending, isError } = useUpdateBlogsMutation();
  const router = useRouter();

  const updateBlog = async () => {
    try {
      const err = [];
      if (props.data.title === "") err.push("Heading cannot be empty");
      if (!props.data.content) err.push("Content cannot be empty");
      if (props.data.title.length > props.maxHeadingLength.current)
        err.push(`Heading cannot be more than ${props.maxHeadingLength.current} characters`);
      if (err.length > 0) throw new Error(err.join("\n"));
      if (!super_admin || (super_admin?.tokens?.accessToken || "").length === 0)
        throw new Error("Please login as admin");

      await updateBlogAsync({
        accessToken: super_admin.tokens.accessToken,
        data: props.data
      });
      toast({ title: "Success", description: "Blog saved successfully" });
    } catch (err: any) {
      const msg: string = err.error || err.message || "An error occurred";
      toast({ title: "Error", description: err.message, variant: "destructive" });
      if (msg.includes("Please login as admin") || msg.includes("token expired")) {
        router.push("/admin/login");
      }
    }
  };

  return (
    <Button
      className="absolute bottom-2 right-2 z-50 flex h-fit w-fit items-center justify-center gap-2 px-4 py-3 text-lg font-semibold text-white shadow-lg sm:bottom-4 sm:right-4 sm:text-xl xl:bottom-8 xl:right-8"
      onClick={updateBlog}
      disabled={isPending || props.disabled}
    >
      {isPending && !isError ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save size={24} />}
      <span>{isPending ? "Updating" : "Update"}</span>
    </Button>
  );
};

export default UpdateBlog;
