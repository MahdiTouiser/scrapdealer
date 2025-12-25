import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  spacing,
  typography,
} from '@scrapdealer/tokens';

import { OTPStep } from '../../components/Auth/OTPStep';
import { PhoneStep } from '../../components/Auth/PhoneStep';
import { Text } from '../../components/CustomText';
import { useThemeContext } from '../../theme/ThemeProvider';

export const AuthScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { mode, theme } = useThemeContext();
    const { myColors } = theme;

    const [currentStep, setCurrentStep] = React.useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [phoneFocused, setPhoneFocused] = React.useState(false);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(60)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
    const logoRotate = React.useRef(new Animated.Value(0)).current;
    const stepTransition = React.useRef(new Animated.Value(0)).current;
    const backgroundShift = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 8,
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 40,
                friction: 7,
                useNativeDriver: true
            }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(logoRotate, {
                    toValue: 1,
                    duration: 20000,
                    useNativeDriver: true,
                }),
                Animated.timing(logoRotate, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(stepTransition, {
                toValue: currentStep === 'otp' ? 1 : 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(backgroundShift, {
                toValue: currentStep === 'otp' ? 1 : 0,
                duration: 600,
                useNativeDriver: false,
            }),
        ]).start();
    }, [currentStep]);

    const handleSendOTP = () => {
        setCurrentStep('otp');
    };

    const handleResendOTP = async () => {
        console.log('clicked');
    };

    const logoRotateInterpolate = logoRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const backgroundColorInterpolate = backgroundShift.interpolate({
        inputRange: [0, 1],
        outputRange: [
            mode === 'dark' ? '#000000' : '#FFFFFF',
            mode === 'dark' ? '#0A0A0A' : '#F8F9FA'
        ],
    });

    return (
        <>
            <StatusBar
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
            />

            <Animated.View style={[styles.container, { backgroundColor: backgroundColorInterpolate }]}>
                <View style={styles.backgroundDecoration}>
                    <Animated.View
                        style={[
                            styles.gradientCircle,
                            styles.circle1,
                            {
                                opacity: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.15],
                                }),
                                transform: [{
                                    scale: scaleAnim.interpolate({
                                        inputRange: [0.9, 1],
                                        outputRange: [0.8, 1],
                                    })
                                }]
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
                                    outputRange: [0, 0.12],
                                }),
                                transform: [{
                                    scale: scaleAnim.interpolate({
                                        inputRange: [0.9, 1],
                                        outputRange: [1, 0.9],
                                    })
                                }]
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

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={insets.top}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        bounces={false}
                    >
                        <Animated.View
                            style={[
                                styles.contentWrapper,
                                {
                                    opacity: fadeAnim,
                                    transform: [
                                        { translateY: slideAnim },
                                        { scale: scaleAnim }
                                    ],
                                },
                            ]}
                        >
                            <View style={styles.brandContainer}>
                                <Animated.View
                                    style={[
                                        styles.logoWrapper,
                                        {
                                            transform: [{ rotate: logoRotateInterpolate }]
                                        }
                                    ]}
                                >
                                    <View style={styles.logoGlow}>
                                        <LinearGradient
                                            colors={['#4ECDC4', '#44A08D', '#F7971E']}
                                            style={styles.logoGradient}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                        />
                                    </View>
                                    <View style={styles.logoInner}>
                                        <Image
                                            source={require('../../public/icons/logo.png')}
                                            style={styles.logo}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </Animated.View>

                                <Animated.View style={{
                                    opacity: fadeAnim,
                                    transform: [{
                                        translateY: slideAnim.interpolate({
                                            inputRange: [0, 60],
                                            outputRange: [0, 20],
                                        })
                                    }]
                                }}>
                                    <Text style={[styles.appTitle, { color: myColors.textPrimary }]}>
                                        ضایعات‌چی
                                    </Text>
                                    <View style={styles.titleUnderline}>
                                        <LinearGradient
                                            colors={['transparent', '#4ECDC4', 'transparent']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.underlineGradient}
                                        />
                                    </View>
                                    <Text style={[styles.appSubtitle, { color: myColors.textSecondary }]}>
                                        خرید و فروش هوشمند ضایعات
                                    </Text>
                                </Animated.View>
                            </View>

                            <View style={styles.cardContainer}>
                                <View style={[styles.card, {
                                    backgroundColor: mode === 'dark' ? '#1A1A1A' : '#FFFFFF',
                                    shadowColor: mode === 'dark' ? '#4ECDC4' : '#000',
                                }]}>


                                    <View>
                                        {currentStep === 'phone' ? (
                                            <PhoneStep
                                                phoneNumber={phoneNumber}
                                                onChangePhone={setPhoneNumber}
                                                onSendOTP={handleSendOTP}
                                                phoneFocused={phoneFocused}
                                                setPhoneFocused={setPhoneFocused}
                                                stepTransition={stepTransition}
                                            />
                                        ) : (
                                            <OTPStep
                                                phoneNumber={phoneNumber}
                                                onResendOTP={handleResendOTP}
                                                stepTransition={stepTransition}
                                                handleBackToPhone={() => setCurrentStep('phone')}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                        </Animated.View>

                        <View style={{ height: Math.max(insets.bottom, spacing.xl) }} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </Animated.View>
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
        width: 400,
        height: 400,
        top: -150,
        right: -100,
    },
    circle2: {
        width: 350,
        height: 350,
        bottom: -100,
        left: -80,
    },
    gradientFill: {
        flex: 1,
        borderRadius: 9999,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing['2xl'],
        paddingBottom: spacing.xl,
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 440,
        alignSelf: 'center',
    },
    brandContainer: {
        alignItems: 'center',
        marginBottom: spacing['3xl'],
    },
    logoWrapper: {
        width: 130,
        height: 130,
        marginBottom: spacing.xl,
        position: 'relative',
    },
    logoGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 35,
        opacity: 0.3,
        transform: [{ scale: 1.1 }],
    },
    logoGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },
    logoInner: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 32,
        padding: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 40,
        elevation: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    appTitle: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -1.2,
        textAlign: 'center',
        marginBottom: spacing.xs,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    titleUnderline: {
        width: 120,
        height: 3,
        alignSelf: 'center',
        marginBottom: spacing.md,
        overflow: 'hidden',
        borderRadius: 2,
    },
    underlineGradient: {
        flex: 1,
    },
    appSubtitle: {
        fontSize: typography.body1.size + 1,
        textAlign: 'center',
        fontWeight: '600',
        opacity: 0.75,
        letterSpacing: 0.3,
    },
    cardContainer: {
        paddingHorizontal: spacing.xs,
    },
    card: {
        borderRadius: 32,
        padding: spacing['xl'],
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 50,
        elevation: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },

});