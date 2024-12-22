import { create } from "zustand";

export type Root = {
  id: number;
  serviceOfferedId: number;
  vendorId: number;
  price: string;
  description: string;
  details: string;
  createdAt: string;
  updatedAt: string;
  vendor: Vendor;
  image: string;
};

type Vendor = {
  id: number;
  userId: number;
  vendorTypeId: number;
  description: any;
  details: any;
  createdAt: string;
  updatedAt: string;
  user: User;
  feedbacks: Feedback[];
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  addresses: any[];
};

type Feedback = {
  rating: string;
};

export type VendorSearchParams = {
  cityId: number;
  serviceIds: number[];
  priceRange: [number, number];
  date: Date;
  rating: number;
};

export type VendorSearchState = {
  data: Root[];
  page: number;
  pageSize: number;
  count: number;
  searched: boolean;
};

export type Actions = {
  setData: (data: Root[], count: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (pageSize: number) => void;
  setPageNumber: (page: number) => void;
  setSearchParams: (params: VendorSearchParams) => void;
  setSearched: (searched: boolean) => void;
};

export const useVendorSearchStore = create<VendorSearchParams & VendorSearchState & Actions>((set) => ({
  data: [],
  page: 1,
  pageSize: 12,
  count: 0,
  cityId: 0,
  serviceIds: [],
  priceRange: [0, 0],
  date: new Date(),
  rating: 5,
  searched: false,
  setData: (data, count) => set({ data, count }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  setPageSize: (pageSize) => set({ pageSize }),
  setPageNumber: (page) => set({ page }),
  setSearchParams: (params) => set({ ...params }),
  setSearched: (searched) => set({ searched })
}));
