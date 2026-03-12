"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message || "An unexpected error occurred." };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full p-8">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-card border border-gray-100">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
              <AlertTriangle className="text-brand-500" size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-400 mb-1">
              問題が発生しました
            </p>
            <p className="text-xs text-gray-400 mb-6 break-words">
              {this.state.message}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, message: "" })}
              className="bg-brand-500 text-white text-sm font-semibold rounded-full px-6 py-2.5 hover:bg-brand-600 shadow-float hover-lift"
            >
              Try Again / 再試行
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
