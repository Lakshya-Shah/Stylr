'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between p-4 bg-[#29221D] text-[#FAF9F6] shadow-xl border border-[#3E342D] rounded-none transition-all duration-300 animate-slide-up"
        >
          <div className="flex items-center space-x-3 text-sm font-medium">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#C49B74] flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#A77B55] flex-shrink-0" />}
            <span className="leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-[#FAF9F6]/60 hover:text-[#FAF9F6] ml-3 p-1 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
