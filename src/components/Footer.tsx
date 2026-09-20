import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { TonalRoleSet } from '../types';

interface FooterProps {
  roles: TonalRoleSet;
}

export const Footer: React.FC<FooterProps> = ({ roles }) => {
  return (
    <footer
      className="py-14 px-4 md:px-8 border-t transition-colors duration-300"
      style={{
        backgroundColor: roles.surfaceContainerLow,
        borderColor: `${roles.outline}20`,
        color: roles.onSurfaceVariant,
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        {/* Brand */}
        <div className="flex items-center gap-2 font-bold text-base" style={{ color: roles.onSurface }}>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs"
            style={{
              backgroundColor: roles.primary,
              color: roles.onPrimary,
            }}
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <span>
            Material <span style={{ color: roles.primary }}>You</span>
          </span>
          <span className="text-xs opacity-60 font-normal">| Material Design 3 Spec</span>
        </div>

        {/* Notice */}
        <p className="text-xs text-center flex items-center gap-1.5" style={{ color: roles.onSurfaceVariant }}>
          <span>Crafted with algorithmic tonal harmony</span>
          <Heart className="w-3.5 h-3.5 fill-current opacity-70" style={{ color: roles.tertiary }} />
          <span>and organic radii</span>
        </p>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs font-semibold">
          <a
            href="#principles"
            className="hover:opacity-80 transition-colors"
            style={{ color: roles.onSurface }}
          >
            Principles
          </a>
          <a
            href="#components"
            className="hover:opacity-80 transition-colors"
            style={{ color: roles.onSurface }}
          >
            Components
          </a>
          <a
            href="#tonal-palettes"
            className="hover:opacity-80 transition-colors"
            style={{ color: roles.onSurface }}
          >
            Tonal System
          </a>
          <a
            href="#playground"
            className="hover:opacity-80 transition-colors"
            style={{ color: roles.onSurface }}
          >
            Playground
          </a>
        </div>
      </div>
    </footer>
  );
};
