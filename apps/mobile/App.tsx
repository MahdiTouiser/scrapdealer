import { View } from 'react-native';
import {
  Button,
  MD3LightTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  colors,
  radii,
  typography,
} from '@scrapdealer/tokens';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.main,
    secondary: colors.secondary.main,
    background: colors.gray[50]
  },
  roundness: radii.md / 2
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
        <View style={{ padding: 16 }}>
          <Text variant="headlineSmall" style={{ fontWeight: typography.h1.weight as any }}>
            ScrapDealer Mobile
          </Text>
          <Button mode="contained" style={{ marginTop: 12 }}>
            Primary Action
          </Button>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}