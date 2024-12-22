import { User, Vendor } from "../auth.types";

export enum VendorEnum {
  makeUpArtist = "Make Up Artist",
  photographer = "Photographer",
  venue = "Venue",
  decorators = "Decorators",
  caterers = "Caterers",
  mehndiArtist = "Bridal Mehndi Artist",
  art = "Wedding Art and Decor"
}

export enum BookingStatus {
  pending = "pending",
  completed = "completed",
  cancelled = "cancelled",
  confirmed = "confirmed"
}

export interface Booking {
  id: number;
  bookingDate: string;
  status: BookingStatus;
  vendorId: number;
  vendorName: string;
  vendorPhone: string;
  vendorDescription: string;
  vendorDetails: string;
  serviceOfferedPrice: string;
  serviceOfferedDetails: string;
  serviceOfferedDescription: string;
  serviceOfferedImage: string;
}

export interface Feedback {
  id: number;
  feedback: string;
  rating: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  vendor: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}
