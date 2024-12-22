"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarIcon, Loader2, MessageSquare } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useUserStore } from "@/app/context/user-context";
import { useCreateFeedbackMutation, useGetAllUserBookingsMutation } from "@/components/api";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useCustomerStore } from "@/app/context/user-store";
import { Booking, BookingStatus } from "@/types/user-facing";
import React from "react";
import { cn } from "@/lib/utils";
import { checkToken, checkValidToken } from "@/app/_components/functions";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { bookingStatus, bookingStatusOptions } from "@/constants/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatString } from "@/app/utils/functions";

const pageSize = 15;
const BookingNodesComponent = () => {
  const { user, setUser } = useUserStore();
  const { bookings, setBookings } = useCustomerStore();
  const router = useRouter();
  const [rating, setRating] = useState(4);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { mutate: getAllUserBookingsFn, isPending, isError } = useGetAllUserBookingsMutation();
  const { mutate: createFeedbackFn, isPending: fbPending, isError: fbError } = useCreateFeedbackMutation();
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const [totalBookingsCount, setTotalBookingsCount] = useState(0);
  const [status, setStatus] = useState<bookingStatus | "">("");

  useEffect(() => {
    try {
      if (!user) return;
      checkToken(user, setUser, router);
      getAllUserBookingsFn(
        { accessToken: user.tokens.accessToken, page, pageSize, status },
        {
          onSuccess: (data) => {
            setTotalBookingsCount(data.data.count);
            setBookings(data.data.rows as Booking[]);
          },
          onError: (err: any) => {
            setBookings([]);
            checkValidToken(err.error || err.message, setUser, router);
          }
        }
      );
    } catch (err: any) {
      setBookings([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page, status]);

  const handleFeedback = (booking: any) => {
    setSelectedBooking(booking);
  };

  const submitFeedback = (e: any) => {
    e.preventDefault();
    try {
      if (!user?.tokens.accessToken) throw new Error("User not logged in");
      createFeedbackFn(
        {
          accessToken: user.tokens.accessToken,
          data: { rating, feedback: comment, bookingId: selectedBooking?.id }
        },
        {
          onSuccess: (data) => toast({ title: "Success", description: "Feedback submitted successfully" }),
          onError(error) {
            throw error;
          }
        }
      );
    } catch (err: any) {
      const desc = err.error || err.message;
      if (!desc) return;
      toast({ title: "Error", description: err.error || err.message, variant: "destructive" });
    } finally {
      setComment("");
      setRating(4);
      setSelectedBooking(null);
    }
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <Card
            key={booking.id}
            // @ts-ignore
            onClick={() => router.push(`/package-details/${booking.serviceOfferedId}`)}
            className="flex cursor-pointer flex-col shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{booking.vendorName}</span>
                <span className="flex items-center text-sm font-normal text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {format(new Date(booking.bookingDate), "dd MMM yyyy")}
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
                    disabled={isPending || booking?.status === BookingStatus.completed}
                  >
                    {booking.status !== BookingStatus.completed ? (
                      booking.status
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Give Feedback
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                {selectedBooking && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Feedback for {selectedBooking.vendorName}</DialogTitle>
                      <DialogDescription>
                        Please rate your experience and provide any comments. Your ratings are viewed by the vendors.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitFeedback}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="rating" className="text-right">
                            Rating
                          </Label>
                          <div className="rating">
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              value={1}
                              onChange={(e) => setRating(parseInt(e.target.value))}
                            />
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              value={2}
                              onChange={(e) => setRating(parseInt(e.target.value))}
                            />
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              value={3}
                              onChange={(e) => setRating(parseInt(e.target.value))}
                            />
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              defaultChecked
                              value={4}
                              onChange={(e) => setRating(parseInt(e.target.value))}
                            />
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              value={5}
                              onChange={(e) => setRating(parseInt(e.target.value))}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="comment" className="text-right">
                            Comment
                          </Label>
                          <Textarea
                            id="comment"
                            className="col-span-3"
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="submit" className="font-semibold shadow-lg">
                          {(isPending || fbPending) && !isError && !fbError && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Submit Feedback
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                )}
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalBookingsCount === 0 ? (
        <div className="my-8 flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-500">No Bookings yet</h1>
          <p className="text-gray-400">You have not made any bookings</p>
        </div>
      ) : null}

      <div
        className="mt-4 flex flex-col flex-wrap items-center justify-end
        gap-4 md:flex-row
      "
      >
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
            <span className="font-semibold">{totalBookingsCount}</span>
            &nbsp;bookings
          </div>

          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page * pageSize >= totalBookingsCount}
            className="flex-center"
          >
            <ArrowRight className="h-6 w-6 text-white" />
          </Button>
        </section>
      </div>
    </>
  );
};

export default BookingNodesComponent;
