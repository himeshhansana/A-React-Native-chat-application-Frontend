import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

type AboutScreenProp = NativeStackNavigationProp<RootStack, 'AboutScreen'>;

export default function AboutScreen() {
    const navigation = useNavigation<AboutScreenProp>();
    const { applied } = useTheme();
    const isDark = applied === 'dark';

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'About Chatify',
            headerStyle: {
                backgroundColor: isDark ? '#111827' : '#ffffff',
            },
            headerTintColor: isDark ? '#ffffff' : '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });
    }, [navigation, isDark]);

    const openURL = (url: string) => {
        Linking.openURL(url);
    };

    const InfoCard = ({
        icon,
        title,
        description,
        delay = 0
    }: {
        icon: string;
        title: string;
        description: string;
        delay?: number;
    }) => (
        <Animated.View
            entering={FadeInRight.delay(delay)}
            className="p-6 mb-4 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700"
        >
            <View className="flex-row items-center mb-3">
                <View className="items-center justify-center w-12 h-12 mr-4 bg-purple-200 rounded-full dark:bg-purple-900/30">
                    <Ionicons
                        name={icon as any}
                        size={24}
                        color={isDark ? '#A78BFA' : '#8B5CF6'}
                    />
                </View>
                <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    {title}
                </Text>
            </View>
            <Text className="leading-6 text-gray-600 dark:text-gray-300">
                {description}
            </Text>
        </Animated.View>
    );

    const SocialButton = ({
        icon,
        label,
        url,
        color,
        delay = 0
    }: {
        icon: string;
        label: string;
        url: string;
        color: string;
        delay?: number;
    }) => (
        <Animated.View entering={FadeInDown.delay(delay)}>
            <TouchableOpacity
                className="flex-row items-center justify-center p-4 mb-3 rounded-2xl"
                style={{ backgroundColor: color }}
                onPress={() => openURL(url)}
                activeOpacity={0.8}
            >
                <Ionicons name={icon as any} size={20} color="white" />
                <Text className="ml-3 font-semibold text-white">{label}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={isDark ? '#111827' : '#ffffff'}
            />

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
            >
                {/* App Logo and Header */}
                <Animated.View
                    entering={FadeInDown}
                    className="items-center mb-8"
                >
                    <View className="items-center justify-center w-24 h-24 mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl">
                        <Ionicons name="chatbubble-ellipses" size={80} color="purple" />
                    </View>
                    <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                        Chatify
                    </Text>
                    <Text className="text-lg text-center text-gray-600 dark:text-gray-300">
                        Connect with the world through seamless messaging
                    </Text>
                    <View className="px-4 py-2 mt-3 bg-purple-100 rounded-full dark:bg-purple-900/30">
                        <Text className="font-semibold text-purple-700 dark:text-purple-300">
                            Version {process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0'}
                        </Text>
                    </View>
                </Animated.View>

                {/* App Features */}
                <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Features
                </Text>

                <InfoCard
                    icon="chatbubbles-outline"
                    title="Real-time Messaging"
                    description="Send and receive messages instantly with our advanced real-time communication system."
                    delay={100}
                />

                <InfoCard
                    icon="call-outline"
                    title="Voice & Video Calls"
                    description="Make crystal clear voice and video calls to your contacts anywhere in the world."
                    delay={200}
                />

                <InfoCard
                    icon="radio-outline"
                    title="Status Updates"
                    description="Share your moments with status updates that disappear after 24 hours."
                    delay={300}
                />

                <InfoCard
                    icon="shield-checkmark-outline"
                    title="End-to-End Encryption"
                    description="Your conversations are protected with industry-standard encryption technology."
                    delay={400}
                />

                <InfoCard
                    icon="moon-outline"
                    title="Dark Mode Support"
                    description="Switch between light and dark themes for comfortable messaging anytime."
                    delay={500}
                />

                {/* Developer Info */}
                <Text className="mt-6 mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Developer
                </Text>

                <Animated.View
                    entering={FadeInRight.delay(600)}
                    className="p-6 mb-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700"
                >
                    <View className="flex-row items-center mb-4">
                        <View className="items-center justify-center w-16 h-16 mr-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                            <Text className="text-xl font-bold text-white">
                                {process.env.EXPO_PUBLIC_APP_OWNER?.charAt(0) || 'D'}
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-lg font-bold text-gray-900 dark:text-white">
                                {process.env.EXPO_PUBLIC_APP_OWNER || 'Developer'}
                            </Text>
                            <Text className="text-gray-600 dark:text-gray-300">
                                Mobile App Developer
                            </Text>
                        </View>
                    </View>
                    <Text className="leading-6 text-gray-600 dark:text-gray-300">
                        Passionate about creating amazing mobile experiences that connect people around the world.
                    </Text>
                </Animated.View>

                {/* Social Links */}
                <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Connect with Us
                </Text>

                <SocialButton
                    icon="logo-github"
                    label="GitHub"
                    url="https://github.com/himeshhansana"
                    color="#333333"
                    delay={700}
                />

                <SocialButton
                    icon="logo-linkedin"
                    label="LinkedIn"
                    url="https://linkedin.com"
                    color="#0077B5"
                    delay={800}
                />

                <SocialButton
                    icon="globe-outline"
                    label="Website"
                    url="https://himesh-hansana.vercel.app/"
                    color="#8B5CF6"
                    delay={900}
                />

                <SocialButton
                    icon="mail-outline"
                    label="Contact Support"
                    url="mailto:support@chatify.com"
                    color="#EF4444"
                    delay={1000}
                />

                {/* Legal Info */}
                <Animated.View
                    entering={FadeInDown.delay(1100)}
                    className="p-6 mt-6 bg-gray-100 dark:bg-gray-800 rounded-2xl"
                >
                    <Text className="text-sm leading-6 text-center text-gray-600 dark:text-gray-300">
                        © 2025 Chatify. All rights reserved.{'\n'}
                        Made with ❤️ for connecting people worldwide.{'\n\n'}
                        This app is built with React Native and Expo.
                    </Text>
                </Animated.View>

                {/* Version Info */}
                <Animated.View
                    entering={FadeInDown.delay(1200)}
                    className="mt-4"
                >
                    <Text className="text-xs text-center text-gray-500 dark:text-gray-400">
                        Build Version: {process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0'}{'\n'}
                        Last Updated: October 2025
                    </Text>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}