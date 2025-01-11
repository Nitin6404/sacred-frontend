"use client";

import { useEditorStore } from "@/lib/store/editor";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ElementEditor } from "./ElementEditor";

export function TemplatePreview() {
  const {
    pages,
    currentPage,
    setCurrentPage,
    selectedElement,
    setSelectedElement,
    updateElementStyle,
    updateElementContent
  } = useEditorStore();

  const currentPageData = pages[currentPage || 0];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);

  if (!currentPageData) return null;

  const totalPages = pages.length;
  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleElementClick = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement(elementId);
  };

  const handleDoubleClick = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement(elementId);
    setIsEditing(true);
  };

  const handleMouseDown = (elementId: string, e: React.MouseEvent) => {
    if (elementId !== selectedElement) return;

    setIsDragging(true);
    const element = currentPageData.elements.find((el) => el.id === elementId);
    if (!element) return;

    setDragStart({
      x: e.clientX - element.style.position.x,
      y: e.clientY - element.style.position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    updateElementStyle(currentPage, selectedElement, {
      position: { x: newX, y: newY }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContentEdit = (elementId: string, content: string) => {
    updateElementContent(currentPage, elementId, content);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 p-8">
      <div
        ref={containerRef}
        className="relative mx-auto aspect-[3/4] w-full max-w-3xl bg-white shadow-lg"
        style={{ backgroundImage: `url(${currentPageData.background})`, backgroundSize: "cover" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={() => setSelectedElement(null)}
      >
        {currentPageData.elements.map((element) => (
          <div
            key={element.id}
            className={cn(
              "absolute cursor-move",
              selectedElement === element.id && "outline outline-2 outline-blue-500"
            )}
            style={{
              left: element.style.position.x,
              top: element.style.position.y,
              width: element.style.size.width,
              height: element.style.size.height,
              fontFamily: element.style.fontFamily,
              fontSize: element.style.fontSize,
              color: element.style.color,
              textAlign: element.style.textAlign,
              fontWeight: element.style.fontWeight,
              fontStyle: element.style.fontStyle,
              lineHeight: element.style.lineHeight,
              backgroundColor: element.style.backgroundColor,
              zIndex: element.style.zIndex || 0
            }}
            onClick={(e) => handleElementClick(element.id, e)}
            onDoubleClick={(e) => handleDoubleClick(element.id, e)}
            onMouseDown={(e) => handleMouseDown(element.id, e)}
          >
            {isEditing && selectedElement === element.id ? (
              <div
                contentEditable
                suppressContentEditableWarning
                className="h-full w-full outline-none"
                onBlur={(e) => {
                  handleContentEdit(element.id, e.currentTarget.textContent || "");
                  setIsEditing(false);
                }}
              >
                {element.content}
              </div>
            ) : (
              element.content
            )}
            {selectedElement === element.id && !isEditing && (
              <div className="absolute -bottom-3 -right-3 h-6 w-6 cursor-se-resize rounded-full bg-blue-500" />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4">
        <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={!hasPrevPage}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNextPage} disabled={!hasNextPage}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {selectedElement && <ElementEditor />}
    </div>
  );
}
