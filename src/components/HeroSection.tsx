import React, { useState } from 'react';
import { ArrowRight, Palette, Sparkles, Sliders, Check, Heart, Volume2 } from 'lucide-react';
import { TonalRoleSet, ThemeMode } from '../types';

interface HeroSectionProps {
  roles: TonalRoleSet;
  themeMode: ThemeMode;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  roles,
  themeMode,
  onExploreClick,
}) => {
  const [liked, setLiked] = useState(true);
  const [sliderVal, setSliderVal] = useState(72);
  const [activeChip, setActiveChip] = useState<'tonal' | 'dynamic' | 'organic'>('dynamic');

  return (
    <header id="hero" className="relative pt-12 md:pt-20 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden">
      {/* --- Atmospheric Background Shapes --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        {/* Primary atmospheric glow */}
        <div
          className="md-blur-shape -top-[15%] -right-[10%] w-[55%] h-[55%] animate-pulse"
          style={{
            backgroundColor: roles.primary,
            opacity: themeMode === 'light' ? 0.12 : 0.18,
          }}
        />
        {/* Tertiary atmospheric glow */}
        <div
          className="md-blur-shape top-[25%] -left-[12%] w-[45%] h-[45%]"
          style={{
            backgroundColor: roles.tertiary,
            opacity: themeMode === 'light' ? 0.08 : 0.14,
          }}
        />
        {/* Secondary soft puddle */}
        <div
          className="md-blur-shape bottom-[-15%] left-[25%] w-[65%] h-[55%]"
          style={{
            backgroundColor: roles.secondary,
            opacity: themeMode === 'light' ? 0.09 : 0.15,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Center content */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium mb-8 shadow-xs md-tap border cursor-default"
            style={{
              backgroundColor: roles.secondaryContainer,
              color: roles.onSecondaryContainer,
              borderColor: `${roles.outline}25`,
            }}
          >
            <Palette className="w-4 h-4" />
            <span>Adaptive Tonal System • MD3</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: roles.primary }} />
            <span className="font-mono text-[11px] opacity-80 uppercase">{roles.primary}</span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08]"
            style={{ color: roles.onSurface }}
          >
            Design that feels <br />
            <span
              className="italic font-extrabold relative inline-block transition-colors duration-500"
              style={{ color: roles.primary }}
            >
              personally
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 opacity-60"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 2 150 2 198 10"
                  stroke={roles.primary}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            yours.
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
            style={{ color: roles.onSurfaceVariant }}
          >
            A high-fidelity implementation of Google’s <strong>Material Design 3</strong>.
            Harmonious tonal surfaces, pill-shaped tactile controls, and organic atmospheric depth
            tailored dynamically to your brand’s seed color.
          </p>

          {/* CTA Button Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="w-full sm:w-auto h-13 sm:h-14 px-8 sm:px-10 rounded-full font-medium text-base sm:text-lg flex items-center justify-center gap-2.5 md-tap shadow-lg hover:shadow-xl transition-all"
              style={{
                backgroundColor: roles.primary,
                color: roles.onPrimary,
              }}
            >
              <span>Explore System</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              id="hero-tonal-btn"
              href="#tonal-palettes"
              className="w-full sm:w-auto h-13 sm:h-14 px-8 sm:px-10 rounded-full font-medium text-base sm:text-lg flex items-center justify-center gap-2 md-tap border-2 transition-all hover:bg-black/5 dark:hover:bg-white/5"
              style={{
                borderColor: roles.outline,
                color: roles.primary,
              }}
            >
              <span>Inspect Palette</span>
            </a>
          </div>
        </div>

        {/* Live Interactive MD3 Hero Preview Bento Card */}
        <div
          className="rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-xl border transition-all duration-300"
          style={{
            backgroundColor: roles.surfaceContainer,
            borderColor: `${roles.outline}30`,
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: MD3 Feature Highlights */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: roles.primaryContainer,
                  color: roles.onPrimaryContainer,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Live Dynamic Container
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: roles.onSurface }}>
                Tactile micro-interactions in every element.
              </h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
                Interact with the dynamic controls below. Observe how state layers, active squishy scales,
                and tonal contrast maintain strict WCAG accessibility across both light and dark modes.
              </p>

              {/* Filter Chips demo */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => setActiveChip('dynamic')}
                  className="px-4 py-2 rounded-full text-xs font-medium md-tap border flex items-center gap-1.5 transition-all"
                  style={{
                    backgroundColor: activeChip === 'dynamic' ? roles.secondaryContainer : 'transparent',
                    color: activeChip === 'dynamic' ? roles.onSecondaryContainer : roles.onSurfaceVariant,
                    borderColor: activeChip === 'dynamic' ? roles.secondary : roles.outline,
                  }}
                >
                  {activeChip === 'dynamic' && <Check className="w-3.5 h-3.5" />}
                  Dynamic Color (Monet)
                </button>
                <button
                  onClick={() => setActiveChip('tonal')}
                  className="px-4 py-2 rounded-full text-xs font-medium md-tap border flex items-center gap-1.5 transition-all"
                  style={{
                    backgroundColor: activeChip === 'tonal' ? roles.secondaryContainer : 'transparent',
                    color: activeChip === 'tonal' ? roles.onSecondaryContainer : roles.onSurfaceVariant,
                    borderColor: activeChip === 'tonal' ? roles.secondary : roles.outline,
                  }}
                >
                  {activeChip === 'tonal' && <Check className="w-3.5 h-3.5" />}
                  Tonal Surface Layering
                </button>
                <button
                  onClick={() => setActiveChip('organic')}
                  className="px-4 py-2 rounded-full text-xs font-medium md-tap border flex items-center gap-1.5 transition-all"
                  style={{
                    backgroundColor: activeChip === 'organic' ? roles.secondaryContainer : 'transparent',
                    color: activeChip === 'organic' ? roles.onSecondaryContainer : roles.onSurfaceVariant,
                    borderColor: activeChip === 'organic' ? roles.secondary : roles.outline,
                  }}
                >
                  {activeChip === 'organic' && <Check className="w-3.5 h-3.5" />}
                  Organic Radii (24-48px)
                </button>
              </div>
            </div>

            {/* Right: Interactive Mini Specimen Card */}
            <div
              className="w-full lg:w-96 rounded-[28px] p-6 shadow-md border space-y-5"
              style={{
                backgroundColor: roles.surfaceContainerLow,
                borderColor: `${roles.outline}25`,
              }}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs"
                    style={{
                      backgroundColor: roles.tertiaryContainer,
                      color: roles.onTertiaryContainer,
                    }}
                  >
                    MD3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold leading-tight" style={{ color: roles.onSurface }}>
                      Adaptive Player
                    </h4>
                    <span className="text-xs" style={{ color: roles.onSurfaceVariant }}>
                      Harmonized Tones
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setLiked(!liked)}
                  className="w-9 h-9 rounded-full flex items-center justify-center md-tap transition-all"
                  style={{
                    backgroundColor: liked ? roles.primaryContainer : 'transparent',
                    color: liked ? roles.onPrimaryContainer : roles.onSurfaceVariant,
                  }}
                  title="Like"
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Slider Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-1.5" style={{ color: roles.onSurfaceVariant }}>
                    <Volume2 className="w-3.5 h-3.5" />
                    Atmospheric Intensity
                  </span>
                  <span className="font-mono font-bold text-xs" style={{ color: roles.primary }}>
                    {sliderVal}%
                  </span>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full h-4 appearance-none cursor-pointer"
                    style={{
                      ['--md-thumb-color' as any]: roles.primary,
                      color: roles.primary,
                    }}
                  />
                </div>
              </div>

              {/* Mini Button Trio */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  className="py-2.5 px-4 rounded-full text-xs font-medium md-tap shadow-xs flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor: roles.primary,
                    color: roles.onPrimary,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Primary Pill
                </button>
                <button
                  className="py-2.5 px-4 rounded-full text-xs font-medium md-tap border flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor: roles.secondaryContainer,
                    color: roles.onSecondaryContainer,
                    borderColor: `${roles.outline}20`,
                  }}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Tonal Pill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
