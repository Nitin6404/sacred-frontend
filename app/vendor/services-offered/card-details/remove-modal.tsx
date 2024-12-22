"use client";

import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Loader2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRemoveOfferMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useVendorSearchStore } from "@/app/context/vendor-search-context";

interface ServiceTypeRemoveModalProps {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceTypeRemoveModal = (props: ServiceTypeRemoveModalProps) => {
  const { mutateAsync: removeAsync, isPending, isError } = useRemoveOfferMutation();
  const { data: searchData, setData } = useVendorSearchStore();
  const { vendor, setVendor } = useUserStore();
  const router = useRouter();

  const submit = useCallback(async () => {
    if (!vendor?.tokens.accessToken) {
      throw new Error("No access token found");
    }
    const dataLength = searchData.length - 1;
    try {
      await removeAsync({ accessToken: vendor.tokens.accessToken, data: { id: props.id } });
      setData(
        searchData.filter((item: any) => item.id !== props.id),
        dataLength - 1
      );
      toast({ variant: "default", description: "Service package removed successfully" });
      props.setOpen(false);
    } catch (err: any) {
      const desc: string = err.message || err.error || "Error removing service package";
      if (desc.includes("token expired") || desc.includes("No access token found")) {
        setVendor(null);
        router.push;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger
        className="flex h-fit items-center justify-center rounded-full bg-primary p-2 text-white shadow-xl"
        title="Remove"
        onClick={() => props.setOpen(true)}
      >
        <DeleteIcon className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this service package from your profile.
          </DialogDescription>
          <DialogFooter className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button variant="secondary" className="font-semibold shadow-lg" disabled={isPending}>
                No, keep
              </Button>
            </DialogClose>
            <Button variant="default" className="font-semibold shadow-lg" disabled={isPending} onClick={submit}>
              {isPending && !isError && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Yes, remove</span>
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceTypeRemoveModal;
