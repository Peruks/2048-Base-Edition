"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
                    <p className="text-gray-400 mb-6 max-w-md">
                        We encountered an unexpected error.
                        <br />
                        <span className="text-xs font-mono bg-gray-900 p-1 rounded block mt-2">
                            {this.state.error?.message}
                        </span>
                    </p>
                    <button
                        onClick={this.handleReset}
                        className="px-6 py-3 bg-base-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                    >
                        Reset Game Data
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
