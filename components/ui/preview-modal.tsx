"use client";

import { useEditorStore } from "@/lib/editor";
import { X, ChevronLeft, ChevronRight, Download, Share } from "lucide-react";
import { useState } from "react";
import MusicPlayer from "./music-player";
import { Dialog, DialogContent } from "./dialog";
import { Button } from "./button";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  music?: {
    type: "shehnai" | "rabindra_sangeet";
    url: string;
  };
}

export default function PreviewModal({ isOpen, onClose, music }: PreviewModalProps) {
  const { pages, currentPage } = useEditorStore();
  const [previewPage, setPreviewPage] = useState(currentPage);

  if (!isOpen) return null;

  const handlePrevPage = () => {
    if (previewPage > 0) {
      setPreviewPage(previewPage - 1);
    }
  };

  const handleNextPage = () => {
    if (previewPage < pages.length - 1) {
      setPreviewPage(previewPage + 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[600px] max-w-[800px] flex-col p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gray-100">
          <div className="absolute h-full w-full" style={{ backgroundColor: pages[previewPage].background }}>
            {pages[previewPage].elements.map((element) => (
              <div
                key={element.id}
                style={{
                  position: "absolute",
                  transform: `translate(${element.style.position.x}px, ${element.style.position.y}px) rotate(${
                    element.style.rotation || 0
                  }deg)`,
                  width: `${element.style.size.width}px`,
                  height: `${element.style.size.height}px`,
                  ...element.style
                }}
              >
                {element.type === "text" && (
                  <div
                    style={{
                      fontFamily: element.style.fontFamily,
                      fontSize: element.style.fontSize,
                      color: element.style.color,
                      backgroundColor: element.style.backgroundColor,
                      fontWeight: element.style.fontWeight,
                      fontStyle: element.style.fontStyle,
                      textDecoration: element.style.textDecoration,
                      textAlign: element.style.textAlign as any
                    }}
                  >
                    {element.content}
                  </div>
                )}
                {element.type === "image" && (
                  <img src={element.content} alt="" className="h-full w-full object-contain" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handlePrevPage} disabled={previewPage === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              Page {previewPage + 1} of {pages.length}
            </span>
            <Button variant="ghost" size="icon" onClick={handleNextPage} disabled={previewPage === pages.length - 1}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {music && <MusicPlayer musicUrl={music.url} musicType={music.type} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
