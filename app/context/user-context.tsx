import { User, Vendor } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  user: User | null;
  vendor: Vendor | null;
  super_admin: User | null;
};

export type Actions = {
  setUser: (user: User | null) => void;
  setVendor: (vendor: Vendor | null) => void;
  setSuperAdmin: (super_admin: User | null) => void;
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      vendor: null,
      super_admin: null,
      setUser: (user: User | null) => set({ user }),
      setVendor: (vendor: Vendor | null) => set({ vendor }),
      setSuperAdmin: (super_admin: User | null) => set({ super_admin })
    }),
    { name: "users", skipHydration: false }
  )
);
