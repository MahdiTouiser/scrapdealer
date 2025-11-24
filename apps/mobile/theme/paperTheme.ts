import {
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

import {
  colors,
  radii,
} from '@scrapdealer/tokens';

export const createPaperTheme = (mode: 'light' | 'dark') => {
  const colorSet = colors[mode];

  return {
    ...(mode === 'light' ? MD3LightTheme : MD3DarkTheme),
    colors: {
      ...((mode === 'light' ? MD3LightTheme : MD3DarkTheme).colors),
      primary: colorSet.primary,
      onPrimary: colorSet.surface,
      secondary: colorSet.secondary,
      background: colorSet.background,
      surface: colorSet.surface,
      onSurface: colorSet.textPrimary,
      text: colorSet.textPrimary,
      placeholder: colorSet.textSecondary,
      error: '#B00020',
    },
    roundness: radii.lg,
  };
};
