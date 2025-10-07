
import { useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStack } from "../../App";
import { useTheme } from "../theme/ThemeProvider";
import { useWebSocketPing } from "../socket/UseWebSocketPing";
import { BlurView } from "expo-blur";
import "../../global.css";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {
  const navigation = useNavigation<Props>();
  const opacity = useSharedValue(0);
  const pulse = useSharedValue(1);
  useWebSocketPing(30000); // ✅ Keep backend logic

  const { applied } = useTheme();

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 3200 });

    // Create soft pulse animation for the logo
    pulse.value = withRepeat(
      withSequence(withTiming(1.05, { duration: 3000 }), withTiming(1, { duration: 3000 })),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: pulse.value }],
  }));

  const logo =
    applied === "light"
      ? require("../../assets/logo11.png")
      : require("../../assets/logo11.png");

  const gradientColors: readonly [string, string, ...string[]] =
    applied === "light"
      ? ["#6B46C1", "#553C9A", "#4C1D95"] // Dark purple gradient for light mode
      : ["#2D1B69", "#1E1B4B", "#312E81"]; // Very dark purple gradient for dark mode

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden={true} />

      {/* Background Gradient */}
      <LinearGradient colors={gradientColors} className="absolute inset-0" />

      {/* Floating Glow Circles */}
      <View className="absolute rounded-full -top-20 -left-20 h-72 w-72 bg-white/10 blur-3xl" />
      <View className="absolute bottom-0 right-0 rounded-full h-80 w-80 bg-white/10 blur-3xl" />

      {/* Center Animated Logo */}
      <View className="items-center justify-center flex-1">
        <Animated.View style={animatedStyle}>
          <BlurView
            intensity={70}
            tint={applied === "light" ? "light" : "dark"}
            className="items-center justify-center w-56 h-56 overflow-hidden rounded-full"
          >
            <Image
              source={logo}
              style={{
                height: 180,
                width: 200,
                resizeMode: "contain",
              }}
            />
          </BlurView>
        </Animated.View>

        <Animated.View
          className="items-center mt-6"
          style={{ opacity: opacity.value }}
        >
          <Text
            className={`text-5xl font-extrabold tracking-wide ${applied === "light" ? "text-white" : "text-white"
              }`}
          >
            Chatify
          </Text>
          <Text
            className={`mt-2 text-base font-2xl ${applied === "light" ? "text-white" : "text-gray-200"
              }`}
          >
            Let’s talk with the world 🌍
          </Text>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        className="absolute items-center w-full bottom-10"
        style={{ opacity: opacity.value }}
      >
        <Text
          className={`text-lg font-semibold ${applied === "light" ? "text-white" : "text-white"
            }`}
        >
          POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
        </Text>
        <Text
          className={`text-lg font-semibold ${applied === "light" ? "text-white" : "text-white"
            }`}
        >
          VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}
