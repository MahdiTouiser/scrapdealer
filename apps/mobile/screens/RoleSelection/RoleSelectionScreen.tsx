import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import {
    Animated,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    radii,
    spacing,
    typography,
} from '@scrapdealer/tokens';

import { Text } from '../../components/CustomText';
import { useThemeContext } from '../../theme/ThemeProvider';

interface RoleSelectionProps {
    onSelect: (role: 'buyer' | 'seller') => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionProps> = ({ onSelect }) => {
    const insets = useSafeAreaInsets();
    const { mode, theme } = useThemeContext();
    const { myColors } = theme;

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(60)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
    const buyerScale = React.useRef(new Animated.Value(1)).current;
    const sellerScale = React.useRef(new Animated.Value(1)).current;
    const pulseAnim = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 40,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.02,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handlePressIn = (type: 'buyer' | 'seller') => {
        const scaleValue = type === 'buyer' ? buyerScale : sellerScale;
        Animated.spring(scaleValue, {
            toValue: 0.96,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (type: 'buyer' | 'seller') => {
        const scaleValue = type === 'buyer' ? buyerScale : sellerScale;
        Animated.spring(scaleValue, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
        }).start();
    };

    return (
        <>
            <StatusBar
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
            />

            <View style={[styles.container, { backgroundColor: mode === 'dark' ? '#000000' : '#FFFFFF' }]}>
                <View style={styles.backgroundDecoration}>
                    <Animated.View
                        style={[
                            styles.gradientCircle,
                            styles.circle1,
                            {
                                opacity: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.12],
                                }),
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={['#4ECDC4', '#44A08D']}
                            style={styles.gradientFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.gradientCircle,
                            styles.circle2,
                            {
                                opacity: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.1],
                                }),
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={['#F7971E', '#FFD200']}
                            style={styles.gradientFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                    </Animated.View>
                </View>

                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideAnim },
                                { scale: scaleAnim }
                            ],
                        },
                    ]}
                >
                    <View style={styles.headerContainer}>
                        <Animated.View style={[
                            styles.logoCircle,
                            { transform: [{ scale: pulseAnim }] }
                        ]}>
                            <LinearGradient
                                colors={['#4ECDC4', '#44A08D']}
                                style={styles.logoGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text style={styles.logoIcon}>🎯</Text>
                            </LinearGradient>
                        </Animated.View>

                        <Text style={[styles.subheader, { color: myColors.textSecondary }]}>
                            برای ادامه، یکی از گزینه‌های زیر را انتخاب کنید
                        </Text>
                    </View>

                    <View style={styles.cardsContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={() => handlePressIn('buyer')}
                            onPressOut={() => handlePressOut('buyer')}
                            onPress={() => onSelect('buyer')}
                        >
                            <Animated.View
                                style={[
                                    styles.card,
                                    {
                                        transform: [{ scale: buyerScale }],
                                    }
                                ]}
                            >
                                <LinearGradient
                                    colors={['#4ECDC4', '#44A08D']}
                                    style={styles.cardGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View style={styles.cardContent}>
                                        <View style={styles.iconContainer}>
                                            <View style={styles.iconCircle}>
                                                <Text style={styles.cardIcon}>🛒</Text>
                                            </View>
                                        </View>

                                        <View style={styles.cardTextContainer}>
                                            <Text style={styles.cardTitle}>خریدار</Text>
                                            <Text style={styles.cardDesc}>
                                                خرید ضایعات با بهترین قیمت
                                            </Text>
                                        </View>

                                        <View style={styles.arrowContainer}>
                                            <View style={styles.arrowCircle}>
                                                <Text style={styles.arrow}>←</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.decorativeCircle1} />
                                    <View style={styles.decorativeCircle2} />
                                </LinearGradient>
                            </Animated.View>
                        </TouchableOpacity>

                        <View style={styles.dividerContainer}>
                            <View style={[styles.dividerLine, { backgroundColor: myColors.textSecondary + '30' }]} />
                            <View style={[styles.dividerCircle, { backgroundColor: mode === 'dark' ? '#1A1A1A' : '#FFFFFF' }]}>
                                <Text style={[styles.dividerText, { color: myColors.textSecondary }]}>یا</Text>
                            </View>
                            <View style={[styles.dividerLine, { backgroundColor: myColors.textSecondary + '30' }]} />
                        </View>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={() => handlePressIn('seller')}
                            onPressOut={() => handlePressOut('seller')}
                            onPress={() => onSelect('seller')}
                        >
                            <Animated.View
                                style={[
                                    styles.card,
                                    {
                                        transform: [{ scale: sellerScale }],
                                    }
                                ]}
                            >
                                <LinearGradient
                                    colors={['#F7971E', '#FFD200']}
                                    style={styles.cardGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View style={styles.cardContent}>
                                        <View style={styles.iconContainer}>
                                            <View style={styles.iconCircle}>
                                                <Text style={styles.cardIcon}>🏪</Text>
                                            </View>
                                        </View>

                                        <View style={styles.cardTextContainer}>
                                            <Text style={styles.cardTitle}>فروشنده</Text>
                                            <Text style={styles.cardDesc}>
                                                فروش ضایعات به راحتی و سرعت
                                            </Text>
                                        </View>

                                        <View style={styles.arrowContainer}>
                                            <View style={styles.arrowCircle}>
                                                <Text style={styles.arrow}>←</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Decorative Elements */}
                                    <View style={styles.decorativeCircle1} />
                                    <View style={styles.decorativeCircle2} />
                                </LinearGradient>
                            </Animated.View>
                        </TouchableOpacity>
                    </View>

                </Animated.View>

                <View style={{ height: Math.max(insets.bottom, spacing.xl) }} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundDecoration: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    gradientCircle: {
        position: 'absolute',
        borderRadius: 9999,
    },
    circle1: {
        width: 350,
        height: 350,
        top: -100,
        right: -120,
    },
    circle2: {
        width: 300,
        height: 300,
        bottom: -80,
        left: -100,
    },
    gradientFill: {
        flex: 1,
        borderRadius: 9999,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing['3xl'] + 40,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: spacing['3xl'],
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: spacing.xl,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#4ECDC4',
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.4,
                shadowRadius: 24,
            },
            android: {
                elevation: 16,
            },
        }),
    },
    logoGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 40,
    },
    header: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: spacing.sm,
        textAlign: 'center',
        fontFamily: 'Vazirmatn',
        letterSpacing: -0.5,
    },
    subheader: {
        fontSize: typography.body1.size,
        textAlign: 'center',
        fontFamily: 'Vazirmatn',
        opacity: 0.8,
        lineHeight: 24,
        paddingHorizontal: spacing.lg,
    },
    cardsContainer: {
        width: '100%',
        maxWidth: 440,
        alignSelf: 'center',
    },
    card: {
        borderRadius: radii.xl + 8,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 16 },
                shadowOpacity: 0.25,
                shadowRadius: 32,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    cardGradient: {
        padding: spacing.xl,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 140,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
    },
    iconContainer: {
        marginRight: spacing.lg,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    cardIcon: {
        fontSize: 32,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: spacing.xs,
        fontFamily: 'Vazirmatn',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    cardDesc: {
        fontSize: typography.body1.size,
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Vazirmatn',
        lineHeight: 22,
    },
    arrowContainer: {
        marginLeft: spacing.md,
    },
    arrowCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    arrow: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    decorativeCircle1: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: -30,
        right: -30,
    },
    decorativeCircle2: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        bottom: -20,
        left: -20,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(120, 120, 128, 0.2)',
    },
    dividerText: {
        fontSize: typography.body1.size,
        fontWeight: '600',
        fontFamily: 'Vazirmatn',
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing['2xl'],
        padding: spacing.lg,
        borderRadius: radii.xl,
        borderWidth: 1,
    },
    infoIcon: {
        fontSize: 18,
        marginRight: spacing.sm,
    },
    infoText: {
        fontSize: typography.body2.size,
        fontFamily: 'Vazirmatn',
        fontWeight: '500',
    },
});