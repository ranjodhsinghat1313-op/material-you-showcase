/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PrinciplesSection } from './components/PrinciplesSection';
import { TonalPaletteViewer } from './components/TonalPaletteViewer';
import { ComponentShowcase } from './components/ComponentShowcase';
import { InteractiveAppDemo } from './components/InteractiveAppDemo';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { FloatingFAB } from './components/FloatingFAB';
import { Snackbar } from './components/Snackbar';
import { SeedPreset, ThemeMode } from './types';
import { SEED_PRESETS, generateMaterialTheme } from './utils/materialTheme';

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [selectedSeed, setSelectedSeed] = useState<SeedPreset>(SEED_PRESETS[0]);
  const [customHex, setCustomHex] = useState<string>('#6750A4');
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const activeSeedHex = selectedSeed.id === 'custom' ? customHex : selectedSeed.seedHex;

  // Compute Material You Dynamic Theme Roles and Tonal Palettes
  const { roles, palettes } = useMemo(() => {
    return generateMaterialTheme(activeSeedHex, themeMode);
  }, [activeSeedHex, themeMode]);

  // Synchronize dark mode class, color-scheme, and document body styles
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    if (roles?.surface) {
      document.body.style.backgroundColor = roles.surface;
    }
    if (roles?.onSurface) {
      document.body.style.color = roles.onSurface;
    }
  }, [themeMode, roles?.surface, roles?.onSurface]);

  const showSnackbar = (msg: string) => {
    setSnackbarMessage(msg);
    setTimeout(() => {
      setSnackbarMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleSelectSeed = (seed: SeedPreset) => {
    setSelectedSeed(seed);
    showSnackbar(`Applied Material You seed: ${seed.name}`);
  };

  const handleChangeCustomHex = (hex: string) => {
    setCustomHex(hex);
    setSelectedSeed({
      id: 'custom',
      name: 'Custom Palette',
      seedHex: hex,
      description: 'Custom user defined seed color',
    });
  };

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleExploreClick = () => {
    const el = document.getElementById('components');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="material-you-app"
      className="min-h-screen font-sans selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-500 relative overflow-x-hidden"
      style={{
        backgroundColor: roles.surface,
        color: roles.onSurface,
      }}
    >
      {/* Dynamic Global Background Gradients & Atmospheric Blur */}
      <div
        className="fixed inset-0 pointer-events-none -z-20 transition-all duration-700"
        style={{
          backgroundImage:
            themeMode === 'light'
              ? `radial-gradient(circle at 100% 0%, ${roles.secondaryContainer} 0%, transparent 40%), radial-gradient(circle at 0% 100%, ${roles.tertiaryContainer} 0%, transparent 40%)`
              : `radial-gradient(circle at 100% 0%, ${roles.secondaryContainer}35 0%, transparent 40%), radial-gradient(circle at 0% 100%, ${roles.tertiaryContainer}35 0%, transparent 40%)`,
        }}
      />

      {/* Main Navbar */}
      <Navbar
        roles={roles}
        themeMode={themeMode}
        onToggleTheme={toggleThemeMode}
        selectedSeed={selectedSeed}
        onSelectSeed={handleSelectSeed}
        customHex={customHex}
        onChangeCustomHex={handleChangeCustomHex}
      />

      <main>
        {/* 1. Hero Section */}
        <HeroSection
          roles={roles}
          themeMode={themeMode}
          onExploreClick={handleExploreClick}
        />

        {/* 2. Core Principles Section */}
        <PrinciplesSection roles={roles} themeMode={themeMode} />

        {/* 3. Algorithmic Tonal Palettes Inspector */}
        <TonalPaletteViewer
          roles={roles}
          palettes={palettes}
          themeMode={themeMode}
        />

        {/* 4. Tactile Component Primitives Showcase */}
        <ComponentShowcase
          roles={roles}
          themeMode={themeMode}
          onShowSnackbar={showSnackbar}
        />

        {/* 5. Live Material You App Specimen */}
        <InteractiveAppDemo
          roles={roles}
          themeMode={themeMode}
          onShowSnackbar={showSnackbar}
        />

        {/* 6. Newsletter / Input Demo */}
        <NewsletterSection
          roles={roles}
          themeMode={themeMode}
          onShowSnackbar={showSnackbar}
        />
      </main>

      {/* Footer */}
      <Footer roles={roles} />

      {/* Signature Floating Action Button (FAB) */}
      <FloatingFAB
        roles={roles}
        themeMode={themeMode}
        onToggleTheme={toggleThemeMode}
        selectedSeed={selectedSeed}
        onSelectSeed={handleSelectSeed}
        onShowSnackbar={showSnackbar}
      />

      {/* Notification Toast */}
      <Snackbar
        message={snackbarMessage}
        onDismiss={() => setSnackbarMessage(null)}
        roles={roles}
      />
    </div>
  );
}
