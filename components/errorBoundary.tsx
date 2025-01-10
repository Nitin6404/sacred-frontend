"use client";

import React, { Component, ReactNode } from "react";
import { toast } from "./ui/use-toast";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log to error tracking service (you can add Sentry or other service here)
    console.error("Error caught by boundary:", error, errorInfo);

    // Show user-friendly error message
    toast({
      title: "Error",
      description: "Something went wrong. Our team has been notified.",
      variant: "destructive"
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full items-center justify-center p-4">
            <div className="text-center">
              <h2 className="mb-2 text-lg font-semibold">Something went wrong</h2>
              <p className="mb-4 text-sm text-gray-500">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
