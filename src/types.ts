export interface TonalRoleSet {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;

  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  outline: string;
  outlineVariant: string;

  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
}

export interface TonalPalette {
  name: string;
  keyColor: string;
  tones: Record<number, string>; // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100
}

export interface SeedPreset {
  id: string;
  name: string;
  seedHex: string;
  description: string;
}

export type ThemeMode = 'light' | 'dark';
