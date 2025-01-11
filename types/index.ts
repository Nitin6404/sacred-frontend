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

// Template Types
export type ElementType = "text" | "image" | "shape";
export type Language = "en" | "bn";

export interface Template {
  id: string;
  name: string;
  description?: string;
  thumbnailUrl?: string;
  previewImages?: string[];
  category?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  rating?: number;
  views?: number;
  previewUrl?: string;
  previewConfig?: {
    layout: string;
    style: string;
    components: any[];
  };
  layout: string;
  style: string;
  components: any[];
  customization?: TemplateCustomization;
  languages?: string[];
  culturalElements?: string[];
}

export interface TemplateCustomization {
  templateId: string;
  content: {
    title?: string;
    subtitle?: string;
    date?: string;
    venue?: string;
    message?: string;
    [key: string]: string | undefined;
  };
  style: {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    textAlign?: "left" | "center" | "right";
    fontWeight?: "normal" | "bold";
    [key: string]: string | number | undefined;
  };
  layout: {
    spacing?: number;
    padding?: number;
    margin?: number;
    width?: number;
    height?: number;
    [key: string]: number | undefined;
  };
}

export interface TemplateFilters {
  search?: string;
  category?: string[];
  languages?: Language[];
  culturalElements?: string[];
  minRating?: number;
  priceRange?: [number, number];
  isFeatured?: boolean;
  sortBy?: "rating" | "views" | "createdAt" | "name";
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface TemplateResponse {
  templates: Template[];
}

export interface TemplateListResponse {
  count: number;
  rows: Template[];
  page: number;
  pageSize: number;
  totalPages: number;
}
