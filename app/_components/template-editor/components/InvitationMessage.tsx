"use client";

import { Heart } from "lucide-react";
import { useEditorStore } from "@/lib/store/editor";

export function InvitationMessage() {
  const { pages, currentPage, updateElement } = useEditorStore();
  const currentPageData = pages[currentPage];

  const getElementContent = (id: string) => currentPageData?.elements.find((e) => e.id === id)?.content || "";

  const handleUpdate = (elementId: string, content: string) => {
    updateElement(elementId, { content });
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center font-semibold">
        <Heart className="mr-2 h-4 w-4" />
        Message
      </h3>
      <div>
        <label className="text-sm font-medium">Invitation Message</label>
        <textarea
          value={getElementContent("message")}
          onChange={(e) => handleUpdate("message", e.target.value)}
          className="mt-1 min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
}
