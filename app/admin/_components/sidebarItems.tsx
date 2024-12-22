import { VendorType } from "@/types/auth.types";
import {
  Cog,
  Star,
  Users,
  UserCog,
  Building,
  AlignLeft,
  ImagePlus,
  Clipboard,
  LucideIcon,
  DatabaseZap,
  CircleDotDashed,
  HelpingHand
} from "lucide-react";
import { IconType } from "react-icons";

export type AdminSidebarItem = {
  icon: LucideIcon | IconType;
  label: string;
  route?: string;
  subRoutes?: Array<Omit<AdminSidebarItem, "icon">>;
};

export function getAdminSidebarRoutes(isLoading: boolean, data?: Array<VendorType>): Array<AdminSidebarItem> {
  const adminRoutes = [
    { icon: CircleDotDashed, label: "Dashboard", route: "/admin/dashboard" },
    { icon: UserCog, label: "Vendors", route: "/admin/vendors" },
    { icon: AlignLeft, label: "Vendor Types", route: "/admin/vendor-types" },
    { icon: Users, label: "Users", route: "/admin/users" },
    {
      icon: Cog,
      label: "E Settings",
      subRoutes: [
        { label: "Contact Us", route: "/admin/contact-us" },
        { label: "Our Team", route: "/admin/our-team" },
        { label: "SEO", route: "/admin/seo" }
      ]
    },
    { icon: Clipboard, label: "Bookings", route: "/admin/bookings" },
    { icon: Building, label: "City", route: "/admin/cities" },
    { icon: ImagePlus, label: "Slider", route: "/admin/slider" },
    { icon: HelpingHand, label: "Blogs", route: "/admin/blogs" },
    { icon: HelpingHand, label: "Categories", route: "/admin/categories" },
    {
      icon: DatabaseZap,
      label: "Services",
      subRoutes: !isLoading
        ? data?.map((vendorType) => ({ label: vendorType.type, route: `/admin/services/${vendorType.id}` }))
        : []
    },
    { icon: DatabaseZap, label: "Services Offered", route: "/admin/services-offered" },
    { icon: Star, label: "User Reviews", route: "/admin/reviews" }
  ];

  return adminRoutes;
}
