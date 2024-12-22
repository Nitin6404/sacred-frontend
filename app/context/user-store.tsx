import { Booking } from "@/types/user-facing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  bookings: Booking[];
};

export type Actions = {
  setBookings: (bookings: Booking[]) => void;
};

export const useCustomerStore = create<State & Actions>()(
  persist(
    (set) => ({
      bookings: [],
      setBookings: (bookings) => set({ bookings })
    }),
    { name: "customer-store", skipHydration: true }
  )
);
