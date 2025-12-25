"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };
  

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("UI Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-red-500/30 bg-[#120a0a] p-4 text-sm text-red-400">
          Something went wrong while loading this section.
        </div>
      );
    }

    return this.props.children;
  }
}
