import React, { StrictMode, Component, ReactNode, ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RootErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0c0d12] text-[#faedd0] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-[#161826] border border-[#d4af37]/40 shadow-2xl">
            <span className="font-calligraphy text-3xl font-bold text-gold-gradient block mb-3">
              Ahmed &amp; Sama
            </span>
            <p className="text-sm text-[#d1c7b7] mb-6">
              Engagement Celebration • Friday, October 2, 2026
            </p>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="px-5 py-2.5 text-xs font-semibold text-[#0c0d12] bg-gradient-to-r from-[#e8d0a9] via-[#d4af37] to-[#c59d5f] rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Reload Invitation
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>
);
