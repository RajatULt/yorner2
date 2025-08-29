import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastNotificationProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onRemove }) => {
  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(toast.id);
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, onRemove]);

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'error':
        return <XCircle size={20} className="text-red-600" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-600" />;
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm w-full ${getToastStyles(toast.type)} border rounded-lg shadow-lg p-4 animate-in slide-in-from-right-5 duration-300`}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getToastIcon(toast.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{toast.title}</h4>
              <p className="text-sm opacity-90 mt-1">{toast.message}</p>
              
              {/* Action Button */}
              {toast.action && (
                <button
                  onClick={toast.action.onClick}
                  className="mt-2 text-sm font-medium underline hover:no-underline transition-all"
                >
                  {toast.action.label}
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => onRemove(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Progress Bar */}
          {toast.duration && toast.duration > 0 && (
            <div className="mt-3 w-full bg-black/10 rounded-full h-1">
              <div
                className="h-1 bg-current rounded-full animate-pulse"
                style={{
                  animation: `shrink ${toast.duration}ms linear forwards`
                }}
              />
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Toast Hook
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (title: string, message: string, action?: Toast['action']) => {
    addToast({ type: 'success', title, message, action });
  };

  const showError = (title: string, message: string, action?: Toast['action']) => {
    addToast({ type: 'error', title, message, action });
  };

  const showWarning = (title: string, message: string, action?: Toast['action']) => {
    addToast({ type: 'warning', title, message, action });
  };

  const showInfo = (title: string, message: string, action?: Toast['action']) => {
    addToast({ type: 'info', title, message, action });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    ToastContainer: () => <ToastNotification toasts={toasts} onRemove={removeToast} />
  };
};

export default ToastNotification;