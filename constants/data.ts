export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export enum bookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  NONE = "none"
}

export const bookingStatusOptions = [
  bookingStatus.PENDING,
  bookingStatus.CONFIRMED,
  bookingStatus.CANCELLED,
  bookingStatus.COMPLETED,
  bookingStatus.NONE
];

export const phoneArr = ["+91 7890835517"];

export const sacredShaadiAddress = "SaltLake, Sector V, Bidhannagar, Kolkata, West Bengal 700091";
