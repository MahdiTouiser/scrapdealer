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
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    emoji: {
        fontSize: 64,
        marginVertical: 16,
    },
    screenDescription: {
        fontSize: 14,
        marginTop: 8,
    },
});

export const ProfileScreen = () => {
    const { theme } = useThemeContext();
    const { myColors } = theme;

    return (
        <View style={[styles.container, { backgroundColor: myColors.white }]}>
            <View style={styles.centerContent}>
                <Text style={[styles.screenTitle, { color: myColors.textPrimary }]}>
                    پروفایل کاربری
                </Text>
                <Text style={styles.emoji}>👤</Text>
                <Text style={[styles.screenDescription, { color: myColors.textSecondary }]}>
                    مدیریت حساب کاربری و تنظیمات
                </Text>
            </View>
        </View>
    );
};