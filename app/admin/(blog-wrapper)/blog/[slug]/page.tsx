import BlogViewer from "@/app/_components/blog-components/blog-viewer";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "@/app/admin/_components/adminArrorPage";
import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Blogs" />}>
      <SuperAdminLayout title="Blogs">
        <BlogViewer slug={params.slug} />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}
