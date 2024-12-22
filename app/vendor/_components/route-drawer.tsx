import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";

interface RouteDrawerProps {
  children: React.ReactNode;
}

export default function RouteDrawer(props: RouteDrawerProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild className="ml-4 text-primary">
        <Menu className="h-8 w-8 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="h-screen w-fit gap-0 overflow-hidden rounded-none rounded-r-md">
        {props.children}
      </DrawerContent>
    </Drawer>
  );
}
