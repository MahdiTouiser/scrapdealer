const iconPath = './public/icons/logo.png';

export default () => ({
  name: 'ScrapDealer',
  slug: 'scrapdealer',
  version: '1.0.0',
  orientation: 'portrait',
  icon: iconPath,
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: iconPath,
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    package: 'com.scrapdealer.mobile',
    adaptiveIcon: {
      foregroundImage: iconPath,
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    favicon: iconPath,
  },
  extra: {
    eas: {
      projectId: 'd64906f5-93ce-4b7d-8705-f4fd036df840',
    },
    apiBase: process.env.EXPO_PUBLIC_API_BASE,
  },
});
