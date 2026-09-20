import React from 'react';
import { Layers, MousePointerClick, Sparkles, Shapes, ArrowUpRight } from 'lucide-react';
import { TonalRoleSet, ThemeMode } from '../types';

interface PrinciplesSectionProps {
  roles: TonalRoleSet;
  themeMode?: ThemeMode;
}

export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({ roles, themeMode = 'light' }) => {
  return (
    <section id="principles" className="py-20 md:py-28 px-4 md:px-8 border-t border-b transition-colors duration-500"
      style={{
        backgroundColor: `${roles.surfaceContainerLowest}`,
        borderColor: `${roles.outline}20`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{
              backgroundColor: roles.secondaryContainer,
              color: roles.onSecondaryContainer,
            }}
          >
            <Shapes className="w-3.5 h-3.5" />
            Core Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: roles.onSurface }}>
            The 4 Pillars of Material You
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
            Material Design 3 departs from rigid skeuomorphism and flat minimalism to embrace
            personalization, fluid organic shapes, and harmonious tonal physics.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Tonal Layering */}
          <div
            className="rounded-[32px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg border group cursor-default flex flex-col justify-between"
            style={{
              backgroundColor: roles.surfaceContainer,
              borderColor: `${roles.outline}20`,
            }}
          >
            <div>
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-6 shadow-xs"
                style={{
                  backgroundColor: roles.primaryContainer,
                  color: roles.onPrimaryContainer,
                }}
              >
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: roles.onSurface }}>
                Tonal Layering
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
                Instead of dark, harsh drop shadows, MD3 uses luminance surface containers
                (Low, Container, High) to structure elevation naturally.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t flex items-center justify-between text-xs font-semibold"
              style={{ borderColor: `${roles.outline}20`, color: roles.primary }}
            >
              <span>Tonal Elevation</span>
              <span className="font-mono text-[11px] opacity-75">
                {themeMode === 'light' ? 'T94 / T92' : 'T12 / T17'}
              </span>
            </div>
          </div>

          {/* Card 2: Tactile Response (Featured Hero Card) */}
          <div
            className="rounded-[32px] p-7 transition-all duration-300 md:-translate-y-4 hover:-translate-y-6 hover:shadow-2xl cursor-default flex flex-col justify-between shadow-lg"
            style={{
              backgroundColor: roles.primary,
              color: roles.onPrimary,
            }}
          >
            <div>
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-xs"
                style={{
                  backgroundColor: `${roles.onPrimary}20`,
                  color: roles.onPrimary,
                }}
              >
                <MousePointerClick className="w-6 h-6" style={{ color: roles.onPrimary }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: roles.onPrimary }}>
                Tactile Response
              </h3>
              <p className="text-sm leading-relaxed opacity-90" style={{ color: roles.onPrimary }}>
                Every interactive element scales with tactile resistance (`active:scale-95`)
                and uses the signature <code>cubic-bezier(0.2, 0, 0, 1)</code> emphasized motion.
              </p>
            </div>
            <div
              className="pt-6 mt-6 border-t flex items-center justify-between text-xs font-semibold"
              style={{
                borderColor: `${roles.onPrimary}30`,
                color: roles.onPrimary,
              }}
            >
              <span>Emphasized Motion</span>
              <ArrowUpRight className="w-4 h-4" style={{ color: roles.onPrimary }} />
            </div>
          </div>

          {/* Card 3: Atmospheric Depth */}
          <div
            className="rounded-[32px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg border group cursor-default flex flex-col justify-between"
            style={{
              backgroundColor: roles.surfaceContainer,
              borderColor: `${roles.outline}20`,
            }}
          >
            <div>
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-6 shadow-xs"
                style={{
                  backgroundColor: roles.tertiaryContainer,
                  color: roles.onTertiaryContainer,
                }}
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: roles.onSurface }}>
                Atmospheric Depth
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
                Gentle radial blurs and wallpaper color extraction simulate sunlight filtering
                through organic matter, bathing surfaces in warm color harmony.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t flex items-center justify-between text-xs font-semibold"
              style={{ borderColor: `${roles.outline}20`, color: roles.tertiary }}
            >
              <span>Chromatic Atmosphere</span>
              <span className="font-mono text-[11px] opacity-75">Blur 90px</span>
            </div>
          </div>

          {/* Card 4: Organic Radii */}
          <div
            className="rounded-[32px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg border group cursor-default flex flex-col justify-between"
            style={{
              backgroundColor: roles.surfaceContainer,
              borderColor: `${roles.outline}20`,
            }}
          >
            <div>
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-6 shadow-xs"
                style={{
                  backgroundColor: roles.secondaryContainer,
                  color: roles.onSecondaryContainer,
                }}
              >
                <Shapes className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: roles.onSurface }}>
                Organic Pill Radii
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
                Generous rounding (from 8px for chips to 48px for sections and pills for buttons)
                conveys safety, modern friendliness, and hand-held intimacy.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t flex items-center justify-between text-xs font-semibold"
              style={{ borderColor: `${roles.outline}20`, color: roles.secondary }}
            >
              <span>Shape Family</span>
              <span className="font-mono text-[11px] opacity-75">Pill to 48px</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
