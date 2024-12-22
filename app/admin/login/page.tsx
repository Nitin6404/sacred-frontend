"use client";

import { userAuthTypes } from "@/types";
import LoginForm from "@/components/forms/auth/login";
import { useAdminLoginMutation } from "@/components/api";
import { ErrorBoundary } from "@/components/errorBoundary";

const AdminLogin = () => {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex h-screen items-center justify-center p-4 lg:p-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">An error occured</h1>
          </div>
        </div>
      }
    >
      <div className="flex h-screen items-center justify-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login to your admin account</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials below to login.</p>
          </div>

          <LoginForm type={userAuthTypes.super_admin} useMutation={useAdminLoginMutation} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminLogin;
