"use client";

import { Button } from "@/components/ui/button";
import { Template } from "@/types/editor";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={template.thumbnailUrl}
            alt={template.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {template.isFeatured && (
            <Badge variant="secondary" className="absolute right-2 top-2">
              Featured
            </Badge>
          )}
        </div>
        <CardHeader>
          <CardTitle>{template.name}</CardTitle>
          <CardDescription className="line-clamp-2">{template.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {template.category.map((cat) => (
              <Badge key={cat} variant="outline">
                {cat}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            <span>{template.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({template.views} views)</span>
          </div>
          <div className="text-sm text-muted-foreground">{template.languages.join(", ")}</div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export function TemplateGallery() {
  // Example templates - replace with actual data from your backend
  const templates: Template[] = [
    {
      id: 1,
      name: "Traditional Bengali Wedding",
      description:
        "A beautiful template featuring traditional Bengali wedding elements with rich colors and cultural motifs.",
      thumbnailUrl: "/templates/bengali-wedding.jpg",
      previewImages: ["/templates/bengali-wedding-1.jpg", "/templates/bengali-wedding-2.jpg"],
      category: ["Bengali", "Traditional"],
      languages: ["en", "bn"],
      culturalElements: ["Bengali", "Hindu"],
      isActive: true,
      isFeatured: true,
      tags: ["bengali", "traditional", "wedding"],
      views: 1200,
      rating: 4.8,
      customization: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "Modern Fusion Wedding",
      description: "A contemporary design blending modern aesthetics with subtle traditional elements.",
      thumbnailUrl: "/templates/modern-fusion.jpg",
      previewImages: ["/templates/modern-fusion-1.jpg", "/templates/modern-fusion-2.jpg"],
      category: ["Modern", "Fusion"],
      languages: ["en", "bn"],
      culturalElements: ["Contemporary", "Fusion"],
      isActive: true,
      isFeatured: true,
      tags: ["modern", "fusion", "contemporary"],
      views: 980,
      rating: 4.7,
      customization: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "Royal Wedding Collection",
      description: "An elegant and luxurious template inspired by royal Bengali weddings.",
      thumbnailUrl: "/templates/royal-wedding.jpg",
      previewImages: ["/templates/royal-wedding-1.jpg", "/templates/royal-wedding-2.jpg"],
      category: ["Royal", "Luxury"],
      languages: ["en", "bn"],
      culturalElements: ["Bengali", "Royal"],
      isActive: true,
      isFeatured: true,
      tags: ["royal", "luxury", "elegant"],
      views: 1500,
      rating: 4.9,
      customization: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return (
    <section className="container space-y-8 py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/templates">
          <Button variant="outline" size="lg">
            View All Templates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
