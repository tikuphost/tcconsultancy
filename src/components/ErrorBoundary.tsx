import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B1F3A] text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading mb-2">
              Application Notice
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-sans mb-4">
              The application encountered an unexpected runtime error. You can reload the page or clear local cached data to restore normal operation.
            </p>

            {this.state.error && (
              <div className="bg-slate-100 p-3 rounded-lg text-left text-[11px] font-mono text-rose-700 overflow-x-auto mb-5 border border-slate-200">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#071528] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleReset}
                className="px-4 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
              >
                <span>Clear Cache & Reset</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
