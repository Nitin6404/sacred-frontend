"use client";

import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useEditorStore } from "@/lib/store/editor";

export function EventDetails() {
  const { pages, currentPage, updateElement } = useEditorStore();
  const currentPageData = pages[currentPage];

  const getElementContent = (id: string) => currentPageData?.elements.find((e) => e.id === id)?.content || "";

  const handleUpdate = (elementId: string, content: string) => {
    updateElement(elementId, { content });
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center font-semibold">
        <Calendar className="mr-2 h-4 w-4" />
        Event Details
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Date & Time</label>
          <Input
            value={getElementContent("date")}
            onChange={(e) => handleUpdate("date", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Venue</label>
          <Input
            value={getElementContent("venue")}
            onChange={(e) => handleUpdate("venue", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
