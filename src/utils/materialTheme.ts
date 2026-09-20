import { SeedPreset, ThemeMode, TonalPalette, TonalRoleSet } from '../types';

export const SEED_PRESETS: SeedPreset[] = [
  {
    id: 'iris',
    name: 'Iris Violet',
    seedHex: '#6750A4',
    description: 'The canonical Material Design 3 default seed color.',
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    seedHex: '#0061A4',
    description: 'Deep oceanic blue with cyan tonal containers.',
  },
  {
    id: 'green',
    name: 'Forest Botanical',
    seedHex: '#386A20',
    description: 'Fresh organic greens with natural moss tones.',
  },
  {
    id: 'terracotta',
    name: 'Desert Terracotta',
    seedHex: '#8C4F27',
    description: 'Warm earthen clay and amber highlight tones.',
  },
  {
    id: 'crimson',
    name: 'Vibrant Rose',
    seedHex: '#9C4146',
    description: 'Energetic crimson pink with soft pastel containers.',
  },
  {
    id: 'amber',
    name: 'Golden Solar',
    seedHex: '#7D5700',
    description: 'Luminous sunshine gold with rich warm undertones.',
  },
  {
    id: 'teal',
    name: 'Verdant Teal',
    seedHex: '#006A6A',
    description: 'Balanced turquoise and minty surface accents.',
  },
];

// Helper: Hex to RGB
export function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [103, 80, 164]; // default iris
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Helper: RGB to Hex
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return [h, s * 100, l * 100];
}

// HSL to RGB
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r1 = 0, g1 = 0, b1 = 0;
  if (h < 60) {
    r1 = c; g1 = x; b1 = 0;
  } else if (h < 120) {
    r1 = x; g1 = c; b1 = 0;
  } else if (h < 180) {
    r1 = 0; g1 = c; b1 = x;
  } else if (h < 240) {
    r1 = 0; g1 = x; b1 = c;
  } else if (h < 300) {
    r1 = x; g1 = 0; b1 = c;
  } else {
    r1 = c; g1 = 0; b1 = x;
  }

  return [(r1 + m) * 255, (g1 + m) * 255, (b1 + m) * 255];
}

