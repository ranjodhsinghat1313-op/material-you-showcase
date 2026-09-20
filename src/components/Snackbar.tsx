import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { TonalRoleSet } from '../types';

interface SnackbarProps {
  message: string | null;
  onDismiss: () => void;
  roles: TonalRoleSet;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, onDismiss, roles }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-22 sm:bottom-8 left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 z-50 px-4 w-full sm:max-w-md pointer-events-none mx-auto">
      <div
        className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-medium animate-in fade-in slide-in-from-bottom-5 duration-300"
        style={{
          backgroundColor: roles.inverseSurface,
          color: roles.inverseOnSurface,
          borderColor: `${roles.outline}30`,
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: roles.inversePrimary }} />
          <span className="truncate">{message}</span>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 rounded-full transition-opacity flex-shrink-0 hover:opacity-80 md-tap"
          style={{ color: roles.inverseOnSurface }}
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
