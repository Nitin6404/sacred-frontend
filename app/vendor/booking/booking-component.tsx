"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarIcon, Loader2, MessageSquare } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useUserStore } from "@/app/context/user-context";
import { useGetAllVendorBookingsMutation, useUpdateBookingStatusMutation } from "@/components/api";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Booking, BookingStatus } from "@/types/user-facing";
import React from "react";
import { cn } from "@/lib/utils";
import { useVendorContext } from "@/app/context/vendor-context";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatString } from "@/app/utils/functions";
import { checkToken, checkValidToken } from "@/app/_components/functions";
import { useRouter } from "next/navigation";
import { bookingStatus, bookingStatusOptions } from "@/constants/data";

const pageSize = 9;
const BookingComponent = () => {
  const router = useRouter();
  const { vendor, setVendor } = useUserStore();
  const { bookings, setBookings } = useVendorContext();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { mutate: getAllVendorBookingsFn, isPending, isError } = useGetAllVendorBookingsMutation();
  const { mutate: updateBookingStatusFn, isPending: bsPending, isError: bsError } = useUpdateBookingStatusMutation();
  const [bookingState, setBookingState] = useState<BookingStatus>(BookingStatus.confirmed);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState<bookingStatus | "">("");

  useEffect(() => {
    try {
      if (!vendor) return;
      getAllVendorBookingsFn(
        { accessToken: vendor?.tokens.accessToken, page, pageSize, status },
        {
          onSuccess: (data) => {
            setTotalCount(data.data.count);
            setBookings(data.data.rows as Booking[]);
          },
          onError: (error) => {
            throw error;
          }
        }
      );
    } catch (err: any) {
      const desc = err.error || err.message;
      if (!desc) return;
      toast({ title: "Error", description: desc, variant: "destructive" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor, page, status]);

  const handleFeedback = (booking: any) => {
    setSelectedBooking(booking);
  };

  const submitFeedback = (e: any) => {
    e.preventDefault();
    try {
      checkToken(vendor, setVendor, router);
      updateBookingStatusFn(
        { accessToken: vendor?.tokens.accessToken || "", status: bookingState, id: selectedBooking?.id || -1 },
        {
          onSuccess() {
            toast({ title: "Success", description: "Feedback submitted successfully" });
            setBookings(
              bookings.map((b) => (b.id === selectedBooking?.id ? { ...b, status: bookingState as BookingStatus } : b))
            );
          },
          onError(error) {
            throw error;
          }
        }
      );
    } catch (err: any) {
      const desc = err.error || err.message;
      if (!desc) return;
      toast({ title: "Error", variant: "destructive", description: desc });
      checkValidToken(desc, setVendor, router);
    } finally {
      setSelectedBooking(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <Card key={booking.id} className="flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{booking.vendorName}</span>
                <span className="flex items-center text-sm font-normal text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {format(new Date(booking.bookingDate), "dd/MM/yyyy")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="mb-2 font-semibold">{booking.serviceOfferedDetails}</h3>
              <p className="text-sm text-muted-foreground">{booking.serviceOfferedDetails}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full border-2 border-primary bg-primary-foreground font-semibold text-primary shadow-md transition hover:bg-primary hover:text-white",
                      (booking.status === BookingStatus.pending || booking.status === BookingStatus.confirmed) &&
                        "border-transparent bg-orange-600 text-white hover:bg-orange-700",
                      booking.status === BookingStatus.completed &&
                        "border-green-600 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700",
                      booking.status === BookingStatus.cancelled &&
                        "border-transparent bg-red-600 text-white hover:bg-red-700 hover:text-white"
                    )}
                    onClick={() => handleFeedback(booking)}
                    disabled={
                      bsPending ||
                      booking?.status === BookingStatus.completed ||
                      booking?.status === BookingStatus.cancelled
                    }
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <>{formatString(booking?.status)}</>
                  </Button>
                </DialogTrigger>
                {selectedBooking && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Status Update</DialogTitle>
                      <DialogDescription>
                        Update the status of the booking for {selectedBooking.serviceOfferedDetails}
                      </DialogDescription>
                    </DialogHeader>
                    <Select
                      value={bookingState}
                      onValueChange={(value) => {
                        setBookingState(value as BookingStatus);
                      }}
                      defaultValue={BookingStatus.confirmed}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={BookingStatus.confirmed}>Confirm</SelectItem>
                          <SelectItem value={BookingStatus.completed}>Complete</SelectItem>
                          <SelectItem value={BookingStatus.cancelled}>Cancel</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <DialogFooter>
                      <Button type="submit" className={cn("font-semibold shadow-lg")} onClick={submitFeedback}>
                        {(isPending || bsPending) && !isError && !bsError && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Update Status
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalCount === 0 ? (
        <div className="my-8 flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">No Bookings Yet</h1>
          <p className="text-gray-500">You have no bookings yet</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-col flex-wrap items-center justify-end gap-4 md:flex-row">
        <div className="w-48">
          <Select onValueChange={(value) => setStatus(value as bookingStatus)}>
            <SelectTrigger>
              <SelectValue>{formatString(status) || "Select Status"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {bookingStatusOptions.map((bookingStatus) => (
                <SelectItem value={bookingStatus} key={bookingStatus}>
                  {formatString(bookingStatus)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <section className="flex items-center justify-between gap-4">
          <Button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1} className="flex-center">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Button>

          <div>
            Showing&nbsp;
            <span className="font-semibold">{bookings.length}</span>
            &nbsp;of&nbsp;
            <span className="font-semibold">{totalCount}</span>
            &nbsp;bookings
          </div>

          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page * pageSize >= totalCount}
            className="flex-center"
          >
            <ArrowRight className="h-6 w-6 text-white" />
          </Button>
        </section>
      </div>
    </div>
  );
};

export default BookingComponent;
