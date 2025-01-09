"use client";

import { useEditorStore } from "@/lib/store/editor";
import { EditorElement } from "./EditorElement";
import { useCallback } from "react";

export const EditorCanvas = () => {
  const { pages, currentPage, selectedElement, setSelectedElement } = useEditorStore();

  const currentPageData = pages[currentPage];

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setSelectedElement(null);
      }
    },
    [setSelectedElement]
  );

  return (
    <div className="h-full flex-1 overflow-auto bg-gray-100" onClick={handleCanvasClick}>
      <div
        className="relative mx-auto my-8 h-[1123px] w-[794px] bg-white shadow-lg"
        style={{
          backgroundImage: currentPageData.background ? `url(${currentPageData.background})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {currentPageData.elements.map((element) => (
          <EditorElement key={element.id} element={element} isSelected={selectedElement?.id === element.id} />
        ))}
      </div>
    </div>
  );
};
