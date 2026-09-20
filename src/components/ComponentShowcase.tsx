import React, { useState } from 'react';
import { 
  Plus, 
  Sparkles, 
  Send, 
  Heart, 
  Bookmark, 
  Check, 
  Sliders, 
  Search, 
  Bell, 
  Eye, 
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';
import { TonalRoleSet, ThemeMode } from '../types';

interface ComponentShowcaseProps {
  roles: TonalRoleSet;
  themeMode: ThemeMode;
  onShowSnackbar: (msg: string) => void;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  roles,
  themeMode,
  onShowSnackbar,
}) => {
  // Interactive component states
  const [filledInputText, setFilledInputText] = useState('ranjodhsingh@material.design');
  const [outlinedInputText, setOutlinedInputText] = useState('');
  const [isOutlinedFocused, setIsOutlinedFocused] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [sliderVal, setSliderVal] = useState(65);
  const [filterChips, setFilterChips] = useState({
    photos: true,
    documents: false,
    audio: true,
    starred: false,
  });
  const [activeTab, setActiveTab] = useState<'buttons' | 'cards' | 'inputs' | 'controls'>('buttons');

  return (
    <section id="components" className="py-20 md:py-28 px-4 md:px-8 border-t"
      style={{
        backgroundColor: roles.surface,
        borderColor: `${roles.outline}20`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{
              backgroundColor: roles.tertiaryContainer,
              color: roles.onTertiaryContainer,
            }}
          >
            <Layers className="w-3.5 h-3.5" />
            MD3 Component Library
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: roles.onSurface }}>
            Tactile Component Primitives
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
            Crafted strictly in accordance with Google’s Material Design 3 guidelines:
            organic radii, 5 distinct button tiers, floating label textfields, and responsive state layers.
          </p>

          {/* Segmented Filter Pills */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8 w-full max-w-xl mx-auto">
            {(['buttons', 'cards', 'inputs', 'controls'] as const).map((tab) => {
              const isSelected = activeTab === tab;
              const labels = {
                buttons: 'Buttons & FABs',
                cards: 'Surface Cards',
                inputs: 'Filled & Outlined',
                controls: 'Switches & Chips',
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium md-tap border transition-all text-center"
                  style={{
                    backgroundColor: isSelected ? roles.primary : roles.surfaceContainerLow,
                    color: isSelected ? roles.onPrimary : roles.onSurface,
                    borderColor: isSelected ? roles.primary : `${roles.outline}30`,
                  }}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. BUTTONS & FABS */}
        {activeTab === 'buttons' && (
          <div
            className="rounded-[28px] sm:rounded-[32px] md:rounded-[40px] p-4 sm:p-7 md:p-12 border shadow-lg space-y-8 sm:space-y-12"
            style={{
              backgroundColor: roles.surfaceContainerLow,
              borderColor: `${roles.outline}25`,
            }}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: roles.onSurface }}>
                The 5 Button Tiers
              </h3>
              <p className="text-sm mb-6" style={{ color: roles.onSurfaceVariant }}>
                Material Design 3 defines 5 distinct hierarchy levels for buttons to guide visual priority.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {/* 1. Filled Button (Primary) */}
                <button
                  onClick={() => onShowSnackbar('Pressed Filled Button (Primary Tier)')}
                  className="px-6 py-3 rounded-full text-sm font-medium md-tap shadow-sm hover:shadow-md flex items-center gap-2"
                  style={{
                    backgroundColor: roles.primary,
                    color: roles.onPrimary,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Filled Button</span>
                </button>

                {/* 2. Tonal Button (Secondary Tier) */}
                <button
                  onClick={() => onShowSnackbar('Pressed Tonal Button (Secondary Tier)')}
                  className="px-6 py-3 rounded-full text-sm font-medium md-tap shadow-xs hover:shadow-sm flex items-center gap-2"
                  style={{
                    backgroundColor: roles.secondaryContainer,
                    color: roles.onSecondaryContainer,
                  }}
                >
                  <span>Tonal Button</span>
                </button>

                {/* 3. Elevated Button */}
                <button
                  onClick={() => onShowSnackbar('Pressed Elevated Button')}
                  className="px-6 py-3 rounded-full text-sm font-medium md-tap shadow-md hover:shadow-lg flex items-center gap-2 border"
                  style={{
                    backgroundColor: roles.surfaceContainerHighest,
                    color: roles.primary,
                    borderColor: `${roles.outline}15`,
                  }}
                >
                  <span>Elevated</span>
                </button>

                {/* 4. Outlined Button */}
                <button
                  onClick={() => onShowSnackbar('Pressed Outlined Button')}
                  className="px-6 py-3 rounded-full text-sm font-medium md-tap border-2 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    borderColor: roles.outline,
                    color: roles.primary,
                  }}
                >
                  <span>Outlined</span>
                </button>

                {/* 5. Text Button */}
                <button
                  onClick={() => onShowSnackbar('Pressed Text Button')}
                  className="px-4 py-3 rounded-full text-sm font-medium md-tap hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    color: roles.primary,
                  }}
                >
                  <span>Text Button</span>
                </button>
              </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="pt-8 border-t" style={{ borderColor: `${roles.outline}20` }}>
              <h4 className="text-lg font-bold mb-2" style={{ color: roles.onSurface }}>
                Floating Action Buttons (FABs)
              </h4>
              <p className="text-sm mb-6" style={{ color: roles.onSurfaceVariant }}>
                MD3 replaces standard circular FABs with rounded squares (radius: 16px - 28px) and extended pill formats.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                {/* Standard FAB */}
                <button
                  onClick={() => onShowSnackbar('Pressed Primary FAB')}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center md-tap shadow-lg hover:shadow-xl transition-all"
                  style={{
                    backgroundColor: roles.primaryContainer,
                    color: roles.onPrimaryContainer,
                  }}
                  title="Standard FAB"
                >
                  <Plus className="w-6 h-6" />
                </button>

                {/* Tertiary Colored FAB */}
                <button
                  onClick={() => onShowSnackbar('Pressed Tertiary FAB')}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center md-tap shadow-lg hover:shadow-xl transition-all"
                  style={{
                    backgroundColor: roles.tertiaryContainer,
                    color: roles.onTertiaryContainer,
                  }}
                  title="Tertiary FAB"
                >
                  <Sparkles className="w-6 h-6" />
                </button>

                {/* Extended FAB */}
                <button
                  onClick={() => onShowSnackbar('Pressed Extended FAB')}
                  className="h-14 px-6 rounded-2xl flex items-center gap-3 md-tap shadow-lg hover:shadow-xl transition-all text-sm font-medium"
                  style={{
                    backgroundColor: roles.primary,
                    color: roles.onPrimary,
                  }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Compose New Note</span>
                </button>

                {/* Surface Colored FAB */}
                <button
                  onClick={() => onShowSnackbar('Pressed Surface FAB')}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center md-tap shadow-md hover:shadow-lg border"
                  style={{
                    backgroundColor: roles.surfaceContainerHigh,
                    color: roles.primary,
                    borderColor: `${roles.outline}30`,
                  }}
                  title="Surface Color FAB"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. CARDS */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Elevated Card */}
            <div
              className="rounded-[28px] p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border flex flex-col justify-between"
              style={{
                backgroundColor: roles.surfaceContainerLowest,
                borderColor: `${roles.outline}15`,
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: roles.primaryContainer,
                    color: roles.onPrimaryContainer,
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: roles.onSurface }}>
                  Elevated Card
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
                  Elevated cards gain physical distinction through soft ambient lighting and elevation layers.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t flex items-center justify-between"
                style={{ borderColor: `${roles.outline}15` }}
              >
                <span className="text-xs font-semibold" style={{ color: roles.primary }}>
                  Elevation +1
                </span>
                <button
                  onClick={() => onShowSnackbar('Action from Elevated Card')}
                  className="px-3 py-1.5 rounded-full text-xs font-medium md-tap"
                  style={{
                    backgroundColor: roles.secondaryContainer,
                    color: roles.onSecondaryContainer,
                  }}
                >
                  Action
                </button>
              </div>
            </div>

            {/* Filled Card */}
            <div
              className="rounded-[28px] p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
              style={{
                backgroundColor: roles.surfaceContainerHighest,
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: roles.secondaryContainer,
                    color: roles.onSecondaryContainer,
                  }}
                >
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: roles.onSurface }}>
                  Filled Card
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
                  Uses solid Surface Container Highest fill with zero shadow, prioritizing tonal separation over elevation.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t flex items-center justify-between"
                style={{ borderColor: `${roles.outline}20` }}
              >
                <span className="text-xs font-semibold" style={{ color: roles.secondary }}>
                  Flat Tonal Fill
                </span>
                <button
                  onClick={() => onShowSnackbar('Action from Filled Card')}
                  className="px-3 py-1.5 rounded-full text-xs font-medium md-tap"
                  style={{
                    backgroundColor: roles.primary,
                    color: roles.onPrimary,
                  }}
                >
                  Select
                </button>
              </div>
            </div>

            {/* Outlined Card */}
            <div
              className="rounded-[28px] p-6 transition-all duration-300 hover:scale-[1.02] border-2 flex flex-col justify-between"
              style={{
                backgroundColor: roles.surface,
                borderColor: roles.outlineVariant,
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                  style={{
                    backgroundColor: roles.surfaceContainerLow,
                    borderColor: `${roles.outline}20`,
                    color: roles.onSurface,
                  }}
                >
                  <Bookmark className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: roles.onSurface }}>
                  Outlined Card
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
                  Defines container boundary using the Outline Variant token without elevation shadow or tonal fill.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t flex items-center justify-between"
                style={{ borderColor: `${roles.outline}20` }}
              >
                <span className="text-xs font-semibold" style={{ color: roles.onSurfaceVariant }}>
                  Boundary Line
                </span>
                <button
                  onClick={() => onShowSnackbar('Action from Outlined Card')}
                  className="px-3 py-1.5 rounded-full text-xs font-medium md-tap border"
                  style={{
                    borderColor: roles.outline,
                    color: roles.primary,
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. INPUTS */}
        {activeTab === 'inputs' && (
          <div
            className="rounded-[32px] md:rounded-[40px] p-6 md:p-12 border shadow-lg"
            style={{
              backgroundColor: roles.surfaceContainerLow,
              borderColor: `${roles.outline}25`,
            }}
          >
            <div className="max-w-2xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: roles.onSurface }}>
                  Material 3 Text Fields
                </h3>
                <p className="text-sm" style={{ color: roles.onSurfaceVariant }}>
                  Both the signature Filled style (rounded top corners, 2px active bottom stroke)
                  and the clean Outlined style with floating labels.
                </p>
              </div>

              {/* MD3 Filled Input with Animated Floating Label */}
              <div className="relative group">
                <input
                  id="demo-filled-input"
                  type="text"
                  value={filledInputText}
                  onChange={(e) => setFilledInputText(e.target.value)}
                  placeholder=" "
                  className="w-full h-15 px-4 pt-5 pb-1 rounded-t-xl text-base sm:text-sm font-medium border-b-2 outline-none transition-colors peer"
                  style={{
                    backgroundColor: roles.surfaceContainerHighest,
                    borderColor: roles.outline,
                    color: roles.onSurface,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = roles.primary;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = roles.outline;
                  }}
                />
                <label
                  htmlFor="demo-filled-input"
                  className="absolute left-4 top-2 text-[11px] font-medium transition-all pointer-events-none peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px]"
                  style={{
                    color: roles.primary,
                  }}
                >
                  Account Email (MD3 Filled Style)
                </label>
              </div>

              {/* MD3 Outlined Input */}
              <div className="relative group">
                <input
                  id="demo-outlined-input"
                  type="text"
                  value={outlinedInputText}
                  onChange={(e) => setOutlinedInputText(e.target.value)}
                  onFocus={() => setIsOutlinedFocused(true)}
                  onBlur={() => setIsOutlinedFocused(false)}
                  placeholder=" "
                  className="w-full h-14 px-4 rounded-xl text-base sm:text-sm font-medium border-2 outline-none bg-transparent transition-all duration-200"
                  style={{
                    borderColor: isOutlinedFocused ? roles.primary : roles.outline,
                    boxShadow: isOutlinedFocused ? `0 0 0 1px ${roles.primary}` : 'none',
                    color: roles.onSurface,
                  }}
                />
                <label
                  htmlFor="demo-outlined-input"
                  className="absolute left-3.5 top-4 text-sm font-medium pointer-events-none origin-top-left transition-all duration-200 select-none"
                  style={{
                    transform:
                      isOutlinedFocused || outlinedInputText.length > 0
                        ? 'translateY(-24px) scale(0.75)'
                        : 'translateY(0) scale(1)',
                    backgroundColor:
                      isOutlinedFocused || outlinedInputText.length > 0
                        ? roles.surfaceContainerLow
                        : 'transparent',
                    color: isOutlinedFocused
                      ? roles.primary
                      : roles.onSurfaceVariant,
                    paddingLeft: '6px',
                    paddingRight: '6px',
                    borderRadius: '4px',
                  }}
                >
                  Workspace Name (MD3 Outlined Style)
                </label>
              </div>

              {/* Search Bar Pill Style */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-full border shadow-xs"
                style={{
                  backgroundColor: roles.surfaceContainerHigh,
                  borderColor: `${roles.outline}20`,
                }}
              >
                <Search className="w-5 h-5 opacity-60" style={{ color: roles.onSurface }} />
                <input
                  type="text"
                  placeholder="Search design tokens, icons, typography..."
                  className="bg-transparent border-0 outline-none text-sm w-full font-medium placeholder:opacity-50"
                  style={{ color: roles.onSurface }}
                />
                <button
                  onClick={() => onShowSnackbar('Searching design tokens...')}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. CONTROLS & CHIPS */}
        {activeTab === 'controls' && (
          <div
            className="rounded-[32px] md:rounded-[40px] p-6 md:p-12 border shadow-lg space-y-10"
            style={{
              backgroundColor: roles.surfaceContainerLow,
              borderColor: `${roles.outline}25`,
            }}
          >
            {/* Filter Chips */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: roles.onSurface }}>
                Filter & Assist Chips
              </h3>
              <p className="text-sm mb-6" style={{ color: roles.onSurfaceVariant }}>
                Chips allow compact filtering, triggering assists, or tagging metadata.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setFilterChips(p => ({ ...p, photos: !p.photos }))}
                  className="px-4 py-2 rounded-xl text-xs font-medium md-tap border flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: filterChips.photos ? roles.secondaryContainer : 'transparent',
                    color: filterChips.photos ? roles.onSecondaryContainer : roles.onSurface,
                    borderColor: filterChips.photos ? roles.secondary : roles.outline,
                  }}
                >
                  {filterChips.photos && <Check className="w-3.5 h-3.5" />}
                  Photos & Graphics
                </button>

                <button
                  onClick={() => setFilterChips(p => ({ ...p, documents: !p.documents }))}
                  className="px-4 py-2 rounded-xl text-xs font-medium md-tap border flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: filterChips.documents ? roles.secondaryContainer : 'transparent',
                    color: filterChips.documents ? roles.onSecondaryContainer : roles.onSurface,
                    borderColor: filterChips.documents ? roles.secondary : roles.outline,
                  }}
                >
                  {filterChips.documents && <Check className="w-3.5 h-3.5" />}
                  Documents (.pdf)
                </button>

                <button
                  onClick={() => setFilterChips(p => ({ ...p, audio: !p.audio }))}
                  className="px-4 py-2 rounded-xl text-xs font-medium md-tap border flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: filterChips.audio ? roles.secondaryContainer : 'transparent',
                    color: filterChips.audio ? roles.onSecondaryContainer : roles.onSurface,
                    borderColor: filterChips.audio ? roles.secondary : roles.outline,
                  }}
                >
                  {filterChips.audio && <Check className="w-3.5 h-3.5" />}
                  Audio Samples
                </button>

                <button
                  onClick={() => setFilterChips(p => ({ ...p, starred: !p.starred }))}
                  className="px-4 py-2 rounded-xl text-xs font-medium md-tap border flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: filterChips.starred ? roles.secondaryContainer : 'transparent',
                    color: filterChips.starred ? roles.onSecondaryContainer : roles.onSurface,
                    borderColor: filterChips.starred ? roles.secondary : roles.outline,
                  }}
                >
                  {filterChips.starred && <Check className="w-3.5 h-3.5" />}
                  Starred Only
                </button>
              </div>
            </div>

            {/* Switches & Sliders */}
            <div className="pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-8"
              style={{ borderColor: `${roles.outline}20` }}
            >
              {/* MD3 Switch */}
              <div className="space-y-4">
                <h4 className="text-base font-bold" style={{ color: roles.onSurface }}>
                  Material 3 Switch
                </h4>
                <div className="flex items-center justify-between p-4 rounded-2xl border"
                  style={{
                    backgroundColor: roles.surfaceContainer,
                    borderColor: `${roles.outline}20`,
                  }}
                >
                  <div>
                    <div className="text-sm font-semibold" style={{ color: roles.onSurface }}>
                      Adaptive Haptic Feedback
                    </div>
                    <div className="text-xs" style={{ color: roles.onSurfaceVariant }}>
                      Gentle tactile response on touch
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSwitchChecked(!switchChecked);
                      onShowSnackbar(switchChecked ? 'Haptics disabled' : 'Haptics enabled');
                    }}
                    className="relative w-14 h-8 rounded-full transition-colors md-tap border flex items-center p-1"
                    style={{
                      backgroundColor: switchChecked ? roles.primary : roles.surfaceContainerHighest,
                      borderColor: switchChecked ? roles.primary : roles.outline,
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full shadow-md transition-transform flex items-center justify-center ${
                        switchChecked ? 'translate-x-6' : 'translate-x-0'
                      }`}
                      style={{
                        backgroundColor: switchChecked ? roles.onPrimary : roles.outline,
                        color: roles.primary,
                      }}
                    >
                      {switchChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* MD3 Continuous Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold" style={{ color: roles.onSurface }}>
                    Continuous Slider
                  </h4>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: roles.primaryContainer, color: roles.onPrimaryContainer }}>
                    {sliderVal}%
                  </span>
                </div>
                <div className="p-4 rounded-2xl border flex flex-col gap-3"
                  style={{
                    backgroundColor: roles.surfaceContainer,
                    borderColor: `${roles.outline}20`,
                  }}
                >
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
                  <div className="flex justify-between text-[10px] font-mono opacity-60">
                    <span>MIN (0)</span>
                    <span>MID (50)</span>
                    <span>MAX (100)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
