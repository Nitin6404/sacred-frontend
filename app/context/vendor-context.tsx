import { ICity } from "@/types";
import { Media, ServiceOffered, VendorSubType, VendorType } from "@/types/auth.types";
import { Booking, Feedback } from "@/types/user-facing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  vendorTypes: VendorType[];
  cities: ICity[];
  vendorSubTypes: VendorSubType[];
  servicesOffered: ServiceOffered[];
  bookings: Booking[];
  feedbacks: Feedback[];
  album: Media[];
  // vendorProfile: Vendor | null;
};

export type Actions = {
  setVendorTypes: (temp: VendorType[] | null) => void;
  setCities: (temp: ICity[] | null) => void;
  setVendorSubTypes: (temp: VendorSubType[] | null) => void;
  setServicesOffered: (temp: ServiceOffered[] | null) => void;
  setBookings: (temp: Booking[] | null) => void;
  setFeedbacks: (temp: Feedback[] | null) => void;
  setAlbum: (temp: Media[] | null) => void;
  // setVendorProfile: (temp: Vendor | null) => void;
};

export const useVendorContext = create<State & Actions>()(
  persist(
    (set) => ({
      vendorTypes: [],
      cities: [],
      vendorSubTypes: [],
      servicesOffered: [],
      bookings: [],
      feedbacks: [],
      album: [],
      setVendorTypes: (temp) => set((state) => ({ vendorTypes: temp || [] })),
      setCities: (temp) => set((state) => ({ cities: temp || [] })),
      setVendorSubTypes: (temp) => set((state) => ({ vendorSubTypes: temp || [] })),
      setServicesOffered: (temp) => set((state) => ({ servicesOffered: temp || [] })),
      setBookings: (temp) => set((state) => ({ bookings: temp || [] })),
      setFeedbacks: (temp) => set((state) => ({ feedbacks: temp || [] })),
      setAlbum: (temp) => set((state) => ({ album: temp || [] }))
    }),
    { name: "vendor-context" }
  )
);
