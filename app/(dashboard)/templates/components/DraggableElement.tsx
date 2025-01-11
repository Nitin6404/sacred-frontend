"use client";

import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import type { EditorElement } from "@/types/editor";

interface DraggableElementProps {
  element: EditorElement;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onDelete: () => void;
}

export function DraggableElement({ element, isSelected, onSelect, onDoubleClick, onDelete }: DraggableElementProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      className={cn(
        "group absolute cursor-move p-2",
        isSelected
          ? "border-2 border-dashed border-primary"
          : "border border-dashed border-gray-400 hover:border-primary"
      )}
      style={{
        ...style,
        left: `${element.style.position.x}px`,
        top: `${element.style.position.y}px`,
        width: element.style.size.width,
        height: element.style.size.height,
        fontFamily: element.style.fontFamily,
        fontSize: element.style.fontSize,
        color: element.style.color,
        backgroundColor: element.style.backgroundColor,
        fontWeight: element.style.fontWeight,
        fontStyle: element.style.fontStyle,
        textDecoration: element.style.textDecoration,
        textAlign: element.style.textAlign as any,
        transform: element.style.rotation ? `rotate(${element.style.rotation}deg)` : undefined
      }}
    >
      {element.content}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}
