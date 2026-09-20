import React, { useState, useEffect } from 'react';
import { Palette, Check, Copy, Info, Sparkles } from 'lucide-react';
import { TonalPalette, TonalRoleSet, ThemeMode } from '../types';
import { TONE_STEPS } from '../utils/materialTheme';

interface TonalPaletteViewerProps {
  roles: TonalRoleSet;
  palettes: {
    primary: TonalPalette;
    secondary: TonalPalette;
    tertiary: TonalPalette;
    neutral: TonalPalette;
    neutralVariant: TonalPalette;
  };
  themeMode: ThemeMode;
}

export const TonalPaletteViewer: React.FC<TonalPaletteViewerProps> = ({
  roles,
  palettes,
  themeMode,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeToneInfo, setActiveToneInfo] = useState<{
    paletteName: string;
    tone: number;
    hex: string;
    roleNote?: string;
  }>({
    paletteName: 'Primary',
    tone: 40,
    hex: palettes.primary.tones[40] || '#6750A4',
    roleNote: 'Light Mode Primary / Dark Mode Inverse Primary',
  });

  const getRoleForTone = (palKey: string, tone: number): string => {
    const key = palKey.toLowerCase().replace(' ', '');
    if (key === 'primary') {
      if (tone === 40) return themeMode === 'light' ? 'Primary (Active Light Role)' : 'Inverse Primary';
      if (tone === 80) return themeMode === 'dark' ? 'Primary (Active Dark Role)' : 'Key Tonal Step';
      if (tone === 90) return themeMode === 'light' ? 'Primary Container (Active Light Role)' : 'On-Primary Container';
      if (tone === 30) return themeMode === 'dark' ? 'Primary Container (Active Dark Role)' : 'Key Tonal Step';
      if (tone === 10) return themeMode === 'light' ? 'On-Primary Container (Active)' : 'Key Step';
      if (tone === 100) return themeMode === 'light' ? 'On-Primary (White)' : 'Key Step';
      if (tone === 20) return themeMode === 'dark' ? 'On-Primary (Active Dark Contrast)' : 'Key Step';
    }
    if (key === 'secondary') {
      if (tone === 40) return themeMode === 'light' ? 'Secondary (Active Light Role)' : 'Key Step';
      if (tone === 80) return themeMode === 'dark' ? 'Secondary (Active Dark Role)' : 'Key Step';
      if (tone === 90) return themeMode === 'light' ? 'Secondary Container (Light)' : 'On-Secondary Container';
      if (tone === 30) return themeMode === 'dark' ? 'Secondary Container (Dark)' : 'Key Step';
    }
    if (key === 'neutral') {
      if (tone === 98) return themeMode === 'light' ? 'Surface (Active Light Base)' : 'Light Surface Spec';
      if (tone === 94) return themeMode === 'light' ? 'Surface Container (Light)' : 'Light Container';
      if (tone === 12) return themeMode === 'dark' ? 'Surface Container (Active Dark)' : 'Dark Container';
      if (tone === 6) return themeMode === 'dark' ? 'Surface (Active Dark Base)' : 'Dark Surface Spec';
      if (tone === 10) return themeMode === 'light' ? 'On-Surface (Active Light)' : 'Surface Container Low (Dark)';
      if (tone === 90) return themeMode === 'dark' ? 'On-Surface (Active Dark)' : 'Light Container Highest';
    }
    if (key.includes('variant')) {
      if (tone === 50) return themeMode === 'light' ? 'Outline (Active Light)' : 'Key Step';
      if (tone === 60) return themeMode === 'dark' ? 'Outline (Active Dark)' : 'Key Step';
      if (tone === 80) return themeMode === 'light' ? 'Outline Variant (Active Light)' : 'On-Surface Variant (Dark)';
      if (tone === 30) return themeMode === 'dark' ? 'Outline Variant (Active Dark)' : 'On-Surface Variant (Light)';
    }
    return `Tonal Step ${tone}`;
  };

  // Keep inspected tone hex strictly synced when seed or theme changes
  useEffect(() => {
    const paletteMap: Record<string, TonalPalette> = {
      'Primary': palettes.primary,
      'Secondary': palettes.secondary,
      'Tertiary': palettes.tertiary,
      'Neutral': palettes.neutral,
      'Neutral Variant': palettes.neutralVariant,
    };
    const pal = paletteMap[activeToneInfo.paletteName] || palettes.primary;
    const currentHex = pal.tones[activeToneInfo.tone] || pal.tones[40];
    if (currentHex) {
      setActiveToneInfo(prev => ({
        ...prev,
        hex: currentHex,
        roleNote: getRoleForTone(
          activeToneInfo.paletteName,
          activeToneInfo.tone
        ),
      }));
    }
  }, [palettes, themeMode]);

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const paletteList = [
    { key: 'primary', label: 'Primary (Brand Key)', pal: palettes.primary },
    { key: 'secondary', label: 'Secondary (Subtle Chroma)', pal: palettes.secondary },
    { key: 'tertiary', label: 'Tertiary (Accent Rotation +60°)', pal: palettes.tertiary },
    { key: 'neutral', label: 'Neutral (Surfaces & Backgrounds)', pal: palettes.neutral },
    { key: 'neutralVariant', label: 'Neutral Variant (Outlines & Borders)', pal: palettes.neutralVariant },
  ];

  return (
    <section id="tonal-palettes" className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{
                backgroundColor: roles.primaryContainer,
                color: roles.onPrimaryContainer,
              }}
            >
              <Palette className="w-3.5 h-3.5" />
              Dynamic Color Science
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: roles.onSurface }}>
              Algorithmic Tonal Palettes
            </h2>
            <p className="text-base md:text-lg max-w-2xl" style={{ color: roles.onSurfaceVariant }}>
              Material You computes 13 standardized perceptual tones (0 to 100) for every tonal family.
              Roles pair T40 with T100 or T90 with T10, mathematically ensuring AAA/AA legibility.
            </p>
          </div>

          {/* Active Inspector Pill */}
          <div
            className="p-4 rounded-3xl border shadow-sm flex items-center gap-4 w-full sm:w-auto flex-shrink-0"
            style={{
              backgroundColor: roles.surfaceContainer,
              borderColor: `${roles.outline}30`,
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl shadow-inner flex items-center justify-center font-bold text-xs border flex-shrink-0"
              style={{
                backgroundColor: activeToneInfo.hex,
                borderColor: `${roles.outline}40`,
                color: activeToneInfo.tone > 50 ? '#1C1B1F' : '#FFFFFF',
              }}
            >
              T{activeToneInfo.tone}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
                {activeToneInfo.paletteName}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold uppercase" style={{ color: roles.onSurface }}>
                  {activeToneInfo.hex}
                </span>
                <button
                  onClick={() => handleCopy(activeToneInfo.hex)}
                  className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  title="Copy Hex"
                  aria-label="Copy hex code"
                >
                  {copiedHex === activeToneInfo.hex ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-60" />
                  )}
                </button>
              </div>
              <div className="text-[11px] truncate max-w-[220px]" style={{ color: roles.onSurfaceVariant }}>
                {activeToneInfo.roleNote || `Tone ${activeToneInfo.tone}`}
              </div>
            </div>
          </div>
        </div>

        {/* Tonal Spectrum Strips */}
        <div
          className="rounded-[28px] sm:rounded-[32px] md:rounded-[40px] p-4 sm:p-6 md:p-10 border shadow-xl space-y-8"
          style={{
            backgroundColor: roles.surfaceContainerLow,
            borderColor: `${roles.outline}25`,
          }}
        >
          {paletteList.map(({ key, label, pal }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold gap-2">
                <span className="truncate" style={{ color: roles.onSurface }}>{label}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="md:hidden text-[10px] font-normal opacity-60">← Scroll →</span>
                  <span className="font-mono opacity-60 text-[11px] uppercase">
                    {pal.keyColor}
                  </span>
                </div>
              </div>

              {/* 13 tone blocks */}
              <div className="overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-none">
                <div
                  className="grid grid-cols-13 gap-1 md:gap-1.5 rounded-2xl p-1.5 border min-w-[560px] md:min-w-0"
                  style={{
                    backgroundColor: roles.surfaceContainer,
                    borderColor: `${roles.outline}20`,
                  }}
                >
                  {TONE_STEPS.map((step) => {
                    const hex = pal.tones[step];
                    const isSelected =
                      activeToneInfo.paletteName === pal.name && activeToneInfo.tone === step;
                    const isLight = step > 50;

                    return (
                      <button
                        key={step}
                        onClick={() => {
                          setActiveToneInfo({
                            paletteName: pal.name,
                            tone: step,
                            hex,
                            roleNote: getRoleForTone(key, step),
                          });
                        }}
                        className={`relative h-12 md:h-16 rounded-xl flex flex-col items-center justify-between py-1.5 md-tap transition-all ${
                          isSelected ? 'ring-2 ring-offset-2 scale-105 z-10 shadow-md' : 'hover:scale-102'
                        }`}
                        style={{
                          backgroundColor: hex,
                          color: isLight ? '#1C1B1F' : '#FFFFFF',
                        }}
                        title={`${pal.name} T${step}: ${hex}`}
                      >
                        <span className="text-[10px] md:text-xs font-bold leading-none">{step}</span>
                        <span className="text-[8px] md:text-[9px] font-mono opacity-80 leading-none hidden md:inline uppercase">
                          {hex.replace('#', '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Explanation Box */}
          <div
            className="p-5 rounded-2xl flex items-start gap-3 border text-xs leading-relaxed"
            style={{
              backgroundColor: roles.surfaceContainerHigh,
              borderColor: `${roles.outline}20`,
              color: roles.onSurfaceVariant,
            }}
          >
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: roles.primary }} />
            <div>
              <strong className="font-semibold" style={{ color: roles.onSurface }}>
                The Magic of Tonal Pairing:
              </strong>{' '}
              Notice how in Light mode, <strong>Primary (Tone 40)</strong> provides a guaranteed contrast ratio
              exceeding 4.5:1 against <strong>On-Primary (Tone 100)</strong>. Similarly,
              <strong> Primary Container (Tone 90)</strong> softly hosts <strong>On-Primary Container (Tone 10)</strong>.
              In Dark mode, the system automatically shifts to <strong>Tone 80 on Tone 20</strong>,
              preventing eye fatigue without losing chromatic vibrancy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
