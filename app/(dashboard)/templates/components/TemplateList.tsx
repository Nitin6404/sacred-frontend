import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { useTemplateListMutation } from "@/app/_components/api/templates";
import { Template } from "@/types";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TemplateCard from "./TemplateCard";

interface Props {
  category?: string;
  searchQuery?: string;
}

export function TemplateList({ category, searchQuery }: Props) {
  const { data, isPending, total, nextPage, prevPage, isPrevPageAvailable, isNextPageAvailable } = usePaginatedFetch(
    useTemplateListMutation,
    {
      category,
      search: searchQuery
    }
  );

  const container = {
    hidden: {},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isPending && !data) {
    return <LoadingSpinner className="h-80 w-full" />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data?.map((template) => (
          <motion.div variants={item} key={template.id}>
            <TemplateCard onClick={() => {}} key={template.id} template={template as Template} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={prevPage} disabled={!isPrevPageAvailable || isPending}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" onClick={nextPage} disabled={!isNextPageAvailable || isPending}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
