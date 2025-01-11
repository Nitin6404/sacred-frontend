import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTemplateQuery } from "@/app/_components/api/templates";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

interface TemplatePreviewModalProps {
  templateId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatePreviewModal({ templateId, isOpen, onClose }: TemplatePreviewModalProps) {
  const { data: template, isLoading } = useTemplateQuery(templateId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (isLoading || !template) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <LoadingSpinner />
        </DialogContent>
      </Dialog>
    );
  }

  const nextImage = () => {
    if (template.previewImages && currentImageIndex < template.previewImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{template.name}</DialogTitle>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </DialogHeader>

        <div className="relative aspect-video">
          <Image
            src={template.previewImages[currentImageIndex]}
            alt={`Preview ${currentImageIndex + 1}`}
            fill
            className={cn(
              "object-contain transition-transform",
              { "cursor-zoom-in": zoomLevel === 1 },
              { "cursor-zoom-out": zoomLevel > 1 }
            )}
            style={{ transform: `scale(${zoomLevel})` }}
          />

          {currentImageIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {template.previewImages && currentImageIndex < template.previewImages.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.5))}
            disabled={zoomLevel <= 1}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.5))}
            disabled={zoomLevel >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div>
            <h3 className="font-semibold">Categories</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {template.category.map((cat: string) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Languages</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {template.languages.map((lang: string) => (
                <Badge key={lang} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="font-semibold">Rating:</span> <span className="text-yellow-500">★</span>{" "}
              {template.rating.toFixed(1)}
            </div>
            <div>
              <span className="font-semibold">Views:</span> {template.views}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
