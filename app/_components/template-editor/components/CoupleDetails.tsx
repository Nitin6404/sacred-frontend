"use client";

import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { useEditorStore } from "@/lib/store/editor";

export function CoupleDetails() {
  const { pages, currentPage, updateElement } = useEditorStore();
  const currentPageData = pages[currentPage || 0];

  const getElementContent = (id: string) => currentPageData?.elements?.find((e) => e.id === id)?.content || "";

  const handleUpdate = (elementId: string, content: string) => {
    if (!currentPageData) return;
    updateElement(elementId, { content });
  };

  if (!currentPageData) return null;

  return (
    <div className="space-y-4">
      <h3 className="flex items-center font-semibold">
        <Users className="mr-2 h-4 w-4" />
        Couple Details
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Bride's Name</label>
          <Input
            value={getElementContent("bride")}
            onChange={(e) => handleUpdate("bride", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bride's Parents</label>
          <Input
            value={getElementContent("brideParents")}
            onChange={(e) => handleUpdate("brideParents", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Groom's Name</label>
          <Input
            value={getElementContent("groom")}
            onChange={(e) => handleUpdate("groom", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Groom's Parents</label>
          <Input
            value={getElementContent("groomParents")}
            onChange={(e) => handleUpdate("groomParents", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
