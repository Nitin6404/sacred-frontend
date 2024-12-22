"use client";

import React, { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{ fallback: ReactNode }>;

export class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    // console.warn({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
