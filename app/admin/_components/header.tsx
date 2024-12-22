import { Dispatch, ReactNode, SetStateAction } from "react";
import { Menu } from "lucide-react";
import Profile from "@/app/_components/profile";
import { userAuthTypes } from "@/types";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/globals/logo";
import RouteDrawer from "@/app/vendor/_components/route-drawer";
import { SuperAdminSidebar } from "./sidebar";

function AdminHeader(props: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  extras: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-primary-foreground py-4">
      <div
        className={cn(
          "items-center justify-between font-semibold text-primary",
          props.collapsed ? "w-16 justify-center" : "w-56 pl-4",
          "hidden lg:flex"
        )}
      >
        {!props.collapsed ? <Logo /> : null}
        <Menu className="h-8 w-8 cursor-pointer" onClick={() => props.setCollapsed((prev) => !prev)} />
      </div>

      <div className="flex items-center justify-center lg:hidden">
        <RouteDrawer>
          <SuperAdminSidebar collapsed={false} />
        </RouteDrawer>
      </div>

      <div className="mx-2 flex flex-grow items-center justify-between sm:mx-4">
        {props.extras}
        <section className="flex items-center gap-2">
          <Profile type={userAuthTypes.super_admin} />
        </section>
      </div>
    </div>
  );
}

export default AdminHeader;
