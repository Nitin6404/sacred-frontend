import { Icons } from "@/components/icons";
import { type UniqueIdentifier } from "@dnd-kit/core";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type ErrorDto = {
  message: string;
  status: number;
};

export const routeMapper: { [key: string]: string } = {
  Home: "/",
  Vendors: "/vendors",
  Booking: "/booking",
  Blogs: "/blogs",
  "About Us": "/about",
  "Contact Us": "/contact"
};

export const userAuthTypes = { user: "user", vendor: "vendor", super_admin: "super_admin" } as const;

export type UserAuthType = keyof typeof userAuthTypes;

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export interface ISlider {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICity {
  id: number;
  name: string;
  slug: string;
}

export enum DashboardLogisticType {
  viewed = "Viewed",
  contacted = "Contacted",
  booked = "Booked",
  quotation = "Quotation"
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  content: any[];
  bgImage: string;
  categories: Category[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}
