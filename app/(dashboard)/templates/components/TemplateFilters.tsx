"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTemplates } from "@/hooks/useTemplates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Wedding", "Engagement", "Reception"];
const LANGUAGES = ["English", "Bengali"];
const CULTURAL_ELEMENTS = ["Traditional", "Modern", "Fusion"];
const PRICE_RANGE = { min: 0, max: 10000 };

export default function TemplateFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { applyFilters } = useTemplates();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const currentFilters = {
    category: searchParams.get("category") || "",
    languages: searchParams.get("language") ? [searchParams.get("language")!] : [],
    culturalElements: searchParams.get("culturalElement") ? [searchParams.get("culturalElement")!] : [],
    minRating: searchParams.get("minRating") || "",
    priceRange: [
      Number(searchParams.get("minPrice")) || PRICE_RANGE.min,
      Number(searchParams.get("maxPrice")) || PRICE_RANGE.max
    ],
    search: searchParams.get("search") || "",
    isFeatured: searchParams.get("isFeatured") === "true"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch !== currentFilters.search) {
      handleFilterChange("search", debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleFilterChange = (key: string, value: string | boolean | number[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "" || value === false) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.set("minPrice", value[0].toString());
      params.set("maxPrice", value[1].toString());
    } else {
      params.set(key, String(value));
    }

    router.push(`/templates?${params.toString()}`);
    applyFilters(Object.fromEntries(params.entries()));
  };

  const clearFilters = () => {
    setSearchTerm("");
    router.push("/templates");
    applyFilters({});
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-primary">
          Clear All
          <X className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">Price Range</h3>
          <Slider
            defaultValue={currentFilters.priceRange}
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
            step={100}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
          />
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>${currentFilters.priceRange[0]}</span>
            <span>${currentFilters.priceRange[1]}</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={currentFilters.category === category}
                  onChange={() => handleFilterChange("category", category)}
                  className={cn("form-radio", "text-primary", "border-primary", "focus:ring-primary")}
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">Language</h3>
          <div className="space-y-2">
            {LANGUAGES.map((language) => (
              <label key={language} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="language"
                  value={language}
                  checked={currentFilters.languages.includes(language)}
                  onChange={() => handleFilterChange("language", language)}
                  className={cn("form-radio", "text-primary", "border-primary", "focus:ring-primary")}
                />
                <span className="text-sm">{language}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">Cultural Elements</h3>
          <div className="space-y-2">
            {CULTURAL_ELEMENTS.map((element) => (
              <label key={element} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="culturalElement"
                  value={element}
                  checked={currentFilters.culturalElements.includes(element)}
                  onChange={() => handleFilterChange("culturalElement", element)}
                  className={cn("form-radio", "text-primary", "border-primary", "focus:ring-primary")}
                />
                <span className="text-sm">{element}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">Rating</h3>
          <select
            value={currentFilters.minRating}
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={currentFilters.isFeatured}
              onChange={(e) => handleFilterChange("isFeatured", e.target.checked)}
              className={cn("form-checkbox", "text-primary", "border-primary", "focus:ring-primary")}
            />
            <span className="text-sm">Featured Templates Only</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="rounded-lg border bg-card p-6">
          <FilterContent />
        </div>
      </div>
    </>
  );
}
