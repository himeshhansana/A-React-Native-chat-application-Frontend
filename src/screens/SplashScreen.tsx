// import { useEffect } from "react";
// import { Image, StatusBar, Text, View } from "react-native";
// import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";
// import { SafeAreaView } from "react-native-safe-area-context";
// import "../../global.css";
// import CircleShape from "../components/CircleShape";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStack } from "../../App";
// import { runOnJS } from "react-native-worklets";
// import { useTheme } from "../theme/ThemeProvider";
// import { useWebSocketPing } from "../socket/UseWebSocketPing";

// type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

// export default function SplashScreen() {
//   const navigation = useNavigation<Props>();
//   const opacity = useSharedValue(0);
//   useWebSocketPing(40000); // 1000 * 40
//   useEffect(() => {
//     opacity.value = withTiming(1, { duration: 3000 });
//   }, [navigation, opacity]);

//   const animatedStyle = useAnimatedStyle(() => {
//     return { opacity: opacity.value };
//   });

//   const { applied } = useTheme();
//   const logo =
//     applied === "light"
//       ? require("../../assets/logo-dark.png")
//       : require("../../assets/logo.png");

//   return (
//     <SafeAreaView className="items-center justify-center flex-1 bg-slate-50 ">
//       <StatusBar hidden={true} />
//       <CircleShape
//         width={200}
//         height={200}
//         borderRadius={999}
//         className="bg-slate-900"
//         topValue={-50}
//         leftValue={-20}
//       />
//       <CircleShape
//         width={200}
//         height={200}
//         borderRadius={999}
//         className="bg-slate-900"
//         topValue={-20}
//         leftValue={90}
//       />
//       <Animated.View style={animatedStyle}>
//         <Image source={logo} style={{ height: 200, width: 220 }} />
//       </Animated.View>

//       <Animated.View className="absolute bottom-10" style={animatedStyle}>
//         <View className="items-center justify-center">
//           <Text className="text-xs font-bold text-slate-600 ">
//             POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
//           </Text>
//           <Text className="text-xs font-bold text-slate-600 ">
//             VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
//           </Text>
//         </View>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

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
  useWebSocketPing(40000); // ✅ Keep backend logic

  const { applied } = useTheme();

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 2200 });

    // Create soft pulse animation for the logo
    pulse.value = withRepeat(
      withSequence(withTiming(1.05, { duration: 2000 }), withTiming(1, { duration: 2000 })),
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
      ? require("../../assets/logo-dark.png")
      : require("../../assets/logo.png");

  const gradientColors: readonly [string, string, ...string[]] =
    applied === "light"
      ? ["#DCE35B", "#45B649"] // Fresh green-yellow gradient
      : ["#0f0c29", "#302b63", "#24243e"]; // Deep dark violet tone

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
            intensity={60}
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
            className={`text-4xl font-extrabold tracking-wide ${
              applied === "light" ? "text-slate-800" : "text-white"
            }`}
          >
            ChatApp
          </Text>
          <Text
            className={`mt-2 text-base font-medium ${
              applied === "light" ? "text-slate-600" : "text-gray-300"
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
          className={`text-xs font-semibold ${
            applied === "light" ? "text-slate-700" : "text-gray-300"
          }`}
        >
          POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
        </Text>
        <Text
          className={`text-xs font-semibold ${
            applied === "light" ? "text-slate-700" : "text-gray-300"
          }`}
        >
          VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}
