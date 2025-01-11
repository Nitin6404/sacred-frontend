"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface TemplateFilters {
  category?: string;
  languages?: string[];
  culturalElements?: string[];
  minRating?: number;
  priceRange?: [number, number];
  isFeatured?: boolean;
  search?: string;
  sortBy?: "rating" | "views" | "createdAt" | "name";
  sortOrder?: "asc" | "desc";
}

interface TemplateFiltersProps {
  onFilterChange: (filters: TemplateFilters) => void;
  isLoading?: boolean;
}

const CATEGORIES = ["Wedding", "Engagement", "Reception"];
const LANGUAGES = ["English", "Bengali"];
const CULTURAL_ELEMENTS = ["Traditional", "Modern", "Fusion"];
const SORT_OPTIONS = [
  { value: "rating", label: "Rating" },
  { value: "views", label: "Views" },
  { value: "createdAt", label: "Date Added" },
  { value: "name", label: "Name" }
];

export function TemplateFiltersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilters: TemplateFilters = {
    category: searchParams.get("category") || undefined,
    languages: searchParams.get("language") ? [searchParams.get("language")!] : undefined,
    culturalElements: searchParams.get("culturalElement") ? [searchParams.get("culturalElement")!] : undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
    priceRange: searchParams.get("priceRange") ? JSON.parse(searchParams.get("priceRange")!) : undefined,
    isFeatured: searchParams.get("isFeatured") === "true",
    search: searchParams.get("search") || undefined,
    sortBy: (searchParams.get("sortBy") as TemplateFilters["sortBy"]) || undefined,
    sortOrder: (searchParams.get("sortOrder") as TemplateFilters["sortOrder"]) || undefined
  };

  const handleFilterChange = useCallback(
    (filters: TemplateFilters) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === null) {
          params.delete(key);
        } else {
          params.set(key, typeof value === "object" ? JSON.stringify(value) : String(value));
        }
      });
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const FilterContent = ({ onFilterChange }: { onFilterChange: (filters: TemplateFilters) => void }) => (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Sort By</label>
        <div className="flex gap-2">
          <Select
            onValueChange={(value) => onFilterChange({ ...currentFilters, sortBy: value as TemplateFilters["sortBy"] })}
            value={currentFilters.sortBy}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentFilters.sortBy && (
            <Select
              onValueChange={(value) =>
                onFilterChange({ ...currentFilters, sortOrder: value as TemplateFilters["sortOrder"] })
              }
              value={currentFilters.sortOrder || "desc"}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Existing filter components */}
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <TemplateFiltersComponent
              onFilterChange={(filters) => {
                handleFilterChange(filters);
              }}
              isLoading={false}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <TemplateFiltersComponent
          onFilterChange={(filters) => {
            handleFilterChange(filters);
          }}
          isLoading={false}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <FilterContent onFilterChange={handleFilterChange} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <FilterContent onFilterChange={handleFilterChange} />
      </div>
    </>
  );
}

export function TemplateFiltersComponent({ onFilterChange, isLoading = false }: TemplateFiltersProps): JSX.Element {
  const [filters, setFilters] = useState<TemplateFilters>({});

  const handleFilterChange = useCallback(
    (key: keyof TemplateFilters, value: any) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      onFilterChange(newFilters);
    },
    [filters, onFilterChange]
  );

  return <div className="space-y-4">{/* Filter UI components */}</div>;
}
