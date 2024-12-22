"use client";

import { useRouter } from "next/navigation";
import BookingNodesComponent from "../(dashboard)/booking/booking-nodes-component";
import { useUserStore } from "../context/user-context";

export function NoUserState(props: { title: string; description: string }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/login")}
      className="my-56 flex cursor-pointer flex-col items-center justify-center hover:text-rose-600"
    >
      <h1 className="text-2xl font-bold">{props.title}</h1>
      <p className="text-gray-500">{props.description}</p>
    </div>
  );
}

export function ShowBookings() {
  const { user } = useUserStore();

  if (!user) return <NoUserState title="You are not logged in" description="Please login to see your bookings" />;
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Your Bookings</h1>

      <BookingNodesComponent />
    </div>
  );
}
