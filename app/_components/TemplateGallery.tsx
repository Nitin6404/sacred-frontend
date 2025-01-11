"use client";

import { Button } from "@/components/ui/button";
import { Template } from "@/types/editor";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getAllTemplates } from "@/components/api/templates.endpoint";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/templates/${template.id}`}>
        <Card className="relative overflow-hidden bg-white p-4 transition-shadow hover:shadow-xl">
          {/* Template Preview */}
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={template.thumbnailUrl}
              alt={template.name}
              fill
              className="rounded-lg object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Template Info */}
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>

            <div className="flex flex-wrap gap-2">
              {template.category.map((cat, idx) => (
                <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                  {cat}
                </Badge>
              ))}
            </div>

            {/* Template Details */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{template.languages.join(" / ")}</span>
              </div>
              <Button size="icon" variant="ghost" className="rounded-f-lg h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export function TemplateGallery() {
  const { data, isLoading } = useQuery({
    queryKey: ["templates"],
    queryFn: () => getAllTemplates()
  });

  const templates: Template[] = data?.data.data.rows || [];

  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="rounded-f-lg h-32 w-32 animate-spin border-4 border-primary border-t-transparent" />
        </div>
      )}
      <div className="flex justify-center">
        <Link href="/templates">
          <Button variant="outline" size="lg">
            View All Templates
          </Button>
        </Link>
      </div>
    </section>
  );
}
