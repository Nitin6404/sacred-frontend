import {
  LucideIcon,
  PersonStandingIcon,
  LayoutDashboardIcon,
  Bookmark,
  Box,
  ListChecks,
  Clipboard,
  CheckCircle
} from "lucide-react";

export type SidebarItem = {
  icon: LucideIcon;
  label: string;
  route?: string;
  subRoutes?: Array<Omit<SidebarItem, "icon">>;
};

export function getVendorSidebarRoutes(): Array<SidebarItem> {
  const vendorRoutes = [
    { icon: LayoutDashboardIcon, label: "Dashboard", route: "/vendor/dashboard" },
    { icon: PersonStandingIcon, label: "Profile", route: "/vendor/profile" },
    { icon: Bookmark, label: "Service Type", route: "/vendor/service-type" },
    { icon: Box, label: "Services Offered", route: "/vendor/services-offered" },
    { icon: ListChecks, label: "Portfolio List", route: "/vendor/portfolio-list" },
    { icon: Clipboard, label: "Booking", route: "/vendor/booking" },
    { icon: CheckCircle, label: "Feedback", route: "/vendor/feedback" }
  ];

  return vendorRoutes;
}