// Generate Tone from HSL (Tone 0 is black, Tone 100 is pure white)
export function getToneColor(h: number, s: number, tone: number): string {
  // Tone represents perceptual lightness (0 to 100)
  // At tone 0 or 100, saturation is 0
  const effectiveSat = tone === 0 || tone === 100 ? 0 : s * Math.sin((tone / 100) * Math.PI);
  const rgb = hslToRgb(h, effectiveSat, tone);
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

export const TONE_STEPS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

// Safe tone getter to guarantee valid hex for any tone index
export function getToneFromPalette(pal: TonalPalette, tone: number): string {
  const t = Math.min(100, Math.max(0, Math.round(tone)));
  if (pal.tones && pal.tones[t]) {
    return pal.tones[t];
  }
  const [r, g, b] = hexToRgb(pal.keyColor || '#6750A4');
  const [h, s] = rgbToHsl(r, g, b);
  return getToneColor(h, s, t);
}

// Generate Tonal Palette (0..100)
export function generateTonalPalette(name: string, hex: string, hueShift: number = 0, satMultiplier: number = 1): TonalPalette {
  const [r, g, b] = hexToRgb(hex);
  const [h, s] = rgbToHsl(r, g, b);
  const targetHue = (h + hueShift + 360) % 360;
  const targetSat = Math.min(100, Math.max(12, s * satMultiplier));

  // Compute all integer tones from 0 to 100 so all MD3 surface containers,
  // outlines, and roles (such as tones 4, 6, 12, 17, 22, 92, 94, 96, 98) are always defined
  const tones: Record<number, string> = {};
  for (let t = 0; t <= 100; t++) {
    tones[t] = getToneColor(targetHue, targetSat, t);
  }

  return {
    name,
    keyColor: hex,
    tones,
  };
}

// Build MD3 Theme Roles from Seed Hex
export function generateMaterialTheme(seedHex: string, mode: ThemeMode): {
  roles: TonalRoleSet;
  palettes: {
    primary: TonalPalette;
    secondary: TonalPalette;
    tertiary: TonalPalette;
    neutral: TonalPalette;
    neutralVariant: TonalPalette;
  };
} {
  const [r, g, b] = hexToRgb(seedHex);
  const [h, s] = rgbToHsl(r, g, b);

  // Material Design 3 rules:
  // Secondary: same hue or slight shift (+5 deg), reduced chroma/saturation (e.g. 0.35x)
  // Tertiary: hue rotated approx 60 degrees, medium chroma
  // Neutral: same hue, very low chroma (~6%)
  // Neutral Variant: same hue, low chroma (~12%)
  const primaryPal = generateTonalPalette('Primary', seedHex, 0, 1.0);
  const secondaryPal = generateTonalPalette('Secondary', seedHex, 5, 0.45);
  const tertiaryPal = generateTonalPalette('Tertiary', seedHex, 60, 0.7);
  const neutralPal = generateTonalPalette('Neutral', seedHex, 0, 0.12);
  const neutralVariantPal = generateTonalPalette('Neutral Variant', seedHex, 0, 0.22);

  let roles: TonalRoleSet;

  if (mode === 'light') {
    roles = {
      primary: primaryPal.tones[40],
      onPrimary: primaryPal.tones[100],
      primaryContainer: primaryPal.tones[90],
      onPrimaryContainer: primaryPal.tones[10],

      secondary: secondaryPal.tones[40],
      onSecondary: secondaryPal.tones[100],
      secondaryContainer: secondaryPal.tones[90],
      onSecondaryContainer: secondaryPal.tones[10],

      tertiary: tertiaryPal.tones[40],
      onTertiary: tertiaryPal.tones[100],
      tertiaryContainer: tertiaryPal.tones[90],
      onTertiaryContainer: tertiaryPal.tones[10],

      surface: neutralPal.tones[98], // Warm MD3 surface
      onSurface: neutralPal.tones[10],
      surfaceVariant: neutralVariantPal.tones[90],
      onSurfaceVariant: neutralVariantPal.tones[30],

      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: neutralPal.tones[96],
      surfaceContainer: neutralPal.tones[94],
      surfaceContainerHigh: neutralPal.tones[92],
      surfaceContainerHighest: neutralPal.tones[90],

      outline: neutralVariantPal.tones[50],
      outlineVariant: neutralVariantPal.tones[80],

      inverseSurface: neutralPal.tones[20],
      inverseOnSurface: neutralPal.tones[95],
      inversePrimary: primaryPal.tones[80],
    };
  } else {
    // Dark mode
    roles = {
      primary: primaryPal.tones[80],
      onPrimary: primaryPal.tones[20],
      primaryContainer: primaryPal.tones[30],
      onPrimaryContainer: primaryPal.tones[90],

      secondary: secondaryPal.tones[80],
      onSecondary: secondaryPal.tones[20],
      secondaryContainer: secondaryPal.tones[30],
      onSecondaryContainer: secondaryPal.tones[90],

      tertiary: tertiaryPal.tones[80],
      onTertiary: tertiaryPal.tones[20],
      tertiaryContainer: tertiaryPal.tones[30],
      onTertiaryContainer: tertiaryPal.tones[90],

      surface: neutralPal.tones[6], // Deep warm black
      onSurface: neutralPal.tones[90],
      surfaceVariant: neutralVariantPal.tones[30],
      onSurfaceVariant: neutralVariantPal.tones[80],

      surfaceContainerLowest: neutralPal.tones[4],
      surfaceContainerLow: neutralPal.tones[10],
      surfaceContainer: neutralPal.tones[12],
      surfaceContainerHigh: neutralPal.tones[17],
      surfaceContainerHighest: neutralPal.tones[22],

      outline: neutralVariantPal.tones[60],
      outlineVariant: neutralVariantPal.tones[30],

      inverseSurface: neutralPal.tones[90],
      inverseOnSurface: neutralPal.tones[20],
      inversePrimary: primaryPal.tones[40],
    };
  }

  return {
    roles,
    palettes: {
      primary: primaryPal,
      secondary: secondaryPal,
      tertiary: tertiaryPal,
      neutral: neutralPal,
      neutralVariant: neutralVariantPal,
    },
  };
}
