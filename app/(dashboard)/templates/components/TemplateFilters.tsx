"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTemplates } from "@/hooks/useTemplates";

const CATEGORIES = ["Wedding", "Engagement", "Reception"];
const LANGUAGES = ["English", "Bengali"];
const CULTURAL_ELEMENTS = ["Traditional", "Modern", "Fusion"];

export default function TemplateFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { applyFilters } = useTemplates();

  const currentFilters = {
    category: searchParams.get("category") || "",
    language: searchParams.get("language") || "",
    culturalElement: searchParams.get("culturalElement") || "",
    minRating: searchParams.get("minRating") || "",
    isFeatured: searchParams.get("isFeatured") === "true"
  };

  const handleFilterChange = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "" || value === false) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    // Update URL without page reload
    router.push(`/templates?${params.toString()}`);

    // Apply filters
    applyFilters(Object.fromEntries(params.entries()));
  };

  const clearFilters = () => {
    router.push("/templates");
    applyFilters({});
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Category</h3>
        {CATEGORIES.map((category) => (
          <label key={category} className="mb-2 flex items-center space-x-2">
            <input
              type="radio"
              name="category"
              value={category}
              checked={currentFilters.category === category}
              onChange={() => handleFilterChange("category", category)}
              className="form-radio text-blue-500"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Language</h3>
        {LANGUAGES.map((language) => (
          <label key={language} className="mb-2 flex items-center space-x-2">
            <input
              type="radio"
              name="language"
              value={language}
              checked={currentFilters.language === language}
              onChange={() => handleFilterChange("language", language)}
              className="form-radio text-blue-500"
            />
            <span>{language}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Cultural Elements</h3>
        {CULTURAL_ELEMENTS.map((element) => (
          <label key={element} className="mb-2 flex items-center space-x-2">
            <input
              type="radio"
              name="culturalElement"
              value={element}
              checked={currentFilters.culturalElement === element}
              onChange={() => handleFilterChange("culturalElement", element)}
              className="form-radio text-blue-500"
            />
            <span>{element}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Rating</h3>
        <select
          value={currentFilters.minRating}
          onChange={(e) => handleFilterChange("minRating", e.target.value)}
          className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={currentFilters.isFeatured}
            onChange={(e) => handleFilterChange("isFeatured", e.target.checked)}
            className="form-checkbox text-blue-500"
          />
          <span>Featured Templates</span>
        </label>
      </div>

      <button
        onClick={clearFilters}
        className="w-full rounded bg-red-500 py-2 text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Clear Filters
      </button>
    </div>
  );
}
