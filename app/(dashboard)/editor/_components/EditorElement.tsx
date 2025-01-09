"use client";

import { useEditorStore, type EditorElement as EditorElementType } from "@/lib/store/editor";
import { useCallback } from "react";
import { motion } from "framer-motion";

interface EditorElementProps {
  element: EditorElementType;
  isSelected: boolean;
}

export const EditorElement = ({ element, isSelected }: EditorElementProps) => {
  const { setSelectedElement, updateElement } = useEditorStore();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedElement(element.id);
    },
    [element.id, setSelectedElement]
  );

  const handleDrag = useCallback(
    (_: any, info: { point: { x: number; y: number } }) => {
      updateElement(element.id, {
        style: {
          ...element.style,
          position: {
            x: info.point.x,
            y: info.point.y
          }
        }
      });
    },
    [element, updateElement]
  );

  const getElementStyles = () => {
    const { position, size, rotation = 0, ...rest } = element.style;
    return {
      position: "absolute",
      left: position.x,
      top: position.y,
      width: size.width,
      height: size.height,
      transform: `rotate(${rotation}deg)`,
      cursor: "pointer",
      ...rest
    };
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDrag}
      onClick={handleClick}
      style={getElementStyles()}
      className={`${isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      {element.type === "text" && (
        <p
          style={{
            margin: 0,
            fontFamily: element.style.fontFamily,
            fontSize: element.style.fontSize,
            color: element.style.color,
            backgroundColor: element.style.backgroundColor,
            width: "100%",
            height: "100%",
            overflow: "hidden"
          }}
        >
          {element.content}
        </p>
      )}

      {element.type === "image" && (
        <img
          src={element.content}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      )}

      {element.type === "shape" && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: element.style.backgroundColor
          }}
        />
      )}
    </motion.div>
  );
};
