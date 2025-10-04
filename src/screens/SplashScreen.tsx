import { useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import CircleShape from "../components/CircleShape";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { runOnJS } from "react-native-worklets";
import { useTheme } from "../theme/ThemeProvider";
import { useWebSocketPing } from "../socket/UseWebSocketPing";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {
  const navigation = useNavigation<Props>();
  const opacity = useSharedValue(0);
  useWebSocketPing(60000); // 1000 * 60 * 4
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 3000 });
    // const timer = setTimeout(() => {
    //   navigation.replace("SignUpScreen");
    // }, 3000);

    // return () => {
    //   clearTimeout(timer);
    // };
  }, [navigation, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  const { applied } = useTheme();
  const logo =
    applied === "light"
      ? require("../../assets/logo-dark.png")
      : require("../../assets/logo.png");

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-slate-50 ">
      <StatusBar hidden={true} />
      <CircleShape
        width={200}
        height={200}
        borderRadius={999}
        className="bg-slate-900"
        topValue={-50}
        leftValue={-20}
      />
      <CircleShape
        width={200}
        height={200}
        borderRadius={999}
        className="bg-slate-900"
        topValue={-20}
        leftValue={90}
      />
      <Animated.View style={animatedStyle}>
        <Image source={logo} style={{ height: 200, width: 220 }} />
      </Animated.View>

      <Animated.View className="absolute bottom-10" style={animatedStyle}>
        <View className="items-center justify-center">
          <Text className="text-xs font-bold text-slate-600 ">
            POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
          </Text>
          <Text className="text-xs font-bold text-slate-600 ">
            VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
