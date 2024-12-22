import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MessageSquare } from "lucide-react";
import React from "react";

const MessagesComp = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center justify-center rounded-md border-2 border-primary p-2 text-primary transition hover:bg-primary hover:text-white"
        // variant={"outline"}
        title="Messages"
      >
        <MessageSquare className="h-4 w-4 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Messages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2 text-sm">No new messages</div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        // onClick={() => {}}
        >
          View all messages
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessagesComp;
