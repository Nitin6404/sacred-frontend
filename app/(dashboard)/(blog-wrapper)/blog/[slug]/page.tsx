import BlogViewer from "@/app/_components/blog-components/blog-viewer";
import { cn } from "@/lib/utils";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <section className={cn("py-2 sm:py-4 xl:py-6")}>
      <BlogViewer slug={params.slug} userFacing />
    </section>
  );
}
