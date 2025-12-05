import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useThemeContext } from '../../theme/ThemeProvider';

export const SellScreen = () => {
    const { theme } = useThemeContext()
    const { myColors } = theme

    return (
        <View style={[styles.container, { backgroundColor: myColors.white }]}>
            <View style={styles.centerContent}>
                <Text style={[styles.screenTitle, { color: myColors.textPrimary }]}>
                    ثبت آگهی جدید
                </Text>
                <Text style={styles.emoji}>➕</Text>
                <Text style={[styles.screenDescription, { color: myColors.textSecondary }]}>
                    ضایعات خود را برای فروش ثبت کنید
                </Text>
            </View>
        </View>
    )
}

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
        fontSize: 20,
        fontWeight: 'bold',
    },
    emoji: {
        fontSize: 48,
        marginVertical: 16,
    },
    screenDescription: {
        fontSize: 16,
        textAlign: 'center',
    },
});
