import { LinearGradient } from 'expo-linear-gradient';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { spacing } from '@scrapdealer/tokens';

import { HomeScreen } from '../screens/Home/HomeScreen';
import { MarketScreen } from '../screens/Market/MarketScreen';
import { OrdersScreen } from '../screens/Orders/OrdersScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { SellScreen } from '../screens/Sell/SellScreen';
import { useThemeContext } from '../theme/ThemeProvider';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: any) {
    const insets = useSafeAreaInsets();
    const { theme, mode } = useThemeContext();
    const { myColors } = theme;

    return (
        <View
            style={[
                styles.tabBarContainer,
                {
                    paddingBottom: insets.bottom,
                    backgroundColor: myColors.white,
                    borderTopColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                },
            ]}
        >
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                // Special styling for the center "Sell" button
                const isCenterButton = route.name === 'Sell';

                if (isCenterButton) {
                    return (
                        <View key={route.key} style={styles.centerButtonContainer}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.centerButtonTouchable}
                            >
                                <LinearGradient
                                    colors={['#00e676', '#00c853']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.centerButton}
                                >
                                    <Text style={styles.centerButtonIcon}>
                                        {options.tabBarIcon({ focused: isFocused })}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    );
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabButton}
                    >
                        <View
                            style={[
                                styles.tabIconContainer,
                                isFocused && {
                                    backgroundColor: mode === 'dark'
                                        ? 'rgba(0, 230, 118, 0.15)'
                                        : 'rgba(0, 230, 118, 0.1)',
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabIcon,
                                    { color: isFocused ? myColors.textPrimary : myColors.textSecondary },
                                ]}
                            >
                                {options.tabBarIcon({ focused: isFocused })}
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.tabLabel,
                                {
                                    color: isFocused ? myColors.textPrimary : myColors.textSecondary,
                                    fontWeight: isFocused ? '700' : '500',
                                },
                            ]}
                        >
                            {options.tabBarLabel}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export function MainTabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'خانه',
                    tabBarIcon: ({ focused }) => (focused ? '🏠' : '🏘️'),
                }}
            />
            <Tab.Screen
                name="Market"
                component={MarketScreen}
                options={{
                    tabBarLabel: 'بازار',
                    tabBarIcon: ({ focused }) => (focused ? '📊' : '📈'),
                }}
            />
            <Tab.Screen
                name="Sell"
                component={SellScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => '➕',
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    tabBarLabel: 'سفارشات',
                    tabBarIcon: ({ focused }) => (focused ? '📦' : '📋'),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'پروفایل',
                    tabBarIcon: ({ focused }) => (focused ? '👤' : '👥'),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        height: 70,
        borderTopWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    tabIconContainer: {
        width: 48,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    tabIcon: {
        fontSize: 22,
    },
    tabLabel: {
        fontSize: 11,
        fontFamily: 'Vazirmatn',
    },
    centerButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
    },
    centerButtonTouchable: {
        width: 64,
        height: 64,
    },
    centerButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#00c853',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    centerButtonIcon: {
        fontSize: 28,
        color: '#ffffff',
    },
});