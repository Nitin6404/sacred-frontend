"use client";

import Image from "next/image";
import { Template } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

export default function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-lg" onClick={onClick}>
      <CardHeader className="relative aspect-video p-0">
        <Image src={template.thumbnailUrl} alt={template.name} fill className="rounded-t-lg object-cover" />
        {template.isFeatured && (
          <Badge className="absolute right-2 top-2" variant="secondary">
            Featured
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">{template.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{template.description}</p>
        <div className="flex flex-wrap gap-2">
          {template.category.map((cat) => (
            <Badge key={cat} variant="outline">
              {cat}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center space-x-1">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">{template.rating.toFixed(1)}</span>
        </div>
        <div className="text-sm text-muted-foreground">{template.views} views</div>
      </CardFooter>
    </Card>
  );
}
