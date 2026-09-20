import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Sun, Moon, Palette, ArrowUp } from 'lucide-react';
import { SeedPreset, ThemeMode, TonalRoleSet } from '../types';
import { SEED_PRESETS } from '../utils/materialTheme';

interface FloatingFABProps {
  roles: TonalRoleSet;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  selectedSeed: SeedPreset;
  onSelectSeed: (seed: SeedPreset) => void;
  onShowSnackbar: (msg: string) => void;
}

export const FloatingFAB: React.FC<FloatingFABProps> = ({
  roles,
  themeMode,
  onToggleTheme,
  selectedSeed,
  onSelectSeed,
  onShowSnackbar,
}) => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setExpanded(false);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [expanded]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Quick Action Pills */}
      {expanded && (
        <div className="flex flex-col items-end gap-2.5 mb-2 animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-200">
          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg md-tap border md-state-layer"
            style={{
              backgroundColor: roles.surfaceContainerHigh,
              borderColor: `${roles.outline}30`,
              color: roles.onSurface,
            }}
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>

          {/* Toggle Theme */}
          <button
            onClick={() => {
              onToggleTheme();
              onShowSnackbar(themeMode === 'light' ? 'Dark mode enabled' : 'Light mode enabled');
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg md-tap border md-state-layer"
            style={{
              backgroundColor: roles.surfaceContainerHigh,
              borderColor: `${roles.outline}30`,
              color: roles.onSurface,
            }}
          >
            <span>{themeMode === 'light' ? 'Dark Theme' : 'Light Theme'}</span>
            {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Cycle Next Seed Color */}
          <button
            onClick={() => {
              const currIdx = SEED_PRESETS.findIndex(p => p.id === selectedSeed.id);
              const nextPreset = SEED_PRESETS[(currIdx + 1) % SEED_PRESETS.length];
              onSelectSeed(nextPreset);
              onShowSnackbar(`Switched seed to ${nextPreset.name}`);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg md-tap border md-state-layer"
            style={{
              backgroundColor: roles.surfaceContainerHigh,
              borderColor: `${roles.outline}30`,
              color: roles.onSurface,
            }}
          >
            <span>Next Seed: {selectedSeed.name}</span>
            <div
              className="w-3.5 h-3.5 rounded-full shadow-inner ring-1 ring-white/40"
              style={{ backgroundColor: selectedSeed.seedHex }}
            />
          </button>
        </div>
      )}

      {/* Main Material 3 FAB */}
      <button
        id="main-fab"
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[24px] shadow-xl flex items-center justify-center md-tap transition-all duration-300 hover:scale-105 active:rounded-full group md-state-layer"
        style={{
          backgroundColor: roles.tertiaryContainer,
          color: roles.onTertiaryContainer,
        }}
        title="Material You Quick Actions"
        aria-expanded={expanded}
        aria-label="Toggle quick actions"
      >
        {expanded ? (
          <X className="w-7 h-7 transition-transform duration-200 rotate-90" />
        ) : (
          <Plus className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-200 group-hover:rotate-90" />
        )}
      </button>
    </div>
  );
};
