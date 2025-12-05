import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useThemeContext } from '../../theme/ThemeProvider';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    screenDescription: {
        fontSize: 16,
    },
});

export const MarketScreen = () => {
    const { theme } = useThemeContext();
    const { myColors } = theme;

    return (
        <View style={[styles.container, { backgroundColor: myColors.white }]}>
            <View style={styles.centerContent}>
                <Text style={[styles.screenTitle, { color: myColors.textPrimary }]}>
                    بازار ضایعات
                </Text>
                <Text style={styles.emoji}>📊</Text>
                <Text style={[styles.screenDescription, { color: myColors.textSecondary }]}>
                    قیمت‌های به‌روز بازار ضایعات
                </Text>
            </View>
        </View>
    );
};