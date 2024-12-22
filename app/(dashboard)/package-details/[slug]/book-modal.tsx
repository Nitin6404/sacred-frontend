"use client";

import { useUserStore } from "@/app/context/user-context";
import { useCreateBookingMutation } from "@/components/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface BookModalProps {
  phoneNo: string;
  email: string;
  vendorId: string;
  packageId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BookModal(props: BookModalProps) {
  const { user } = useUserStore();
  const { mutate: bookFn, isPending, isError } = useCreateBookingMutation();
  const router = useRouter();
  const handleBooking = useCallback(() => {
    try {
      if (!user) throw new Error("You have to login first to book a package");
      bookFn(
        {
          vendorId: props.vendorId,
          serviceOfferedId: props.packageId,
          accessToken: user.tokens.accessToken,
          bookingDate: new Date().toISOString()
        },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Booking successful" });
            router.push("/booking");
          },
          onError: (error) => {
            throw error;
          }
        }
      );
    } catch (err: any) {
      const desc = err.error || err.message;
      if (!desc) return;
      toast({ title: "Error booking package", description: desc, variant: "destructive" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog onOpenChange={props.setIsOpen} open={props.isOpen}>
      <DialogTrigger asChild>
        <Button className="h-fit text-lg font-semibold shadow-lg">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4 sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogDescription className="font-semibold">
            <section className="flex items-center gap-2">
              <Mail className="mr-2" /> {props.email || "No email found"}
            </section>
            <section className="flex items-center gap-2">
              <Phone className="mr-2" />{" "}
              {props.phoneNo
                ? user
                  ? props.phoneNo
                  : `${Array(8).map(() => "*")}${(props.phoneNo as string).substring(8, 10)}`
                : "No phone number found"}
            </section>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="ml-auto mr-2 font-semibold shadow-lg "
            disabled={isPending}
            onClick={() => props.setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleBooking}
            disabled={!user || isPending}
            className={cn("font-semibold shadow-lg", !user ? "pointer-events-none cursor-not-allowed" : "")}
          >
            {isPending && !isError && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!user ? "Please login first" : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
