"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/api/template";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useState } from "react";

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatePreviewModal({ template, isOpen, onClose }: TemplatePreviewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePrevImage = useCallback(() => {
    if (!template?.previewImages?.length) return;
    setCurrentImageIndex((prev) => (prev === 0 ? template.previewImages.length - 1 : prev - 1));
  }, [template?.previewImages?.length]);

  const handleNextImage = useCallback(() => {
    if (!template?.previewImages?.length) return;
    setCurrentImageIndex((prev) => (prev === template.previewImages.length - 1 ? 0 : prev + 1));
  }, [template?.previewImages?.length]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleClose = useCallback(() => {
    setCurrentImageIndex(0);
    setZoomLevel(1);
    onClose();
  }, [onClose]);

  if (!template) return null;

  return (
    <Modal
      title={template.name}
      description={template.description}
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-5xl"
    >
      <div className="mt-4 space-y-4">
        {/* Image Preview */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
          <div className="h-full w-full transition-transform duration-200" style={{ transform: `scale(${zoomLevel})` }}>
            <Image
              src={template.previewImages?.[currentImageIndex] || template.thumbnailUrl}
              alt={`${template.name} preview`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>

          {/* Navigation Controls */}
          {template.previewImages?.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Template Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold">Languages</h4>
            <p className="text-gray-600">{template.languages.join(", ")}</p>
          </div>
          <div>
            <h4 className="font-semibold">Rating</h4>
            <div className="flex items-center">
              <span className="mr-1 text-yellow-500">★</span>
              <span>{template.rating.toFixed(1)}</span>
              <span className="ml-2 text-gray-500">({template.views} views)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button>Use This Template</Button>
        </div>
      </div>
    </Modal>
  );
}
