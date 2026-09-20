import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Sun, Moon, Palette, Menu, X, Check, Droplets } from 'lucide-react';
import { SeedPreset, ThemeMode, TonalRoleSet } from '../types';
import { SEED_PRESETS } from '../utils/materialTheme';

interface NavbarProps {
  roles: TonalRoleSet;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  selectedSeed: SeedPreset;
  onSelectSeed: (seed: SeedPreset) => void;
  customHex: string;
  onChangeCustomHex: (hex: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  roles,
  themeMode,
  onToggleTheme,
  selectedSeed,
  onSelectSeed,
  customHex,
  onChangeCustomHex,
}) => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPaletteOpen(false);
      }
    };
    if (paletteOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [paletteOpen]);

  return (
    <nav
      id="main-navbar"
      className="sticky top-0 z-40 px-4 md:px-8 py-3 transition-colors duration-300 border-b backdrop-blur-xl"
      style={{
        backgroundColor: `${roles.surface}DD`,
        borderColor: `${roles.outline}20`,
        color: roles.onSurface,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 font-bold text-lg md:text-xl tracking-tight group focus:outline-none"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm"
            style={{
              backgroundColor: roles.primary,
              color: roles.onPrimary,
            }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="flex items-center gap-1 font-medium">
            Material<span style={{ color: roles.primary }} className="font-bold">You</span>
            <span
              className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full ml-1"
              style={{
                backgroundColor: roles.secondaryContainer,
                color: roles.onSecondaryContainer,
              }}
            >
              MD3
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <a
            href="#principles"
            className="transition-colors hover:opacity-80"
            style={{ color: roles.onSurfaceVariant }}
          >
            Principles
          </a>
          <a
            href="#components"
            className="transition-colors hover:opacity-80"
            style={{ color: roles.onSurfaceVariant }}
          >
            Components
          </a>
          <a
            href="#tonal-palettes"
            className="transition-colors hover:opacity-80"
            style={{ color: roles.onSurfaceVariant }}
          >
            Tonal Palettes
          </a>
          <a
            href="#playground"
            className="transition-colors hover:opacity-80"
            style={{ color: roles.onSurfaceVariant }}
          >
            Live App Demo
          </a>
        </div>

        {/* Controls: Palette Picker, Theme Toggle, CTA */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Dynamic Seed Picker Popover Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="seed-picker-btn"
              onClick={() => setPaletteOpen(!paletteOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium md-tap border transition-all md-state-layer"
              style={{
                backgroundColor: roles.surfaceContainerLow,
                color: roles.onSurface,
                borderColor: paletteOpen ? roles.primary : `${roles.outline}30`,
              }}
              title="Change Dynamic Seed Color"
              aria-expanded={paletteOpen}
            >
              <div
                className="w-3.5 h-3.5 rounded-full ring-1 ring-white/50 shadow-inner"
                style={{ backgroundColor: selectedSeed.seedHex }}
              />
              <span className="hidden sm:inline font-semibold">{selectedSeed.name}</span>
              <Palette className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Seed Picker Dropdown */}
            {paletteOpen && (
              <div
                className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-72 p-4 rounded-3xl shadow-xl border z-50 animate-in fade-in zoom-in-95 duration-200"
                style={{
                  backgroundColor: roles.surfaceContainer,
                  borderColor: `${roles.outline}30`,
                  color: roles.onSurface,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider opacity-80">
                    <Droplets className="w-3.5 h-3.5" style={{ color: roles.primary }} />
                    Dynamic Seed Color
                  </div>
                  <button
                    onClick={() => setPaletteOpen(false)}
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 min-w-[32px] min-h-[32px] flex items-center justify-center"
                    aria-label="Close seed picker"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
                  Material You extracts algorithmic tonal roles from a single key seed color.
                </p>

                {/* Preset Chips */}
                <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {SEED_PRESETS.map((preset) => {
                    const isSelected = selectedSeed.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          onSelectSeed(preset);
                          setPaletteOpen(false);
                        }}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left text-xs font-medium transition-all md-tap"
                        style={{
                          backgroundColor: isSelected ? roles.secondaryContainer : 'transparent',
                          color: isSelected ? roles.onSecondaryContainer : roles.onSurface,
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full shadow-sm flex-shrink-0"
                            style={{ backgroundColor: preset.seedHex }}
                          />
                          <span>{preset.name}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Input */}
                <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                  <label className="text-xs font-medium" style={{ color: roles.onSurfaceVariant }}>
                    Custom Hex:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customHex}
                      onChange={(e) => onChangeCustomHex(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={customHex}
                      onChange={(e) => onChangeCustomHex(e.target.value)}
                      placeholder="#6750A4"
                      className="w-20 px-2 py-1.5 text-xs rounded-lg border font-mono uppercase text-center"
                      style={{
                        backgroundColor: roles.surfaceContainerLow,
                        borderColor: roles.outline,
                        color: roles.onSurface,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Mode Toggle (Light / Dark) */}
          <button
            id="theme-mode-btn"
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center md-tap border transition-all"
            style={{
              backgroundColor: roles.surfaceContainerLow,
              color: roles.onSurface,
              borderColor: `${roles.outline}30`,
            }}
            title={themeMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Primary CTA Button */}
          <a
            href="#components"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-xs font-medium md-tap shadow-sm transition-all hover:shadow-md"
            style={{
              backgroundColor: roles.primary,
              color: roles.onPrimary,
            }}
          >
            Explore System
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center md-tap"
            style={{
              backgroundColor: roles.surfaceContainerLow,
              color: roles.onSurface,
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden mt-3 pt-3 border-t flex flex-col gap-1.5 pb-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
          style={{ borderColor: `${roles.outline}20` }}
        >
          <a
            href="#principles"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 active:scale-98"
            style={{ color: roles.onSurface }}
          >
            Principles
          </a>
          <a
            href="#components"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 active:scale-98"
            style={{ color: roles.onSurface }}
          >
            Components
          </a>
          <a
            href="#tonal-palettes"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 active:scale-98"
            style={{ color: roles.onSurface }}
          >
            Tonal Palettes
          </a>
          <a
            href="#playground"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 active:scale-98"
            style={{ color: roles.onSurface }}
          >
            Live App Demo
          </a>
        </div>
      )}
    </nav>
  );
};
