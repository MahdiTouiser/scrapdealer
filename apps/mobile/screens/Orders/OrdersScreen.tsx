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
    },
    emoji: {
        fontSize: 48,
        marginVertical: 16,
    },
    screenDescription: {
        fontSize: 16,
    },
});

export const OrdersScreen = () => {
    const { theme } = useThemeContext();
    const { myColors } = theme;

    return (
        <View style={[styles.container, { backgroundColor: myColors.white }]}>
            <View style={styles.centerContent}>
                <Text style={[styles.screenTitle, { color: myColors.textPrimary }]}>
                    سفارشات من
                </Text>
                <Text style={styles.emoji}>📦</Text>
                <Text style={[styles.screenDescription, { color: myColors.textSecondary }]}>
                    پیگیری سفارشات و معاملات
                </Text>
            </View>
        </View>
    );
};