"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/api/template";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Heart, Share2, Download, Star } from "lucide-react";
import { useCallback, useState, useRef } from "react";

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatePreviewModal({ template, isOpen, onClose }: TemplatePreviewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (zoomLevel > 1) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y
        });
      }
    },
    [position.x, position.y, zoomLevel]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging && zoomLevel > 1) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging, dragStart.x, dragStart.y, zoomLevel]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClose = useCallback(() => {
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    onClose();
  }, [onClose]);

  if (!template) return null;

  return (
    <Modal
      title={template.name}
      description={template.description}
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-6xl"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Image Preview Section */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
          <div
            ref={containerRef}
            className={cn("relative h-full w-full cursor-grab transition-transform", isDragging && "cursor-grabbing")}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`
            }}
          >
            {template.previewImages[currentImageIndex] && (
              <Image
                src={template.previewImages[currentImageIndex]}
                alt={`Preview ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>

          {/* Image Navigation Controls */}
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center space-x-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={handlePrevImage}
              disabled={template.previewImages.length <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 1}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleZoomIn} disabled={zoomLevel >= 3}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="secondary"
              size="icon"
              onClick={handleNextImage}
              disabled={template.previewImages.length <= 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Counter */}
          <div className="absolute right-4 top-4 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            {currentImageIndex + 1} / {template.previewImages.length}
          </div>
        </div>

        {/* Template Details Section */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{template.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < (template.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {template.category?.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
            {template.languages?.map((lang) => (
              <Badge key={lang} variant="secondary">
                {lang}
              </Badge>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Features</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                <li>Customizable text and colors</li>
                <li>High-resolution images</li>
                <li>Print-ready format</li>
                <li>Mobile responsive design</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium">Views</h3>
              <p className="mt-1 text-2xl font-semibold">{template.views.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-auto space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Preview
              </Button>
            </div>

            <Button className="w-full">Customize Template</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
