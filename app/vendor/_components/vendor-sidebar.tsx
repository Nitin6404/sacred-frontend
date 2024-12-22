import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useMemo } from "react";
import { getVendorSidebarRoutes } from "./sidebarItems";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function VendorSidebar(props: { collapsed: boolean; vendorSide?: boolean }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sidebarItems = useMemo(() => getVendorSidebarRoutes(), []);

  return (
    <div
      className={twMerge(
        "flex h-full flex-col gap-4 overflow-auto overflow-x-hidden bg-background p-2 shadow-lg",
        props.collapsed ? "w-16" : "w-56"
      )}
    >
      {sidebarItems.map((sidebarRoute) => {
        if (sidebarRoute.route) {
          return (
            <Link
              key={sidebarRoute.label}
              href={sidebarRoute.route}
              className={twMerge(
                "flex items-center gap-2 rounded-md p-2 transition hover:bg-primary-foreground",
                props.collapsed ? "justify-center" : ""
              )}
            >
              <sidebarRoute.icon size={26} stroke="red" />
              {!props.collapsed ? <div className="text-base font-semibold">{sidebarRoute.label}</div> : null}
            </Link>
          );
        }

        return (
          <div
            key={sidebarRoute.label}
            className={twMerge("flex items-center gap-2", props.collapsed ? "justify-center" : "")}
          >
            {props.collapsed ? (
              <Popover>
                <PopoverTrigger
                  className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-1 transition hover:bg-primary-foreground hover:no-underline"
                  asChild
                >
                  <sidebarRoute.icon size={36} stroke="red" />
                </PopoverTrigger>

                <PopoverContent className="-mt-2 ml-10 w-full rounded-lg p-2">
                  {sidebarRoute.subRoutes?.map((subRoute) => (
                    <Link
                      key={subRoute.label}
                      href={subRoute.route!}
                      className="flex items-center gap-3 rounded-md px-2 py-1 text-base hover:bg-primary-foreground"
                    >
                      {subRoute.label}
                    </Link>
                  ))}
                </PopoverContent>
              </Popover>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={sidebarRoute.label} className="rounded-md border-none">
                  <AccordionTrigger className="flex items-center justify-start gap-2 rounded-lg p-2 transition hover:bg-primary-foreground hover:no-underline [&[data-state=open]>svg]:rotate-0">
                    <sidebarRoute.icon size={26} stroke="red" />
                    <div className="text-base font-semibold">{sidebarRoute.label}</div>
                  </AccordionTrigger>
                  <AccordionContent className="mb-0 pb-0 pl-8">
                    {sidebarRoute.subRoutes?.map((subRoute) => (
                      <Link
                        key={subRoute.label}
                        href={subRoute.route!}
                        className="flex items-center gap-3 rounded-md px-2 py-1 text-base hover:bg-primary-foreground"
                      >
                        {subRoute.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        );
      })}
    </div>
  );
}
