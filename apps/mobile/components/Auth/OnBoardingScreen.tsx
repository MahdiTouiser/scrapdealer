import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Button,
    Text,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { spacing } from '@scrapdealer/tokens';

import { useThemeContext } from '../../theme/ThemeProvider';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const slides = [
    {
        title: 'خرید و فروش ضایعات\nهوشمند و سریع',
        description: 'با ضایعات‌چی در چند ثانیه آگهی ثبت کنید، قیمت بگیرید و معامله کنید',
        image: require('../../public/icons/logo.png'),
        icon: '🚀',
    },
    {
        title: 'قیمت‌گذاری لحظه‌ای\nو شفاف',
        description: 'قیمت‌های به‌روز بازار، بر اساس وزن، نوع و منطقه به صورت خودکار محاسبه می‌شود',
        image: require('../../public/icons/logo.png'),
        icon: '💰',
    },
    {
        title: 'مدیریت کامل\nتراکنش‌ها',
        description: 'پیگیری سفارش‌ها، فاکتورها، پرداخت‌ها و تاریخچه معاملات در یک جا',
        image: require('../../public/icons/logo.png'),
        icon: '📊',
    },
    {
        title: 'آماده‌ای شروع کنی؟',
        description: 'همین حالا ثبت‌نام کن و از مزایای پلتفرم هوشمند ضایعات‌چی استفاده کن',
        image: require('../../public/icons/logo.png'),
        icon: '✨',
        isLast: true,
    },
];

type Props = {
    onComplete: () => void;
};

export const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const insets = useSafeAreaInsets();
    const { theme, mode } = useThemeContext();
    const { myColors } = theme;

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const darkColors = ['#00c853', '#00e676', '#69f0ae'] as const
    const lightColors = ['#00c853', '#00e676', '#b9f6ca'] as const

    const gradientColors = mode === 'dark' ? darkColors : lightColors


    const handleNext = () => {
        const currentIndex = Math.round((scrollX as any)._value / SCREEN_WIDTH);

        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            completeOnboarding();
        }

    };

    const handleSkip = () => completeOnboarding();

    const completeOnboarding = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        onComplete();
    };

    const handleDotPress = (dotIndex: number) => {
        flatListRef.current?.scrollToIndex({ index: dotIndex, animated: true });
    };

    const renderItem = ({ item, index: itemIndex }: { item: typeof slides[0], index: number }) => {
        const inputRange = [
            (itemIndex - 1) * SCREEN_WIDTH,
            itemIndex * SCREEN_WIDTH,
            (itemIndex + 1) * SCREEN_WIDTH,
        ];

        const imageScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
        });

        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [50, 0, 50],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.slide}>
                <Animated.View
                    style={[
                        styles.imageContainer,
                        {
                            opacity: imageOpacity,
                            transform: [
                                { scale: imageScale },
                                { translateY },
                            ],
                        },
                    ]}
                >
                    <View style={styles.imageBackground}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.iconBadge}>
                        <Text style={styles.iconText}>{item.icon}</Text>
                    </View>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.textContainer,
                        {
                            opacity: imageOpacity,
                            transform: [{ translateY }],
                        }
                    ]}
                >
                    <Text style={[styles.title, { color: '#ffffff', fontFamily: 'Vazirmatn' }]}>
                        {item.title}
                    </Text>
                    <Text style={[styles.description, { color: 'rgba(255, 255, 255, 0.95)' }]}>
                        {item.description}
                    </Text>

                    {item.isLast && (
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Button
                                mode="contained"
                                onPress={handleNext}
                                contentStyle={styles.startButtonContent}
                                style={[styles.startButton, { backgroundColor: '#ffffff' }]}
                                labelStyle={[styles.startButtonLabel, { color: myColors.white }]}
                                elevation={4}
                            >
                                شروع کنیم
                            </Button>
                        </Animated.View>
                    )}
                </Animated.View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />

            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                keyExtractor={(_, i) => i.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                decelerationRate="fast"
                snapToAlignment="center"
                snapToInterval={SCREEN_WIDTH}
                getItemLayout={(_, index) => ({
                    length: SCREEN_WIDTH,
                    offset: SCREEN_WIDTH * index,
                    index,
                })}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={(e) => {
                    const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                    setIndex(newIndex);
                }}
            />

            <View style={[styles.bottomSection, { paddingBottom: insets.bottom + spacing.xl }]}>
                <View style={styles.indicators}>
                    {slides.map((_, i) => {
                        const inputRange = [(i - 1) * SCREEN_WIDTH, i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH];
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [1, 1.4, 1],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.4, 1, 0.4],
                            extrapolate: 'clamp',
                        });
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [10, 24, 10],
                            extrapolate: 'clamp',
                        });

                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => handleDotPress(i)}
                                activeOpacity={0.8}
                            >
                                <Animated.View
                                    style={[
                                        styles.dot,
                                        {
                                            opacity,
                                            width: dotWidth,
                                            transform: [{ scale }],
                                            backgroundColor: '#ffffff',
                                        },
                                    ]}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.buttonRow}>
                    {index < slides.length - 1 && (
                        <>
                            <Button
                                mode="contained"
                                onPress={handleNext}
                                contentStyle={styles.nextButtonContent}
                                style={styles.nextButton}
                                labelStyle={styles.nextButtonLabel}
                                elevation={3}
                            >
                                بعدی
                            </Button>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00c853',
    },
    slide: {
        width: SCREEN_WIDTH,
        paddingHorizontal: spacing.xl,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: spacing.xl * 2,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: spacing.xl * 2,
    },
    imageBackground: {
        width: SCREEN_WIDTH * 0.65,
        height: SCREEN_WIDTH * 0.65,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: SCREEN_WIDTH * 0.325,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 16,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    image: {
        width: SCREEN_WIDTH * 0.5,
        height: SCREEN_WIDTH * 0.5,
    },
    iconBadge: {
        position: 'absolute',
        bottom: -10,
        right: SCREEN_WIDTH * 0.08,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    iconText: {
        fontSize: 32,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: spacing.lg,
        lineHeight: 46,
        fontFamily: 'Vazirmatn-Bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    description: {
        fontSize: 17,
        textAlign: 'center',
        lineHeight: 28,
        paddingHorizontal: spacing.xl,
        fontFamily: 'Vazirmatn',
        textShadowColor: 'rgba(0, 0, 0, 0.08)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.xl,
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
        height: 40,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 6,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minHeight: 56,
    },
    skipButton: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Vazirmatn',
    },
    skipButtonContent: {
        paddingHorizontal: spacing.md,
    },
    nextButton: {
        backgroundColor: '#ffffff',
        borderRadius: 28,
    },
    nextButtonContent: {
        paddingHorizontal: spacing.xl + spacing.md,
        paddingVertical: 6,
    },
    nextButtonLabel: {
        color: '#00c853',
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'Vazirmatn',
    },
    startButton: {
        marginTop: spacing.xl * 1.5,
        borderRadius: 28,
        minWidth: 200,
    },
    startButtonContent: {
        paddingVertical: 16,
        paddingHorizontal: spacing.xl,
    },
    startButtonLabel: {
        fontSize: 19,
        fontWeight: '700',
        fontFamily: 'Vazirmatn',
    },
    decorativeCircle1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
});