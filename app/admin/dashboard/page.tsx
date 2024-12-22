import { SuperAdminLayout } from "../_components/adminLayout";
import AdminDashboardCards from "../_components/adminDashboard";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../_components/adminArrorPage";

function AdminDashboard() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Dashboard" />}>
      <SuperAdminLayout title="Dashboard">
        <AdminDashboardCards />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default AdminDashboard;
